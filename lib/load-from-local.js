module.exports = function (options) {
    var fs = require('fs'),
        assert = require('./program-assert');

    fs.readFile(options.source, function (err, data) {
        assert.notError(err);

        var collection = JSON.parse(data);

        require('./render-addon')(options, collection);
    });
};
