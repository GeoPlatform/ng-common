const pkg         = require('./package.json'),
      gulp        = require('gulp'),
      concat      = require('gulp-concat'),
      ngAnnotate  = require('gulp-ng-annotate'),
      uglify      = require('gulp-uglify'),
      rename      = require('gulp-rename'),
      notify      = require('gulp-notify'),
      del         = require('del'),
      srcmaps     = require('gulp-sourcemaps'),
      jshint = require('gulp-jshint');

require('gulp-help')(gulp, { description: 'Help listing.' });

gulp.task('js', 'Concat, Ng-Annotate, Uglify JavaScript into a single file', function() {

    //include module first, then other src files which depend on module
    gulp.src(['src/js/module.js', 'src/js/**/*.js'])
        .pipe(jshint())
        .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(ngAnnotate()).on('error', notify.onError("Error in annotate: <%= error.message %>"))
        .pipe(uglify())//.on('error', notify.onError("Error in uglify: <%= error.message %>"))
        .pipe(rename({extname: ".min.js"}))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('Uglified JavaScript'));
});

gulp.task('jshint', function() {
  return gulp.src(['src/js/module.js', 'src/js/**/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('less', 'Compile less into a single app.css.', function() {
    gulp.src(['src/**/*.less'])
        .pipe(concat(pkg.name + '.less'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('Compiled less'));
});


gulp.task('default', ['js', 'less']);
