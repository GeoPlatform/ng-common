
const   { src, dest, pipe, watch, task, series } = require('gulp');

const pkg         = require('./package.json'),
      gutil       = require('gulp-util'),
      jshint      = require('gulp-jshint');
      concat      = require('gulp-concat'),
      ngAnnotate  = require('gulp-ng-annotate'),
      babel       = require('gulp-babel'),
      es2015      = require('babel-preset-es2015'),
      assign      = require('babel-plugin-transform-object-assign'),
      uglify      = require('gulp-uglify'),
      rename      = require('gulp-rename'),
      del         = require('del'),
      srcmaps     = require('gulp-sourcemaps'),
      ts          = require('gulp-typescript'),
      less        = require('gulp-less'),
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


const DISTRO = 'geoplatform.common';

const SOURCE_FILES = [
    'src/js/module.ts',
    'src/js/kg/module.js',
    'src/js/**/*.js',
    'src/js/**/*.ts'
];


function jshintTask() {
    return src( ['src/js/**/*.js'] )
    .pipe( jshint(jshintConfig) )
    // .pipe( jshint.reporter('default') );
    .pipe( jshint.reporter('jshint-stylish') );
}

//Concat, Ng-Annotate, Uglify JavaScript into a single file
function jsSrcTask() {

    const tsProject = ts.createProject('./tsconfig.json');

    //include module first, then other src files which depend on module
    return src( SOURCE_FILES )
    .pipe( tsProject() )
    .pipe( srcmaps.init() )
    .pipe( concat(DISTRO + '.js') )
    .pipe( babel({presets: [es2015], plugins: [assign]}) )
    .pipe( ngAnnotate() )
    // .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe( dest('dist/') )
    .pipe( uglify() )
    // .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe( rename({extname: ".min.js"}) )
    .pipe( srcmaps.write('./') )
    .pipe( dest('dist/') );
}

var jsTask = series(jshintTask, jsSrcTask);


//Concat only, do not minify',
function concatTask() {
    return src( ['src/js/module.js', 'src/js/**/*.js'] )
    .pipe( jshint(jshintConfig) )
    .pipe( srcmaps.init() )
    .pipe( concat(DISTRO + '.js') )
    .pipe( srcmaps.write('./') )
    .pipe( dest('dist/') );
}


function cleanTask() {
  return del('dist');
}

//Compile less into a single app.css.
var lessTask = series(
    () => {
        return src([
            'node_modules/@geoplatform/style/src/less/variables.less',
            'src/**/*.less'
        ])
        .pipe( concat(DISTRO + '.less') )
        .pipe( dest('dist/') );
    },
    () => {
        return src( ['dist/' + DISTRO + '.less'], {base: "."} )
        .pipe( less({ plugins: [autoprefix], paths: ['./src/less'] }) )
        // .on("error", notify.onError({message: 'LESS compile error: <%= error.message %>'}))
        .pipe( dest('./') );
        // .pipe(notify('Compiled styles'));
    }
);


var buildTask = series(jsTask, lessTask)

function watchTask() {
    watch( 'src/**/*.less', lessTask );
    watch( 'src/**/*.js',   buildTask );
    watch( 'src/**/*.ts',   buildTask );
}


exports.js = jsTask;
exports.less = lessTask;
exports.clean = cleanTask;
exports.concat = concatTask;
exports.watch = watchTask;
exports.default = buildTask;
