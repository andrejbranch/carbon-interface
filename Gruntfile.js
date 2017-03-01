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
                    open: true,
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
                        "fa-font-path": '"../../<%= carbon.build %>/develop/fonts"',
                    }
                },
                files: {
                    // "<%= carbon.build %>/develop/grid.css": "<%= carbon.app %>/common/grid/grid-style.less",
                    // "<%= carbon.build %>/develop/one-to-many.css": "<%= carbon.app %>/common/form/one-to-many/one-to-many-styles.less",
                    // "<%= carbon.build %>/develop/app.css": "<%= carbon.app %>/common/profile/profile-style.less",
                    // "<%= carbon.build %>/develop/storage.css": "<%= carbon.app %>/storage/storage-styles.less",
                    // "<%= carbon.build %>/develop/carbon.css": "<%= carbon.app %>/common/less/style.less"
                },
            },
            prod: {
                options: {
                    compress: true,
                    optimization: 2,
                    modifyVars: {
                        "fa-font-path": '"/fonts"',
                    }
                },
                files: {
                    // 'bower_components/cryoblock-common/release/cryoblock.css',
                    // 'bower_components/cryoblock-common/release/cryoblock.css',
                    // "<%= carbon.build %>/production/app.css": "<%= carbon.app %>/common/profile/profile-style.less",
                    // "<%= carbon.build %>/production/carbon.css": "<%= carbon.app %>/common/less/style.less"
                },
            }
        },

        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['<%= carbon.app %>/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    nospawn: true,
                    livereload: true
                },
            },
            js: {
                files: ['<%= carbon.app %>/**/*.js'],
                tasks: ['htmlbuild:dev'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['<%= carbon.app %>/**/*.html'],
                options: {
                    livereload: true
                },
                tasks: ['html2js:dev', 'htmlbuild:dev']
            },
            cryoblock: {
                files: ['bower_components/cryoblock-common/release/**/*.js'],
                options: {
                    livereload: true
                },
                tasks: ['build:dev']
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
            },
            prod: {
                files: {
                    '<%= carbon.build %>/production/carbon.js': [
                        '<%= carbon.build %>/production/carbon.js',
                        '<%= carbon.build %>/production/templates.js',
                        '<%= carbon.build %>/production/cb-constants.js'
                    ]
                }
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
                            'styles/style.css',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/cryoblock-common/release',
                        src: ['images/*.*'],
                        dest: '<%= carbon.build %>/develop'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/cryoblock-common/release',
                        src: ['fonts/*.*'],
                        dest: '<%= carbon.build %>/develop'
                    }

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
                            'styles/style.css',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/cryoblock-common/release',
                        src: ['images/*.*'],
                        dest: '<%= carbon.build %>/production'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/cryoblock-common/release',
                        src: ['fonts/*.*'],
                        dest: '<%= carbon.build %>/production'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/cryoblock-common/release',
                        src: ['cryoblock.css'],
                        dest: '<%= carbon.build %>/production'
                    },
                ]
            },
        },

        // Renames files for browser caching purposes
        filerev: {
            prod: {
                src: [
                    '<%= carbon.build %>/production/*.js',
                    '<%= carbon.build %>/production/*.css',
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
                src: '<%= carbon.app %>/index.html',
                dest: '<%= carbon.build %>/develop',
                options: {
                    styles: {
                        bundle: [
                            'bower_components/cryoblock-common/release/cryoblock.css',
                            '<%= carbon.build %>/develop/*.css',
                        ]
                    },
                    beautify: false,
                    relative: true,
                    scripts: {
                        bundle: [
                            'bower_components/cryoblock-common/release/cryoblock.js',
                            '<%= carbon.build %>/develop/templates.js',
                            '<%= carbon.build %>/develop/cb-constants.js',
                            '<%= carbon.app %>/**/*.js'
                        ]
                    }
                }
            },
            prod: {
                src: '<%= carbon.app %>/index.html',
                dest: '<%= carbon.build %>/production',
                options: {
                    styles: {
                        bundle: [
                            'cryoblock.css',
                            '<%= carbon.build %>/production/*.css'
                        ]
                    },
                    scripts: {
                        bundle: [
                            '<%= carbon.build %>/production/carbon*.js'
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
                    'bower_components/cryoblock-common/release/cryoblock.js',
                    '<%= carbon.build %>/production/templates.js',
                    '<%= carbon.build %>/production/cb-constants.js',
                    '<%= carbon.build %>/production/**/*.js'
                ],
                dest: '<%= carbon.build %>/production/carbon.js'
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

        html2js: {
            options: {
                module: 'templates'
            },
            dev: {
                src: ['<%= carbon.app %>/**/*.html'],
                dest: '<%= carbon.build %>/develop/templates.js'
            },
            prod: {
                src: ['src/**/*.html'],
                dest: '<%= carbon.build %>/production/templates.js'
            }
        },

        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= carbon.app %>',
                    src: ['**/*.{png,jpg,gif,ico,svg}'],
                    dest: '<%= carbon.build %>/develop/images/'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= carbon.app %>',
                    src: ['**/*.{png,jpg,gif,ico,svg}'],
                    dest: '<%= carbon.build %>/production/images/'
                }]
            }
        },

        ngconstant: {
            dev: {
                options: {
                    dest: '<%= carbon.build %>/develop/cb-constants.js',
                    name: 'cb-constants',
                },
                constants: {
                    package: grunt.file.readJSON('package.json'),
                    app: grunt.file.readJSON('env.js')['app'],
                    API: grunt.file.readJSON('env.js')['API'],
                    loginParams: grunt.file.readJSON('env.js')['loginParams']
                }   ,
                values: {
                    debug: true
                }
            },
            prod: {
                options: {
                    dest: '<%= carbon.build %>/production/cb-constants.js',
                    name: 'cb-constants',
                },
                constants: {
                    app: grunt.file.readJSON('env.js')['app'],
                    package: grunt.file.readJSON('package.json'),
                    API: grunt.file.readJSON('env.js')['API'],
                    loginParams: grunt.file.readJSON('env.js')['loginParams']
                }   ,
                values: {
                    debug: true
                }
            }
        }

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
        'ngconstant:dev',
        'html2js:dev',
        'htmlbuild:dev',
        // 'imagemin:dev'
    ]);

    // Build version for production
    grunt.registerTask('build:prod', [
        'clean:prod',
        'less:prod',
        'ngAnnotate:prod',
        'html2js:prod',
        'ngconstant:prod',
        'concat:prod',
        'copy:prod',
        // 'cssmin',
        'uglify:prod',
        'filerev:prod',
        'htmlbuild:prod',
        'htmlmin:prod',
        'imagemin:prod'
    ]);

};
