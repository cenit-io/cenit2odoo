module.exports = function (options) {
    var async = require('async'),
        CenitIO = require('./program-cenit-io-api'),
        render = require('./render-addon'),
        promptly = require('promptly'),
        colors = require('colors'),
        columnify = require('columnify'),

        renderOptions = function (sharedCollections, totalPages, currentPage) {
            var opts = sharedCollections.map(function (sc, i) { return sc }),
                values, msg, optsA, optsB, optAll, optCancel, optNextPage, optPreviewPage, optsTwoColumns, size;

            // Add generate pagination, all and cancel options.
            if (totalPages > currentPage) opts.push(optNextPage = 'NEXT PAGE'.prompt);
            if (currentPage > 1) opts.push(optPreviewPage = 'PREVIEW PAGE'.prompt);
            opts.push(optAll = 'GENERATE ALL ITEMS OF THIS PAGE'.prompt);
            opts.push(optCancel = 'CANCEL'.error);

            values = opts.map(function (sc, i) { return i });

            // Prepare opts to render in two columns.
            size = Math.floor(opts.length / 2);
            optsA = opts.slice(0, size).map(function (o, i) { return i + '. ' + o });
            optsB = opts.slice(size).map(function (o, i) { return (i + size) + '. ' + o });
            optsTwoColumns = optsB.map(function (o, i) { return { c1: optsA[i], c2: optsB[i] } });
            msg = 'Choose shared collection to generate the addon:\n'.prompt
                + '----------------------------------------------------------------------\n'
                + columnify(optsTwoColumns, { showHeaders: false }).choose + '\n'
                + '----------------------------------------------------------------------\n'
                + ('Enter the number of the desired option [' + optCancel + ']:').prompt;

            promptly.choose(msg, values, { default: opts.length - 1 }, function (err, idx) {
                if (opts[idx] == optCancel) process.abort();
                if (opts[idx] == optNextPage) {
                    return CenitIO.getCollections(currentPage + 1, renderOptions);
                } else if (opts[idx] == optPreviewPage) {
                    return CenitIO.getCollections(currentPage - 1, renderOptions);
                } else if (opts[idx] == optAll) {
                    collections = sharedCollections;
                } else {
                    collections = [opts[idx]];
                }

                var actions = collections.map(function (collectionName) {
                    return function (done) {
                        CenitIO.getCollection(collectionName, function (collection) {
                            render(options, collection);
                            console.log('----------------------------------------------------------------------');
                            done();
                        });
                    }
                });

                async.series(actions, function (err, result) {
                    setTimeout(renderOptions, 10, sharedCollections, totalPages, currentPage);
                });
            });
        };

    colors.setTheme({
        choose: 'blue',
        prompt: 'green',
        error: 'red'
    });

    CenitIO.getCollections(1, renderOptions);
};
