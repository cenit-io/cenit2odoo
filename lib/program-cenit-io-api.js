var request = require('request'),
    assert = require('./program-assert'),
    render = require('./render-addon');

module.exports = {

    getURL: function (name) {
        var url = process.env['CENIT_IO_API_COLLECTION_URL'] || 'https://cenit.io/api/v1/setup/shared_collection';

        return name ? url + '?name=' + name : url + '?only=name'
    },

    getCollection: function (name, done) {
        var url = this.getURL(name);

        console.info("Loading '%s' shared collection from Cenit IO...", name);
        request(url, function (err, response, body) {
            assert.notError(err);

            var data = JSON.parse(body),
                collection = assert.existSharedCollection(data);

            done(collection);
        });
    },

    getCollections: function (done) {
        var url = this.getURL();

        console.info("Loading shared collections from Cenit IO...");
        request(url, function (err, response, body) {
            assert.notError(err);

            var data = JSON.parse(body),
                sharedCollections = assert.existSharedCollections(data).map(function (sc, i) { return sc.name }).sort();

            done(sharedCollections);
        });
    }
};