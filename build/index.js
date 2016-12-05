var Hogan = require('hogan.js'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    govukConfig = require('./config'),
    compiledTemplate,
    govukTemplate;

var template = require.resolve('govuk_template_mustache/views/layouts/govuk_template.html');

govukTemplate = fs.readFileSync(template, { encoding : 'utf-8' });
compiledTemplate = Hogan.compile(govukTemplate);

var renderedTemplate = compiledTemplate.render(govukConfig);
var reHeaderLogo = new RegExp('(<img [^>]+gov.uk_logotype_crown_invert_trans.png[^>]+>)', 'i');
renderedTemplate = renderedTemplate.replace(reHeaderLogo, '{{$globalHeaderImage}}$1{{/globalHeaderImage}}');

fs.writeFileSync(path.resolve(__dirname, '../govuk_template.html'), renderedTemplate, { encoding : 'utf-8' });
