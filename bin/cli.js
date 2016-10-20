#!/usr/bin/env node

require('../lib/program-title');

// Parser options from command arguments.
var options = require('../lib/program-options'),
    loadFrom = options.local ? 'load-from-local' : 'load-from-cenit';

require('../lib/' + loadFrom)(options);