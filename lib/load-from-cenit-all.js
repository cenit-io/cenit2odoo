module.exports = function (options) {
    var request = require('request'),
        async = require('async'),
        assert = require('./program-assert'),
        render = require('./render-addon');

    console.info("Loading shared collections from Cenit IO...");
    request('https://cenit.io/api/v1/setup/shared_collection?only=name', function (err, response, body) {
        assert.notError(err);

        var data = JSON.parse(body);

        assert.existSharedCollections(data);

        var sharedCollections = data.shared_collection.map(function (sc, i) { return sc.name }).sort(),
            actions = [];

        sharedCollections.forEach(function (collection) {
            actions.push(function (done) {
                if (options.exclude.indexOf(collection) != -1) {
                    console.warn("It skips '%s' to be present at the excluding option.", collection);
                    done();
                } else {
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
                }
            });
        });

        async.series(actions, function (err, result) {
            console.info('FINISHED.');
        });
    });
};
