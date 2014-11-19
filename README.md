xgettext-dust
=============

Parses dust templates and extracts strings, generating a Gettext POT file for use in i18n translation systems. 

We take a dust template that has one or more @i18n helper calls:

	{@i18n singular="Hello, {first_name}, you have one message." plural="Hello, {first_name}, you have {message_count} messages!"/}

And then output the corresponding POT file template, for use in Gettext translation workflows:

	#: examples/basic2.dust:10
	msgid "Hello, {first_name}, you have one message."
	msgid_plural "Hello, {first_name}, you have {message_count} messages!"
	msgstr[0] ""
	msgstr[1] ""

Support is included for singular, plural, context and file/line reference. Instead of sprintf style replacements, we leverage the Dust placeholders, which functionally work the same way. Parsing is done via the real dust parser (using the generated AST from the dust templates), so all valid Dust syntax and templates are supported.

Installing
-------------

    npm install xgettext-dust

Usage Example
-------------

``` js
var xgettextDust = require('xgettext-dust');

var generatedPOT = xgettextDust('templates/*.dust', {
    version: '0.0.1',
    langTeam: 'team',
	bugReports: 'bugs@example.com',
	root: process.cwd()
});

// do something with the output, save to file, etc.
fs.writeFileSync('dustStrings.pot', generatedPOT, 'utf8'); 

```

The first parameter is a glob pattern, so you can scan directories recursively looking for templates.
The glob search starts looking in the root parameter -- the above example just uses `process.cwd()`.

Running Tests
-------------

Make sure you have Mocha installed:

    nom install -g mocha
    npm test


Reporting Bugs & Feature Requests
-------------
Please use github to report all bugs and feature requests at <http://github.com/jleppert/xgettext-dust/issues>.

Further Reading
-------------
[Gettext Intro](https://developer.mozilla.org/en-US/docs/gettext)

[The PO Format](http://pology.nedohodnik.net/doc/user/en_US/ch-poformat.html)

[Javascript Gettext Implementation](http://slexaxton.github.io/Jed/)

[The entire gettext spec](http://www.gnu.org/savannah-checkouts/gnu/gettext/manual/html_node/gettext.html)

[Po2json converter](https://github.com/mikeedwards/po2json)

License
-------------
Copyright (c) 2014 Johnathan Leppert <johnathan.leppert@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
