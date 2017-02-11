var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var useref = require('gulp-useref');
var gutil = require('gulp-util');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var imagemin = require('gulp-imagemin');
var imageOp = require('gulp-image-optimization');

gulp.task('minifyJs', function() {
  gulp.src('_site/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('_site'))
});

gulp.task('minifyCss', function() {
  var preprocessors = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano(),
  ]
  gulp.src('_site/assets/css/main.css')
    .pipe(postcss(preprocessors))
    .pipe(gulp.dest('_site/assets/css/'))
});

gulp.task('imageMin', function(cb) {
    gulp.src(['_site/assets/images/**/*.png','_site/assets/images/**/*.jpg','_site/assets/images/**/*.gif','_site/assets/images/**/*.jpeg']).pipe(imageOp({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('_site/assets/images')).on('end', cb).on('error', cb);
});

gulp.task('clean', function() {
  del(['_site/assets/js/*', '!_site/assets/js/main.js']);
});

gulp.task('build', gulpSequence('minifyJs', 'minifyCss', 'clean'));