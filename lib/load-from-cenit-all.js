module.exports = function (options) {
    var async = require('async'),
        CenitIO = require('./program-cenit-io-api'),
        render = require('./render-addon'),

        generate = function (sharedCollections, totalPages, currentPage) {
            var actions = sharedCollections.map(function (collectionName) {
                return function (done) {
                    if (options.exclude.indexOf(collectionName) != -1) {
                        console.warn("It skips '%s' to be present at the excluding option.", collectionName);
                        done();
                    } else {
                        CenitIO.getCollection(collectionName, function (collection) {
                            render(options, collection);
                            console.log('----------------------------------------------------------------------');
                            done();
                        });
                    }
                }
            });

            async.series(actions, function (err, result) {
                if (currentPage < totalPages) {
                    console.info('GO TO NEXT PAGE [%d/%d].', currentPage + 1, totalPages);
                    CenitIO.getCollections(currentPage + 1, generate);
                } else {
                    console.info('FINISHED.');
                }
            });
        };

    CenitIO.getCollections(1, generate);
};
