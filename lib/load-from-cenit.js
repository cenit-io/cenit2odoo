module.exports = function (options) {
    var async = require('async'),
        CenitIO = require('./program-cenit-io-api'),
        render = require('./render-addon'),
        collections = options.source.split(','),

        actions = collections.map(function (collectionName) {
            return function (done) {
                CenitIO.getCollection(collectionName.trim(), function (collection) {
                    render(options, collection);
                    console.log('----------------------------------------------------------------------');
                    done();
                });
            }
        });

    async.series(actions, function (err, result) {
        console.info('FINISHED.');
    });
};
