module.exports = function (options) {
    var request = require('request'),
        promptly = require('promptly'),
        colors = require('colors'),
        async = require('async'),
        columnify = require('columnify'),
        assert = require('./program-assert'),
        render = require('./render-addon');

    colors.setTheme({
        choose: 'blue',
        prompt: 'green'
    });

    console.info("Loading shared collections from Cenit IO...");
    request('https://cenit.io/api/v1/setup/shared_collection?only=name', function (err, response, body) {
        assert.notError(err);

        var data = JSON.parse(body);

        assert.existSharedCollections(data);

        var opts = data.shared_collection.map(function (sc, i) { return sc.name }).sort(),
            values, msg, optsA, optsB, optAll, optCancel, optsTwoColumns, size;

        // Add generate all and cancel options.
        opts.push(optAll = 'GENERATE ALL'.green);
        opts.push(optCancel = 'CANCEL'.red);

        values = opts.map(function (sc, i) { return i });

        // Prepare opts to render in two columns.
        size = Math.floor(opts.length / 2);
        optsA = opts.slice(0, size).map(function (o, i) { return i + '. ' + o });
        optsB = opts.slice(size).map(function (o, i) { return (i + size) + '. ' + o });
        optsTwoColumns = optsB.map(function (o, i) { return {c1: optsA[i], c2: optsB[i]} });
        msg = 'Choose shared collection to generate the addon:\n'.prompt
            + '----------------------------------------------------------------------\n'
            + columnify(optsTwoColumns, {showHeaders: false}).choose + '\n'
            + '----------------------------------------------------------------------\n'
            + ('Enter the number of the desired option [' + optCancel + ']:').prompt;

        var start = function () {
            promptly.choose(msg, values, {default: opts.length - 1}, function (err, idx) {
                var sharedCollections, actions = [];

                if (opts[idx] == optCancel) process.abort();
                if (opts[idx] == optAll) {
                    sharedCollections = data.shared_collection.map(function (sc, i) { return sc.name }).sort();
                } else {
                    sharedCollections = [opts[idx]];
                }

                sharedCollections.forEach(function (collection) {
                    actions.push(function (done) {
                        var url = 'https://cenit.io/api/v1/setup/shared_collection?name=' + collection;

                        console.info("Loading '%s' shared collection from Cenit IO...", collection);
                        request(url, function (err, response, body) {
                            assert.notError(err);

                            var data = JSON.parse(body);

                            assert.existSharedCollection(data);
                            render(options, data.shared_collection[0]);

                            console.log('----------------------------------------------------------------------');

                            done();
                        });
                    });
                });

                async.series(actions, function (err, result) {
                    if (opts[idx] == optAll) {
                        console.info('FINISHED.');
                    } else {
                        setTimeout(start, 10);
                    }
                });
            });
        };

        start();
    });
};
