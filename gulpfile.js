var gulp = require('gulp');
var sass = require('gulp-sass');
var react = require('gulp-react');
// var browserify = require('gulp-browserify');


gulp.task('styles', function () {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('scripts', function () {
    // Single entry point to browserify
    gulp.src('./src/app.js')
        .pipe(react())
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(gulp.dest('./dist/'))
});

//Watch task
gulp.task('default', function () {
    gulp.watch('./scss/**/*.scss', ['styles']);
    gulp.watch('./src/*.js', ['scripts']);
});
