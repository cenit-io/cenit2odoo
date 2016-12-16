module.exports = function (options) {
    var async = require('async'),
        CenitIO = require('./program-cenit-io-api'),
        render = require('./render-addon');

    CenitIO.getCollections(function (sharedCollections) {
        var actions = sharedCollections.map(function (collection) {
            return function (done) {
                if (options.exclude.indexOf(collection) != -1) {
                    console.warn("It skips '%s' to be present at the excluding option.", collection);
                    done();
                } else {
                    CenitIO.getCollection(collection, function (collection) {
                        render(options, collection);
                        console.log('----------------------------------------------------------------------');
                        done();
                    });
                }
            }
        });

        async.series(actions, function (err, result) {
            console.info('FINISHED.');
        });
    });
};
