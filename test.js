var compileActionscript = require('./');

var inputPath = './example/src/Main.as';
console.log('compiling', inputPath);
var opts = {
	'output': './example/bin/Main.swf',
	'swf-version': 13,
	'use-gpu': true,
	'defines': {
		'STATUS::testNumber': 1.0,
		'STATUS::testBoolean': true,
		'STATUS::log': 'Hello World!'
	},
	'source-paths': [
		'./example/extraSrc',
		'./example/extraSrc2'
	],
	//COMING SOON!
	// 'library-paths': [
	// 	'example/libs'
	// ]
};

compileActionscript(inputPath, opts, function() {
	console.log('complete');
},
function(e) {
	console.log('ERROR!');
	console.log(e);
})