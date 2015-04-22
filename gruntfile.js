module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    var fs = require('fs');
    var path = require('path');

    // Project configuration.
    grunt.initConfig({

        // Metadata loading
        pkg: grunt.file.readJSON('package.json'),
        site: 'site',
        target: '_gh_pages',

        // CLEAN UP
        clean: {
            target: '<%= target %>',
            validationLogs: 'logs/validation',
            testLogs: 'logs/karma'
        },

        //
        // LESS / CSS TASKS
        //
        // Compile LESS to CSS
        less: {
            site: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: '<%= site %>/assets/css/<%= pkg.name %>.css.map'
                },
                src: 'less/<%= pkg.name %>.less',
                dest: '<%= site %>/assets/css/<%= pkg.name %>.css'
            }
        },

        // Add prefix support for older browsers before tags met standards
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            site: {
                options: {
                    map: true
                },
                src: '<%= less.site.dest %>'
            }
        },

        // Tidy up CSS output (order of attributes etc)
        csscomb: {
            options: {
                config: 'less/.csscomb.json'
            },
            site: {
                expand: true,
                cwd: '<%= site %>/assets/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= site %>/assets/css/'
            }
        },

        // Minify CSS
        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                advanced: false
            },
            site: {
                src: '<%= less.site.dest %>',
                dest: '<%= less.site.dest %>'
            }
        },

        // Check CSS formatting
        csslint: {
            options: {
                csslintrc: 'less/.csslintrc'
            },
            site: [
                '<%= less.site.dest %>'
            ]
        },

        //
        // JS TASKS
        //
        // Check JS formatting
        jshint: {
            options: {
                jshintrc: 'javascript/.jshintrc'
            },
            site: {
                src: 'javascript/*.js'
            }
        },

        // Check JS style
        jscs: {
            options: {
                config: 'javascript/.jscsrc'
            },
            site: {
                src: '<%= jshint.site.src %>'
            }
        },

        // Run JS tests
        karma: {
            unit: {
                plugins: [
                    'karma-jasmine',
                    'karma-phantomjs-launcher',
                    'karma-coverage',
                    'karma-spec-reporter'
                ],
                basePath: '.',
                frameworks: ['jasmine'],
                files: [
                    {src: ['bower_components/angular/angular.js'], watched: false},
                    {src: ['bower_components/angular-mocks/angular-mocks.js'], watched: false},
                    {src: ['bower_components/angular-bootstrap/angular-bootstrap.js'], watched: false},
                    {src: ['javascript/src/**/*.js']},
                    {src: ['javascript/tests/**/*.spec.js']}
                ],
                browsers: ['PhantomJS'],
                logLevel: 'INFO',
                runnerPort: 9999,
                singleRun: true,
                reporters: ['spec', 'coverage'],
                preprocessors: {'javascript/src/**/*.js': ['coverage']},
                coverageReporter: {
                    type: 'lcov',
                    dir: '<%= clean.testLogs %>'
                }
            }
        },

        // Create joined up JS file
        concat: {
            site: {
                src: ['javascript/<%= pkg.name %>.js', 'javascript/src/**/*.js'],
                dest: '<%= site %>/assets/js/<%= pkg.name %>.js'
            }
        },

        // Minification of JS
        uglify: {
            options: {
                preserveComments: 'some'
            },
            site: {
                src: '<%= concat.site.dest %>',
                dest: '<%= concat.site.dest %>'
            }
        },

        //
        // DOCUMENTATION TASKS
        //
        // Build documentation with jekyll
        jekyll: {
            options: {
                config: '_config.yml'
            },
            build: {
                options: {
                    raw: 'github: true'
                }
            }
        },

        // Validate HTML of jekyll site
        validation: {
            options: {
                charset: 'utf-8',
                doctype: 'HTML5',
                failHard: true,
                reset: true,
                path: '<%= clean.validationLogs %>/status.json',
                reportpath: '<%= clean.validationLogs %>/report.json',
                relaxerror: [
                    'This interface to HTML5 document checking is deprecated.'
                ]
            },
            files: {
                src: '<%= target %>/**/*.html'
            }
        },

        copy: {
            dist: {
                expand: true,
                filter: 'isFile',
                cwd: '<%= site %>/assets',
                src: '*/*',
                dest: '<%= target %>/assets/'
            }
        },

        connect: {
            server: {
                options: {
                    port: 1337,
                    base: '_gh_pages',
                    livereload: true
                }
            }
        },

        watch: {
            script: {
                files: ['javascript/<%= pkg.name %>.js', 'javascript/src/**/*.js'],
                tasks: ['js-compile', 'copy'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: 'less/**/*.less',
                tasks: ['css-compile', 'copy'],
                options: {
                    livereload: true
                }
            },
            templates: {
                files: ['site/**/*.html', 'site/**/*.md'],
                tasks: ['jekyll:build', 'copy'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Load grunt plugins
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('time-grunt')(grunt);

    // JS distribution tasks
    grunt.registerTask('js-compile', ['jshint', 'jscs', 'concat']);
    grunt.registerTask('js-dist', ['js-compile', 'uglify']);

    // CSS distribution task
    grunt.registerTask('css-compile', ['less', 'autoprefixer', 'csscomb']);
    grunt.registerTask('css-dist', ['css-compile', 'cssmin']);

    // Distribution tasks
    grunt.registerTask('test', ['clean:testLogs', 'karma']);
    grunt.registerTask('docs', ['jekyll:build', 'clean:validationLogs', 'validation']);
    grunt.registerTask('assets', ['js-dist', 'css-dist', 'copy']);

    // Full execution
    grunt.registerTask('build', ['clean:target', 'test', 'docs', 'assets']);
    grunt.registerTask('run', ['jekyll:build', 'js-compile', 'css-compile', 'copy', 'connect:server', 'watch']);
    grunt.registerTask('default', ['build']);
};
