var gulp = require('gulp'), 
    del = require('del');

// var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

gulp.task('bower', function () {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});

gulp.task('html', function () {
    return gulp.src('./partials/*')
        .pipe(gulp.dest('dist/html'))
});

gulp.task('css', function () {
    return gulp.src('./styles/*')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function () {
    return gulp.src('./js/*')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['html', 'css', 'js']);

gulp.task('watch', function () {
    return gulp.watch(['./index.html', './partials/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
});


gulp.task('webserver', ['watch', 'build'], function () {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/dist/index.html"
        }));
});

gulp.task('dev', ['watch', 'webserver']);
