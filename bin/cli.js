#!/usr/bin/env node

require('../lib/program-title');

// Parser options from command arguments.
var options = require('../lib/program-options'),
    loadFrom;

if (options.local) {
    loadFrom = 'load-from-local';
} else if (options.interactive) {
    loadFrom = 'load-from-cenit-interactive';
} else if (options.generateAll) {
    loadFrom = 'load-from-cenit-all';
} else {
    loadFrom = 'load-from-cenit';
}

require('../lib/' + loadFrom)(options);