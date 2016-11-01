var handlebars = require('handlebars'),
    entities = require("entities"),
    Str = require('string');

handlebars.registerHelper('CAPITALIZE', function(str) {
    return Str(str).capitalize().s;
});

handlebars.registerHelper('JSON_STRINGIFY', function(data) {
    return JSON.stringify(data);
});

module.exports = handlebars;