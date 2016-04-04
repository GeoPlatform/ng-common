
/* 
 http://www.sitepoint.com/writing-awesome-build-script-grunt/

 https://github.com/jlengstorf/hyper-optimized-workflow/blob/master/Gruntfile.js

 */
module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        concat: {
            options: {
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed
            },

            //Module src
            js: {                
                src: [
                    'src/lang.js',           //language extensions
                    'src/module.js',         //common module
                    'src/auth.js',           //authentication support
                    'src/directives/*.js',   //common directives
                    'src/filters/*.js'       //common filters
                ],
                dest: 'dist/<%= pkg.name %>.js'
            },

            //Style src
            style: {
                src: ['src/**/*.less'],
                dest: 'dist/<%= pkg.name %>.less'
            }
        },

        uglify: {
            options: {
                mangle: false   /* needed for angular to work */
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
                }
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                ignores: [
                    // 'src/plugins/*.js'
                ]
            }
        }
        
    });

    
    //invoke for distro building
    grunt.registerTask('default', [
        'jshint',               //validate js
        'concat',               //build minified js files
        'uglify'
    ]);

};
