const pkg         = require('./package.json'),
      gulp        = require('gulp'),
      jshint      = require('gulp-jshint');
      concat      = require('gulp-concat'),
      ngAnnotate  = require('gulp-ng-annotate'),
      babel       = require('gulp-babel'),
      es2015      = require('babel-preset-es2015'),
      uglify      = require('gulp-uglify'),
      rename      = require('gulp-rename'),
      notify      = require('gulp-notify'),
      del         = require('del'),
      srcmaps     = require('gulp-sourcemaps'),
      ts          = require('gulp-typescript');

const jshintConfig = {
    // laxbreak: true,
    // laxcomma: true,
    esversion: 6, //JSHint Harmony/ES6
    // eqnull: true,
    browser: true,
    jquery: true
}

require('gulp-help')(gulp, { description: 'Help listing.' });

gulp.task('jshint', function () {
    gulp.src(['src/js/**/*.js'])
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter('default'))
        // .pipe(livereload());
});


gulp.task('js', 'Concat, Ng-Annotate, Uglify JavaScript into a single file', function() {
    const tsProject = ts.createProject('./tsconfig.json');

    //include module first, then other src files which depend on module
    gulp.src([
        'src/js/module.ts',
        'src/js/kg/module.js',
        'src/js/**/*.js',
        'src/js/**/*.ts'
    ])
        .pipe(tsProject())
        .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(babel({presets: [es2015]}))
        .pipe(ngAnnotate()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify()).on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({extname: ".min.js"}))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('Uglified JavaScript'));
});

gulp.task('concat', 'Concat only, do not minify', () => {
    gulp.src(['src/js/module.js', 'src/js/**/*.js'])
        .pipe(jshint(jshintConfig))
        .pipe(srcmaps.init())
        .pipe(concat(pkg.name + '.js'))
        .pipe(srcmaps.write('./'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('jshint', function() {
  return gulp.src(['src/js/module.js', 'src/js/**/*.js'])
  .pipe(jshint(jshintConfig))
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


gulp.task('default', ['jshint', 'js', 'less']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.js', ['default']);
    gulp.watch('src/**/*.ts', ['default']);
});
