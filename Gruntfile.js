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
                    "<%= carbon.build %>/develop/app.css": "<%= carbon.app %>/common/profile/profile-style.less",
                    "<%= carbon.build %>/develop/carbon.css": "<%= carbon.app %>/common/less/style.less"
                },
            },
            prod: {
                options: {
                    compress: true,
                    optimization: 2,
                },
                files: {
                    "<%= carbon.build %>/production/app.css": "<%= carbon.app %>/common/profile/profile-style.less",
                    "<%= carbon.build %>/production/carbon.css": "<%= carbon.app %>/common/less/style.less"
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
                tasks: ['html2js:dev']
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
                        '<%= carbon.build %>/production/templates.js'
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
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= carbon.app %>/scripts',
                        src: ['*.js'],
                        dest: '<%= carbon.build %>/production/scripts'
                    }
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
                            '<%= carbon.app %>/common/fonts/**/*.css',
                            '<%= carbon.build %>/develop/*.css',
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
                            'bower_components/angular/angular.js',
                            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                            'bower_components/angular-ui-router.stateHelper/statehelper.min.js',
                            'bower_components/ngstorage/ngStorage.min.js',
                            'bower_components/angular-toastr/dist/angular-toastr.*.min.js',
                            'bower_components/ngStorage/ngStorage.min.js',
                            'bower_components/angular-permission/dist/angular-permission.js',
                            'bower_components/angular-cookies/angular-cookies.min.js',
                            'bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
                            'bower_components/blueimp-file-upload/js/vendor/*.js',
                            'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
                            'bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js',
                            'bower_components/blueimp-file-upload/js/jquery.fileupload-process.js',
                            'bower_components/iCheck/icheck.min.js',
                            'bower_components/angular-svg-round-progressbar/build/roundProgress.min.js',
                            'bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
                            'bower_components/datatables/media/js/jquery.dataTables.js',
                            'bower_components/datatables_plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                            'bower_components/angular-loading-bar/build/loading-bar.js',
                            'bower_components/angular-datatables/dist/angular-datatables.js',
                            '<%= carbon.build %>/develop/templates.js',
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
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery-ui/jquery-ui.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/metisMenu/dist/metisMenu.min.js',
                    'bower_components/slimScroll/jquery.slimscroll.min.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-ui-router.stateHelper/statehelper.min.js',
                    'bower_components/ngstorage/ngStorage.min.js',
                    'bower_components/angular-toastr/dist/angular-toastr.*.min.js',
                    'bower_components/ngStorage/ngStorage.min.js',
                    'bower_components/angular-permission/dist/angular-permission.js',
                    'bower_components/angular-cookies/angular-cookies.min.js',
                    'bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
                    'bower_components/blueimp-file-upload/js/vendor/*.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-process.js',
                    'bower_components/iCheck/icheck.min.js',
                    'bower_components/angular-svg-round-progressbar/build/roundProgress.min.js',
                    'bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
                    'bower_components/angular-loading-bar/build/loading-bar.js',
                    'vendor/**.js',
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
        'html2js:dev',
        'htmlbuild:dev',
        'imagemin:dev'
    ]);

    // Build version for production
    grunt.registerTask('build:prod', [
        'clean:prod',
        'less:prod',
        'ngAnnotate:prod',
        'html2js:prod',
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
