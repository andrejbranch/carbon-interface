'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'src',
        build: 'build'
    };

    // Grunt configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        carbon: appConfig,

        // The grunt server settings
        connect: {
            dev: {
                options: {
                    port: 9000,
                    open: false,
                    base: ['', '<%= carbon.build %>/develop'],
                    livereload: true
                }
            },
            prod: {
                options: {
                    port: 9001,
                    open: false,
                    base: ['<%= carbon.build %>/production'],
                    livereload: true
                }
            }
        },

        // Compile less to css
        less: {
            dev: {
                options: {
                    compress: true,
                    optimization: 2,
                    modifyVars: {
                        "fa-font-path": '"../../build/develop/fonts"',
                    }
                },
                files: {
                    "src/styles/style.css": "src/less/style.less"
                },
            },
            prod: {
                options: {
                    compress: true,
                    optimization: 2,
                },
                files: {
                    "src/styles/style.css": "src/less/style.less"
                },
            }
        },

        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['src/less/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    nospawn: true,
                    livereload: true
                },
            },
            js: {
                files: ['<%= carbon.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= carbon.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= carbon.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            }
        },

        // Clean build folder
        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= carbon.build %>/develop/{,*/}*',
                    ]
                }]
            },
            prod: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= carbon.build %>/production/{,*/}*',
                    ]
                }]
            },
            server: '.tmp'
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= carbon.app %>',
                        dest: '<%= carbon.build %>/develop',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/patterns/*.*',
                            'styles/style.css',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= carbon.build %>/develop'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= carbon.build %>/develop'
                    },
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= carbon.app %>',
                        dest: '<%= carbon.build %>/production',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/patterns/*.*',
                            'styles/style.css',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= carbon.build %>/production'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= carbon.build %>/production/bootstrap'
                    }
                ]
            },
        },

        // Renames files for browser caching purposes
        filerev: {
            prod: {
                src: [
                    'build/production/*.js',
                    'build/production/styles/{,*/}*.css',
                ]
            }
        },

        htmlmin: {
            prod: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= carbon.build %>/production',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= carbon.build %>/production'
                }]
            }
        },

        htmlbuild: {
            dev: {
                src: 'src/index.html',
                dest: 'build/develop',
                options: {
                    styles: {
                        bundle: [
                            'src/styles/*.css'
                        ]
                    },
                    beautify: false,
                    relative: true,
                    scripts: {
                        bundle: [
                            'bower_components/jquery/dist/jquery.min.js',
                            'bower_components/jquery-ui/jquery-ui.min.js',
                            'bower_components/bootstrap/dist/js/bootstrap.min.js',
                            'bower_components/metisMenu/dist/metisMenu.min.js',
                            'bower_components/slimScroll/jquery.slimscroll.min.js',
                            'bower_components/PACE/pace.min.js',
                            'bower_components/angular/angular.min.js',
                            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                            'src/**/*.js'
                        ]
                    }
                }
            },
            prod: {
                src: 'src/index.html',
                dest: 'build/production',
                options: {
                    styles: {
                        bundle: [
                            'build/production/styles/style*.css'
                        ]
                    },
                    scripts: {
                        bundle: [
                            'build/production/carbon*.js'
                        ]
                    }
                }
            }

        },

        concat: {
            options: {
                separator: '\n',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            prod: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery-ui/jquery-ui.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/metisMenu/dist/metisMenu.min.js',
                    'bower_components/slimScroll/jquery.slimscroll.min.js',
                    'bower_components/PACE/pace.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'build/production/**/*.js'
                ],
                dest: 'build/production/carbon.js'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            prod: {
                files: {
                    '<%= concat.prod.dest %>': ['src/**/*.js']
                }
            }
        },

    });

    // Run live version of app
    grunt.registerTask('live', [
        'clean:server',
        'copy:styles',
        'connect:dev',
        'watch'
    ]);

    // Run build version of app
    grunt.registerTask('dev:server', [
        'build:dev',
        'connect:dev',
        'watch'
    ]);

    // Run build version of app
    grunt.registerTask('prod:server', [
        'build:prod',
        'connect:prod',
        'watch'
    ]);

    // Build version for production
    grunt.registerTask('build:dev', [
        'clean:dev',
        'less:dev',
        'copy:dev',
        'htmlbuild:dev'
    ]);

    // Build version for production
    grunt.registerTask('build:prod', [
        'clean:prod',
        'less:prod',
        'ngAnnotate:prod',
        'concat:prod',
        'copy:prod',
        // 'cssmin',
        'uglify',
        'filerev:prod',
        'htmlbuild:prod',
        'htmlmin:prod'
    ]);

};
