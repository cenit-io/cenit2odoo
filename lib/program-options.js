var program = require('commander'),
    package = require('../package.json');

// Parser command arguments.
program.version(package['version'])
    .option('-l, --local', 'Specify that the collection is a local path to a the json file.')
    .option('-c, --collections [collections]', 'Names of the shared collections at the Cenit IO or local path to json file with shared collection.')
    .option('-o, --out-dir [outDir]', 'Output directory for the resulting addon. Default is "odoo-addons".')
    .option('-s, --statics', 'Specify that must be generated the templates static file.')
    .option('-i, --interactive', 'Specify that run in interactive mode.')
    .option('-a, --all', 'Specify that will generate the addon for each shared collections in Cenit IO.')
    .option('-x, --exclude [exclude]', 'Names of shared collections to exclude. If list is empty, then the names are taken of EXCLUDE_SHARED_COLLECTION environment variable.')
    .option('-v, --odoo-version [odooVersion]', 'Specify odoo version (default 8.0).')
    .parse(process.argv);

// Show the help if arguments are not passed.
if (typeof program.collections != 'string' && !(program.interactive || program.all)) {
    program.outputHelp();
    process.exit();
}

// Prepare exclude shared collection list.
if (program.exclude === true) {
    program.exclude = process.env.EXCLUDE_SHARED_COLLECTION || false
}

if (typeof program.exclude == 'string') {
    program.exclude = program.exclude.split(',').map(function (n) {return n.trim()});
}

module.exports = {
    source: program.collections,
    outDir: program.outDir || 'odoo-addons',
    local: program.local || false,
    statics: program.statics || false,
    interactive: program.interactive || false,
    generateAll: program.all || false,
    exclude: program.exclude || [],
    odooVersion: program.odooVersion || '8.0'
};