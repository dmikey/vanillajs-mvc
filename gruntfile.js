module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    'build/app.js': ['src/**/*.js', '!src/server/*.js']
                }
            }
        },
        jst: {
            compile: {
                options: {
                  cjs: true,
                  nolodash: true
                },
                files: {
                    "src/templates/index.js": ["templates/**/*.html"]
                }
            }
        },
        index: {
            options: {
                template: 'templates/index.jst'
            },
            release: {
                templateData: {
                    debug: false,
                    styles: ['style.css'],
                    script: ['app.min.js'],
                },
                dest: 'build/index.html'
            },
            debug: {
                templateData: {
                    debug: true,
                    styles: ['style.css'],
                    script: ['app.js'],
                },
                dest: 'build/index.html'
            }
        },
        less: {
            build: {
                options: {
                    paths: ["assets/css"]
                },
                files: {
                    "build/style.css": "styles/index.less"
                }
            }
        },
        watch: {
            assets: {
                files: ['assets/**/*.*'],
                tasks: ['clean:assets', 'copy:main']
            },
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['browserify', 'index:debug']
            },
            css: {
                files: 'styles/**/*.less',
                tasks: ['less:build']
            },
            templates: {
                files: 'templates/**/*.html',
                tasks: ['jst']
            },
            index: {
                files: 'templates/**/*.jst',
                tasks: ['index:debug']
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['assets/*'],
                        dest: 'build/',
                        filter: 'isFile'
                    },

                ],
            },
        },
        uglify: {
            app: {
                files: {
                    'build/app.min.js': ['build/app.js']
                }
            },
            assets: {
                files: {
                    'build/assets.min.js': ['assets/**/*.js']
                }
            }
        },
        clean: {
            assets: ["build/assets"],
            release: ["build/public"],
            unpacked: ["build/*.js", "!build/*.min.js"],
            unpackedAssets: ["build/assets/*.js"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-jst-redux');
    grunt.loadNpmTasks('grunt-index');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jst', 'browserify', 'less:build', 'index:debug', 'copy:main']);
    grunt.registerTask('production', ['clean:release', 'jst', 'browserify', 'less:build', 'index:release', 'copy:main', 'uglify:app', 'uglify:assets', 'clean:unpacked', 'clean:unpackedAssets']);
};