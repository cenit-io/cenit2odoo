var handlebars = require('handlebars'),
    entities = require("entities"),
    Str = require('string');

handlebars.registerHelper('CAPITALIZE', function (str) {
    return Str(str).capitalize().s;
});

handlebars.registerHelper('JSON_STRINGIFY', function (data) {
    return JSON.stringify(data);
});

handlebars.registerHelper('SUMMARIZE', function (content) {
    var sentences = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').trim().split(/[\r\n]+/),
        summary = "",
        idx = 0;

    while (summary.length + sentences[idx].length < 150) {
        summary += sentences[idx++] + "\n";
    }

    return summary.trim() + (summary.length < content.length ? '...' : '');
});

module.exports = handlebars;