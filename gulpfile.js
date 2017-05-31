var pkg         = require('./package.json'), 
    gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    ngAnnotate  = require('gulp-ng-annotate'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    notify      = require('gulp-notify')
    srcmaps     = require('gulp-sourcemaps');

require('gulp-help')(gulp, { description: 'Help listing.' });

gulp.task('jshint', function () {
    gulp.src(['src/js/**/*.js'])
        .pipe(jshint({
            // laxbreak: true,
            // laxcomma: true,
            esversion: 6, //JSHint Harmony/ES6
            // eqnull: true,
            browser: true,
            jquery: true
        }))
        .pipe(jshint.reporter('default'))
        // .pipe(livereload());
});


gulp.task('js', 'Concat, Ng-Annotate, Uglify JavaScript into a single file', function() {

    //include module first, then other src files which depend on module
    gulp.src(['src/js/module.js', 'src/js/**/*.js'])
        .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(babel({presets: ["es2015"]}))
        .pipe(ngAnnotate()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(uglify()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({extname: ".min.js"}))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('Uglified JavaScript'));
});

gulp.task('less', 'Compile less into a single app.css.', function() {
    gulp.src(['src/**/*.less'])
        .pipe(concat(pkg.name + '.less'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('Compiled less'));
});


gulp.task('default', ['jshint', 'js', 'less']);