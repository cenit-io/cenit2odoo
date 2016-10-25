module.exports = function (options) {
    var request = require('request'),
        assert = require('./program-assert'),
        collections = options.source.split(','),
        render = require('./render-addon');

    collections.forEach(function (collection) {
        collection = collection.trim();
        var url = 'https://cenit.io/api/v1/setup/shared_collection?name=' + collection;

        console.info("Loading '%s' shared collection from Cenit IO...", collection);
        request(url, function (err, response, body) {
            assert.notError(err);

            var data = JSON.parse(body);

            assert.existSharedCollection(data);
            render(options, data.shared_collection[0]);
        });
    });
};
