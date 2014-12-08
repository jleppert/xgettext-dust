var should 		 = require('chai').should(),
	path	     = require('path'),
	fs           = require('fs');

var xgettextDust = require(path.resolve(__dirname, '../index'));

describe('Parsing one or more templates', function(){
  describe('simple @i18n helpers examples', function(){
    it('should parse the template, extract helpers and create a pot file', function(){
      var result = xgettextDust.parseFiles('examples/*.dust', {
		version: '0.0.1',
		langTeam: 'team',
		bugReports: 'bugs@example.com',
		root: path.resolve(__dirname, '../'),
		noDate: true
	  });

	  fs.writeFileSync(path.resolve(__dirname, '../examples/basic.pot'), result, 'utf8');

      xgettextDust.parseFiles('examples/*.dust', {
		version: '0.0.1',
		langTeam: 'team',
		bugReports: 'bugs@example.com',
		root: path.resolve(__dirname, '../'),
		noDate: true
	  }).should.equal(fs.readFileSync(path.resolve(__dirname, '../examples/basic.pot'), 'utf8'));
    });
  });
});

describe('Parsing a template from a string', function(){
  describe('simple @i18n helpers example', function(){
    it('should parse a string and return the generated POT file', function(){
      var fileContents  = fs.readFileSync(path.resolve(__dirname, '../examples/basic.dust'));
      
      var result = xgettextDust.parseString(fileContents, 'examples/basic.dust', {}, {
		version: '0.0.1',
		langTeam: 'team',
		bugReports: 'bugs@example.com',
		root: path.resolve(__dirname, '../'),
		noDate: true
	  });

	  fs.writeFileSync(path.resolve(__dirname, '../examples/basic_string.pot'), result, 'utf8');

      xgettextDust.parseString(fileContents, 'examples/basic.dust', {}, {
		version: '0.0.1',
		langTeam: 'team',
		bugReports: 'bugs@example.com',
		root: path.resolve(__dirname, '../'),
		noDate: true
	  }).should.equal(fs.readFileSync(path.resolve(__dirname, '../examples/basic_string.pot'), 'utf8'));
    });
  });
});