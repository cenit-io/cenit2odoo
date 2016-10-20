var handlebars = require('handlebars'),
    entities = require("entities"),
    Str = require('string');

handlebars.registerHelper('HTML_DECODE', function(str) {
    return entities.decodeHTML(str);
});

handlebars.registerHelper('CAPITALIZE', function(str) {
    return Str(str).capitalize().s;
});

module.exports = handlebars;