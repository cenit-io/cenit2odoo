var program = require('commander');

// Parser command arguments.
program.version('1.0.0')
    .option('-l, --local', 'Specify that the source is a local path to a the json file.')
    .option('-s, --source [source]', 'Name of the shared collection at the Cenit-IO or local path to json file with shared collection.')
    .option('-d, --out-dir [outDir]', 'Output directory for the resulting addon. Default is "odoo-addons".')
    .parse(process.argv);

// Show the help if arguments are not passed.
if (!program.source) {
    program.outputHelp();
    process.exit();
}

module.exports = {
    source: program.source,
    outDir: program.outDir || 'odoo-addons',
    local: program.local || false
};