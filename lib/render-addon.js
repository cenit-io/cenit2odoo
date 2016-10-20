module.exports = function (options, collection) {
    var fs = require('fs'),
        path = require('path'),
        Str = require('string'),
        mkDirP = require('mkdirp'),
        handlebars = require('./handlebars'),
        assert = require('./program-assert'),

        outDir = path.join(options.outDir, Str(collection.name).underscore().s),
        skeletonDir = path.join(__dirname, '../skeleton'),

        /**
         * Compile and save template file with collection attributes.
         *
         * @param fileName {String}
         */
        renderFile = function (fileName) {
            var filePath = path.join(outDir, fileName);

            fs.readFile(path.join(skeletonDir, fileName + '.hbs'), function (err, source) {
                assert.notError(err);

                var template = handlebars.compile(source.toString()),
                    result = template(collection);

                fs.writeFile(filePath, result, function (err) {
                    assert.notError(err);
                    console.info("CREATED: '%s'.", filePath);
                });
            });

        },

        /**
         * Copy file from skeleton to output directory.
         *
         * @param fileName {String}
         */
        copyFile = function (fileName) {
            var filePath = path.join(outDir, fileName);

            fs.createReadStream(path.join(skeletonDir, fileName)).pipe(
                fs.createWriteStream(filePath)
            );
            console.info("CREATED: '%s'.", filePath);
        };

    // Create output directory.
    mkDirP(outDir, function (err) {
        assert.notError(err);

        // Create addon directories.
        mkDirP.sync(path.join(outDir, 'models'));
        mkDirP.sync(path.join(outDir, 'security'));
        mkDirP.sync(path.join(outDir, 'view'));
        mkDirP.sync(path.join(outDir, 'static/description'));

        renderFile('models/__init__.py');
        renderFile('models/config.py');
        renderFile('security/ir.model.access.csv');
        renderFile('view/config.xml');
        renderFile('view/wizard.xml');
        renderFile('static/description/index.html');
        renderFile('__init__.py');
        renderFile('__openerp__.py');

        copyFile('static/description/cenitsaas.png');
        copyFile('static/description/icon.png');
        copyFile('static/description/mapping.png');
        copyFile('static/description/post-install.png');
    });
};