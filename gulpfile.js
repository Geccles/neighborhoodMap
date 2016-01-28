var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var del = require('del');

gulp.task('copy-images', function () {
  gulp.src(['images/*'])
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copy-bootstrap', function () {
  gulp.src(['bootstrap/**/*.*'])
    .pipe(gulp.dest('dist/bootstrap'));
});

gulp.task('copy-fa', function () {
  gulp.src(['font-awesome-4.5.0/**/*.*'])
    .pipe(gulp.dest('dist/font-awesome-4.5.0'));
});

gulp.task('minify-css', function() {
    gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-js', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src(['index.html'])
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return del([
        'dist/**/*',
    ]);
});

gulp.task('default', ['copy-images', 'copy-bootstrap', 'copy-fa', 'minify-css', 'minify-js', 'minify-html']);
