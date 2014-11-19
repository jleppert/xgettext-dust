var should 		 = require('chai').should(),
	path	     = require('path'),
	fs           = require('fs');

var xgettextDust = require(path.resolve(__dirname, '../index'));

describe('Parsing one or more templates', function(){
  describe('simple @i18n helpers examples', function(){
    it('parsing one or more dust templates', function(){
      var result = xgettextDust('examples/*.dust', {
		version: '0.0.1',
		langTeam: 'team',
		bugReports: 'bugs@example.com',
		root: path.resolve(__dirname, '../'),
		noDate: true
	  });

	  fs.writeFileSync('basic.pot', result, 'utf8');

      xgettextDust('examples/*.dust', {
		version: '0.0.1',
		langTeam: 'team',
		bugReports: 'bugs@example.com',
		root: path.resolve(__dirname, '../'),
		noDate: true
	  }).should.equal(fs.readFileSync(path.resolve(__dirname, '../examples/basic.pot'), 'utf8'));
    })
  })
});