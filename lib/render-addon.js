module.exports = function (options, collection) {
    var fs = require('fs'),
        path = require('path'),
        Str = require('string'),
        mkDirP = require('mkdirp'),
        syncRequest = require('sync-request'),
        handlebars = require('./handlebars'),

        outDir = path.join(options.outDir, 'cenit_' + Str(collection.name).underscore().s),
        skeletonDir = path.join(__dirname, '../skeleton'),

        /**
         * Compile and save template file with collection attributes.
         *
         * @param fileName {String}
         */
        renderFile = function (fileName) {
            var filePath = path.join(outDir, fileName),
                source = fs.readFileSync(path.join(skeletonDir, fileName + '.hbs')),
                template = handlebars.compile(source.toString()),
                result = template(collection);

            fs.writeFileSync(filePath, result);
            console.info("CREATED: '%s'.", filePath);
        },

        /**
         * Get and save icon.
         */
        copyIcon = function (fileName) {
            if (collection.image) {
                var filePath = path.join(outDir, fileName),
                    iconUrl = collection.image.thumb.url || collection.image.icon.url || collection.image.url,
                    response = syncRequest('GET', iconUrl);

                fs.writeFileSync(filePath, response.getBody());
                console.info("CREATED: '%s'.", filePath);
            } else {
                console.warn("NO ICON FOUND.");
            }
        },

        /**
         * Copy file from skeleton to output directory.
         *
         * @param fileName {String}
         */
        copyFile = function (fileName) {
            var filePath = path.join(outDir, fileName);

            fs.createReadStream(path.join(skeletonDir, fileName)).pipe(fs.createWriteStream(filePath));
            console.info("CREATED: '%s'.", filePath);
        };

    console.log("----------------------------------------------------------------------");
    console.info("Generating addon for '%s' shared collection.", collection.name);
    console.log("----------------------------------------------------------------------");

    // Add odoo version to collection data.
    collection.odoo_version = options.odooVersion;

    // Create output and addon directories and render or copy files.
    mkDirP.sync(outDir);
    mkDirP.sync(path.join(outDir, 'models'));
    mkDirP.sync(path.join(outDir, 'security'));

    renderFile('models/__init__.py');
    renderFile('models/config.py');
    renderFile('security/ir.model.access.csv');
    renderFile('__init__.py');
    renderFile('__openerp__.py');

    if (collection.pull_parameters && collection.pull_parameters.length > 0) {
        mkDirP.sync(path.join(outDir, 'view'));
        renderFile('view/config.xml');
        renderFile('view/wizard.xml');
    } else {
        mkDirP.sync(path.join(outDir, 'data'));
        renderFile('data/data.xml');
    }

    if (options.statics) {
        mkDirP.sync(path.join(outDir, 'static/description'));

        renderFile('static/description/index.html');
        copyFile('static/description/cenit_io.png');
        copyIcon('static/description/icon.png');
    }

    console.info("\n");
};
