var dust 	= require('dustjs-linkedin'),
	gettext = require('gettext-parser'),
	glob    = require('glob'),
	path    = require('path'),
	fs      = require('fs');

function parseFiles(globPattern, options) {
	var files        = [],
		options      = options || {},
		globPatterns = Array.isArray(globPattern) ? globPattern : [globPattern];

	options.root = options.root || process.cwd();
	
	globPatterns.forEach(function(globPattern) {
		files = files.concat(glob.sync(globPattern, {
			cwd:  options.root,
			root: options.root
		}));
	});

	var translations = {},
		memory = {};
	files.forEach(function(file) {
		translations[file] = parseString(fs.readFileSync(path.resolve(options.root, file), 'utf8'), file, memory, options);
	});

	return createPoFile(translations, options, memory);
}

function createPoFile(translations, options, memory) {
	var poJSON = {};

	if(!options.merge) {
		var headers = {
			'project-id-version':         options.version,
			'language-team':              options.langTeam,
			'report-msgid-bugs-to':       options.bugReports,
			'po-revision-date':           'YEAR-MO-DA HO:MI+ZONE',
			'mime-version':               '1.0',
			'content-type':               'text/plain; charset=utf-8',
			'content-transfer-encoding':  '8bit'
		};

		poJSON = {
			charset: 'utf-8',
			headers: headers,
			translations: {
				'': {}
			}
		};
	} else {
		try {
			poJSON = gettext.po.parse(fs.readFileSync(path.resolve(path.join(options.root, options.merge)), 'utf-8'));
		} catch(e) {
			throw new Error('An error occurred while using the provided PO file. Please make sure it is valid by using `msgfmt -c`.');
		}
	}

	if(!options.noDate) poJSON.headers['pot-creation-date'] = new Date().toISOString().replace('T', ' ').replace(/:\d{2}.\d{3}Z/, '+0000');

	Object.keys(translations).forEach(function(file) {
		Object.keys(translations[file]).forEach(function(entry) {
			var translationEntry = translations[file][entry];

			// @TODO: reference complete extracted helper call
			translationEntry.comments = {
				reference: memory[JSON.stringify(translationEntry)].join("\n")
			};

			poJSON.translations[''][entry] = translationEntry;
		});
	});

	return gettext.po.compile(poJSON).toString();
}

function parseString(str, filename, memory, options) {
	var translations = {};

	parseDust(str).forEach(function(helper) {
		var entry = {};

		entry.msgid = helper.body || helper.singular;

		if(helper.context) entry.msgctxt = helper.context;
		if(helper.plural) {
			entry.msgid_plural = helper.plural;
			entry.msgstr = ['', ''];
		}

		var index = JSON.stringify(entry);
		memory[index] = memory[index] || [];
		memory[index].push(filename + ':' + helper.line);

		translations[entry.msgid] = entry;
	});

	return translations;
}

function parseDust(buffer) {
	var ast = dust.parse(buffer.toString('utf8'));
	var util = require('util');

	var output = [];

	function visit(parent, child) {
		if(Array.isArray(child)) {
			child.forEach(function(node) {
				visit(child, node);
			});
			return;
		} else {
			if(child === '@') {
		        if(parent[1][0] === 'key' && parent[1][1] === 'i18n') {
					var _p = {};

					var params = parent.filter(function(block) {
						return block[0] === 'params';
					})[0];
					params.shift();

					var line = parent.filter(function(block) {
						return block[0] === 'line';
					})[0];
					_p[line] = line.pop();

					var bodies = parent.filter(function(block) {
						return block[0] === 'bodies';
					})[0];
					var bodiesParams = bodies[1];
					
					var _b = [];
					if(Array.isArray(bodiesParams)) {
						var body = bodiesParams.filter(function(block) {
							return block[0] === 'body';
						})[0];

						body.forEach(function(bodyItem) {
							if(bodyItem[0] === 'buffer') {
								_b.push(bodyItem[1]);
							} else if(bodyItem[0] === 'reference') {
								_b.push('{' + bodyItem[1][1] + '}');
							}
						});
					}
					if(_b.length) _p.body = _b.join('');
					
					params.forEach(function(p) {
						p.shift();
						if(p[0][0] === 'literal') {
							if(p[1][0] === 'body') {
								var paramBody = p[1];
								paramBody.shift();
								var _b = [];
								paramBody.forEach(function(bodyItem) {
									if(bodyItem[0] === 'buffer') {
										_b.push(bodyItem[1])
									} else if(bodyItem[0] === 'reference') {
										_b.push('{' + bodyItem[1][1] + '}')
									}
								});
								_p[p[0][1]] = _b.join('');
							} else {
								_p[p[0][1]] = p[1][1];
							}
						}
					});
					output.push(_p);
				}
			}
		}
	}
	  
	visit(undefined, ast);

	return output;
};

module.exports = {
	parseString: function(str, filename, memory, options) {
		var memory = memory || {},
			translations = {};
		translations[filename] = parseString(str, filename, memory, options);
		return createPoFile(translations, options, memory);
	},
	parseFiles:  parseFiles
};