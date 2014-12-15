var compileActionscript = require('./');

var inputPath = 'example/Main.as';
console.log('compiling', inputPath);
var opts = {
	'output': 'main.swf',
	'swf-version' : 13,
	'use-gpu' : true
};

compileActionscript(inputPath, opts, function() {
	console.log('complete');
},
function(e) {
	console.log('ERROR!');
	console.log(e);
})