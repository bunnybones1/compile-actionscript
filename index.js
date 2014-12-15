var childProcess = require('child_process');
var flexSdk = require('flex-sdk');
var _ = require('lodash');
var path = require('path');
var chalk = require('chalk');
function compileActionscript(inputPath, opts, callback) {
	console.log('compile!');
	cmdLineOpts = "";
	var outputFile;
	for(var key in opts) {
		var value = opts[key];
		if(key == 'output' || key == 'o') {
			value = path.resolve(value);
			outputFile = value;
		}
		cmdLineOpts += '-' + key + '=' + value + ' ';
	}
	var commandLine = flexSdk.bin.mxmlc + ' ' + cmdLineOpts + ' ' + path.resolve(inputPath);
	console.log(commandLine);
	childProcess.exec(commandLine, null, function(err, stdout, stderr) {
		// TODO: Probably want to do something more here...? Not positive yet.
		var fail = false;
		if (err) {
			console.log(chalk.red('node errors:'));
			console.log(err);
			fail = true;
		}
		if(stderr) {
			console.log(chalk.red('mxmlc errors and warnings:'));
			console.log(stderr);
			if(stderr.indexOf('Error') != -1) {
				fail = true;
			}
		}
		if(stdout) {
			console.log(chalk.green('mxmlc output:'));
			console.log(stdout);
		}

		if(!fail) {
			console.log(chalk.green('File "' + outputFile + '" created.'));
			callback();
		} else {
			callback({
				err: new Error('Failed to compile swf.'),
				stdout: stdout,
				stderr: stderr
			});
		}
	});
}
module.exports = compileActionscript;