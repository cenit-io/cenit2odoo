var handlebars = require('handlebars'),
    entities = require("entities"),
    Str = require('string');

handlebars.registerHelper('CAPITALIZE', function(str) {
    return Str(str).capitalize().s;
});

module.exports = handlebars;