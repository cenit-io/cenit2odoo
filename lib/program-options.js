var program = require('commander'),
    package = require('../package.json');

// Parser command arguments.
program.version(package['version'])
    .option('-l, --local', 'Specify that the collection is a local path to a the json file.')
    .option('-c, --collections [collections]', 'Names of the shared collections at the Cenit-IO or local path to json file with shared collection.')
    .option('-o, --out-dir [outDir]', 'Output directory for the resulting addon. Default is "odoo-addons".')
    .option('-s, --statics [statics]', 'Specify that must be generated the templates static file.')
    .parse(process.argv);

// Show the help if arguments are not passed.
if (!program.collections) {
    program.outputHelp();
    process.exit();
}

module.exports = {
    source: program.collections,
    outDir: program.outDir || 'odoo-addons',
    local: program.local || false,
    statics: program.statics || false
};