module.exports = function (options) {
    var request = require('request'),
        async = require('async'),
        assert = require('./program-assert'),
        collections = options.source.split(','),
        render = require('./render-addon'),
        actions = [];

    collections.forEach(function (collection) {
        actions.push(function (done) {
            collection = collection.trim();
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
        console.info('FINISHED.');
    });
};
