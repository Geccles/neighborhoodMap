var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');

gulp.task('resize', function () {
  gulp.src('views/images/pizzeria.jpg')
    .pipe(imageResize({
      width : 115,
      height : 75,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('views/images/pizzeria-small.jpg'));
});

gulp.task('copy-images', function () {
  gulp.src(['img/2048.png', 'img/cam_be_like.jpg', 'img/mobilewebdev.jpg', 'img/profilepic.jpg'])
    .pipe(gulp.dest('distribution/img'));
});

gulp.task('views-copy-images', function () {
  gulp.src(['views/images/pizza.png', 'views/images/pizzeria.jpg', 'views/images/pizzeria-small.jpg'])
    .pipe(gulp.dest('distribution/views/images'));
});

gulp.task('minify-css', function() {
    gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('distribution/css'));
});

gulp.task('minify-views-css', function() {
    gulp.src('views/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('distribution/views/css'));
});

gulp.task('compress', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('distribution/js'));
});

gulp.task('views-compress', function() {
  return gulp.src('views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('distribution/views/js'));
});

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src(['index.html','project-2048.html', 'project-mobile.html', 'project-webperf.html'])
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('distribution'));
});

gulp.task('views-minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src(['views/pizza.html'])
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('distribution/views'));
});

gulp.task('default', ['copy-images', 'views-copy-images', 'minify-css', 'minify-views-css', 'compress', 'views-compress', 'minify-html', 'views-minify-html']);
