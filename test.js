var compileActionscript = require('./');

var inputPath = 'example/Main.as';
console.log('compiling', inputPath);
var opts = {
	'output': 'example/Main.swf',
	'swf-version': 13,
	'use-gpu': true,
	'defines': {
		'STATUS::testNumber': 1.0,
		'STATUS::testBool': true,
		'STATUS::log': 'Hello World!'
	}
};

compileActionscript(inputPath, opts, function() {
	console.log('complete');
},
function(e) {
	console.log('ERROR!');
	console.log(e);
})