module.exports = function (options) {
    var fs = require('fs'),
        request = require('request'),
        assert = require('./program-assert'),
        url = 'https://cenit.io/api/v1/setup/shared_collection?name=' + options.source;

    console.info("Loading '%s' shared collection from Cenit.IO...", options.source);
    request(url, function (err, response, body) {
        assert.notError(err);

        var data = JSON.parse(body);

        assert.existSharedCollection(data);
        require('./render-addon')(options, data.shared_collection[0]);
    });
};
