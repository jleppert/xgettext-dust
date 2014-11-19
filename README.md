xgettext-dust
=============

Parses dust templates and extracts strings, generating a Gettext POT file for use in i18n translation systems.

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
The glob search starts looking in the root parameter -- the above example just uses process.cwd().

Running Tests
-------------

Make sure you have Mocha installed:

    nom install -g mocha
    npm test


Reporting Bugs & Feature Requests
-------------
Please use github to report all bugs and feature requests at <http://github.com/jleppert/xgettext-dust/issues>.

License
-------------
Copyright (c) 2014 Johnathan Leppert <johnathan.leppert@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
