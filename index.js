var childProcess = require('child_process');
var flexSdk = require('flex-sdk');
var _ = require('lodash');
var path = require('path');
var chalk = require('chalk');

var compileOptionListSettings = {
	'defines' : { base: 'define', padStrings: true},
	'source-paths' : { base: 'source-path', addTo : true},
	'library-paths' : { base: 'library-path', addTo : true}
}

function createCommandLineOptionList(list, listOptions) {
	cmdLineSnippet = '';
	var equals = listOptions.addTo ? '+=' : '=';
	console.log(chalk.yellow(list instanceof Array));
	if(list instanceof Array) {
		list.forEach(function(item){ 
			cmdLineSnippet += '-' + listOptions.base + equals + '"' + item + '" ';
		});
	} else {
		for (var key in list) {
			var item = list[key]
			var itemType = typeof item;
			if(listOptions.padStrings) {
				switch(itemType) {
					case 'string':
						item = '\\\"' + item + '\\\"';
						break;
					default:
				}
			}
			cmdLineSnippet += '-' + listOptions.base + equals + key + ',"' + item + '" ';
		}
	}
	return cmdLineSnippet;
}

function buildCommandLineOptions(opts) {
	var cmdLineOpts = "";
	for(var key in opts) {
		if(compileOptionListSettings[key]) {
			console.log(chalk.yellow(key));
			cmdLineOpts += createCommandLineOptionList(opts[key], compileOptionListSettings[key]);
		} else {
			var value = opts[key];
			if(key == 'output' || key == 'o') {
				value = path.resolve(value);
			}
			cmdLineOpts += '-' + key + '=' + value + ' ';
		}
	}
	return cmdLineOpts;
}

function compileActionscript(inputPath, opts, callback) {
	console.log('compile!');
	var outputFile = path.resolve(opts.output || opts.o);
	var cmdLineOpts = buildCommandLineOptions(opts);
	var commandLine = flexSdk.bin.mxmlc + ' ' + cmdLineOpts + ' ' + path.resolve(inputPath);
	console.log(chalk.grey(commandLine));
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