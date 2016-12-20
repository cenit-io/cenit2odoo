var request = require('request'),
    assert = require('./program-assert'),
    render = require('./render-addon');

module.exports = {

    getURL: function (name) {
        var url = process.env['CENIT_IO_API_COLLECTION_URL'] || 'https://cenit.io/api/v2/setup/cross_shared_collection';

        return name ? url + '?name=' + name : url + '?only=name'
    },

    getCollection: function (name, done) {
        var url = this.getURL(name);

        console.info("Loading '%s' shared collection from Cenit IO...", name);
        request(url, function (err, response, body) {
            assert.notError(err);

            var data = JSON.parse(body),
                collection = assert.existSharedCollection(data);

            done(collection, data.total_pages, data.current_page);
        });
    },

    getCollections: function (page, done) {
        var url = this.getURL();

        console.info("Loading shared collections from Cenit IO...");
        request(url + '&page=' + page, function (err, response, body) {
            assert.notError(err);

            var data = JSON.parse(body),
                collections = assert.existSharedCollections(data).map(function (sc, i) { return sc.name }).sort();

            done(collections, data.total_pages, data.current_page);
        });
    }
};