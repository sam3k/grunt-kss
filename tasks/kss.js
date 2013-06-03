/*
 * grunt-kss
 * 
 *
 * Copyright (c) 2013 Soenke Schnoor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var path = require('path'),
		base = path.dirname(require.resolve('kss')),
		options = {
			css: '-c',
			less: '-l',
			sass: '-S',
			scss: '-C',
			styl: '-y'
		};

	function getOption(extension) {
		return options[extension] ? options[extension] : options.css;
	}

	function detectPreprocessorByExtension(path) {
		var pieces = path.split(/\./);

		return getOption(pieces[pieces.length -1]);
	}

	grunt.registerMultiTask('kss', 'Knyle Style Sheets living styleguide generator.', function() {
		var options = this.options({
				preprocessor: 'auto'
			}),
			source = grunt.file.expand(this.files[0].src),
			params = [source, this.files[0].dest],
			preprocessorFlag,
			childTask,
			done = this.async();

		if (source[0] && grunt.file.isDir(source[0])) {
			// Include own template
			if (options.template) {
				if (grunt.file.isDir(options.template)) {
					params.push('-t');
					params.push(options.template);
				}
				else {
					grunt.log.warn('Template directory "' + options.template + '" not found!');
				}
			}

			// Compile external styles.
			if (options.styles) {
				if (grunt.file.exists(options.styles)) {
					preprocessorFlag = options.preprocessor !== 'auto' ? getOption(options.preprocessor) : detectPreprocessorByExtension(options.styles);
					
					params.push(preprocessorFlag);
					params.push(options.styles);
				}
				else {
					grunt.log.warn('Styles file "' + options.styles + '" not found!');
				}
			}

			// Run kss-node.
			childTask = grunt.util.spawn({
				cmd: base + '/bin/kss-node',
				args: params
			}, function (err) {
				if (err) {
					grunt.log.writeln('ERROR'.red);
					grunt.fatal(err);
				}

				done();
			});

			childTask.stdout.pipe(process.stdout);
			childTask.stderr.pipe(process.stderr);				
		}
		else {
			grunt.fail.warn('No source directory specified.');
			done();
		}
	});
};