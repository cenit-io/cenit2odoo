module.exports = function (options) {
    var async = require('async'),
        CenitIO = require('./program-cenit-io-api'),
        render = require('./render-addon'),
        promptly = require('promptly'),
        colors = require('colors'),
        columnify = require('columnify');

    colors.setTheme({
        choose: 'blue',
        prompt: 'green'
    });

    CenitIO.getCollections(function (sharedCollections) {
        var opts = sharedCollections.map(function (sc, i) { return sc }),
            values, msg, optsA, optsB, optAll, optCancel, optsTwoColumns, size;

        // Add generate all and cancel options.
        opts.push(optAll = 'GENERATE ALL'.green);
        opts.push(optCancel = 'CANCEL'.red);

        values = opts.map(function (sc, i) { return i });

        // Prepare opts to render in two columns.
        size = Math.floor(opts.length / 2);
        optsA = opts.slice(0, size).map(function (o, i) { return i + '. ' + o });
        optsB = opts.slice(size).map(function (o, i) { return (i + size) + '. ' + o });
        optsTwoColumns = optsB.map(function (o, i) { return { c1: optsA[i], c2: optsB[i] } });
        msg = 'Choose shared collection to generate the addon:\n'.prompt
            + '----------------------------------------------------------------------\n'
            + columnify(optsTwoColumns, { showHeaders: false }).choose + '\n'
            + '----------------------------------------------------------------------\n'
            + ('Enter the number of the desired option [' + optCancel + ']:').prompt;

        var start = function () {
            promptly.choose(msg, values, { default: opts.length - 1 }, function (err, idx) {
                if (opts[idx] == optCancel) process.abort();
                if (opts[idx] == optAll) {
                    collections = sharedCollections;
                } else {
                    collections = [opts[idx]];
                }

                var actions = collections.map(function (collection) {
                    return function (done) {
                        CenitIO.getCollection(collection, function (collection) {
                            render(options, collection);
                            console.log('----------------------------------------------------------------------');
                            done();
                        });
                    }
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
