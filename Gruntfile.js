module.exports = function(grunt) {
    'use strict';
    var jsFiles = ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'];
    var jsonFiles = ['package.json', 'src/schemas/**/*.json'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        plato: {
            src: {
                options : {
                    exclude: /\.min\.js$/
                },
                files: {
                    'reports/plato': ['src/**/*.js']
                }
            }
        },

        jsonlint: {
            project: {
                src: jsonFiles
            }
        },

        jshint: {
            files: jsFiles,
            options: {
                jshintrc: '.jshintrc'
            }
        },

        jasmine: {
            src: ["src/**/*.js","test/utils/mocks/**/*.js"],
            options: {
                specs: "test/cheesecake/**/*.js",
                vendor: [
                    "vendor/test/lib/*.js"
                ],
                outfile: "reports/jasmine/WebRunner.html",
                display: "full"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks('grunt-plato');

    grunt.registerTask('check', ['jsonlint', 'jshint']);
    grunt.registerTask('build', ['check']);
    grunt.registerTask('default', ['check']);

};