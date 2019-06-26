const pkg         = require('./package.json'),
      gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      jshint      = require('gulp-jshint');
      concat      = require('gulp-concat'),
      ngAnnotate  = require('gulp-ng-annotate'),
      babel       = require('gulp-babel'),
      es2015      = require('babel-preset-es2015'),
      assign      = require('babel-plugin-transform-object-assign'),
      uglify      = require('gulp-uglify'),
      rename      = require('gulp-rename'),
      notify      = require('gulp-notify'),
      del         = require('del'),
      srcmaps     = require('gulp-sourcemaps'),
      ts          = require('gulp-typescript'),
      less        = require('gulp-less'),
      cssmin      = require('gulp-cssmin'),
      autoprefixer= require('less-plugin-autoprefix');

const jshintConfig = {
    // laxbreak: true,
    // laxcomma: true,
    esversion: 6, //JSHint Harmony/ES6
    // eqnull: true,
    browser: true,
    jquery: true
}

const autoprefix = new autoprefixer({
    browsers: [
        "iOS >= 7",
        "Chrome >= 30",
        "Explorer >= 11",
        "last 2 Edge versions",
        "Firefox >= 20"
    ]
});


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
    .pipe(babel({presets: [es2015], plugins: [assign]}))
    .pipe(ngAnnotate())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
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

    gulp.src([
        'node_modules/geoplatform.style/src/less/variables.less',
        'src/**/*.less'
    ])
        .pipe(concat(pkg.name + '.less'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify('Compiled less'));

    gulp.src(['dist/' + pkg.name + '.less'], {base: "."})
        .pipe(less({
            plugins: [autoprefix],
            paths: ['./src/less']
        }))
        .on("error", notify.onError({message: 'LESS compile error: <%= error.message %>'}))
        .pipe(gulp.dest('./'))
        // .pipe(cssmin())
        // .pipe(rename({ suffix: '.min' }))
        // .pipe(gulp.dest('dist/css/'))
        .pipe(notify('Compiled styles'));
});


gulp.task('default', ['jshint', 'js', 'less']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.js', ['default']);
    gulp.watch('src/**/*.ts', ['default']);
});
