var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');


var dirs = {
    'server': 'server.js',
    'public': {
        'css': 'public/css',
        'html': 'public/views',
        'js': 'public/js'
    },
    'sass': 'src/sass/**/*.scss',
    'html': 'src/views/**/*.html',
    'js': 'src/js/**/*.js'
};

////////////////////
///// RUN
////////////////////
gulp.task('build', ['html', 'js', 'sass']);

gulp.task('watch', ['html:watch', 'js:watch', 'sass:watch']);

gulp.task('default', ['build', 'watch', 'nodemon', 'browser-sync']);

////////////////////
///// BUILD
////////////////////
gulp.task('sass', function() {
    return gulp.src(dirs.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps')) //Write srcMaps to relative dir
        .pipe(gulp.dest(dirs.public.css))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    gulp.src(dirs.html)
        .pipe(gulp.dest(dirs.public.html))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src(dirs.js)
        .pipe(gulp.dest(dirs.public.js))
        .on('change', browserSync.reload);
});

////////////////////
///// WATCH
////////////////////
gulp.task('html:watch', function() {
    gulp.watch(dirs.html, ['html']);
});

gulp.task('js:watch', function() {
    gulp.watch(dirs.js, ['js']);
});

gulp.task('sass:watch', function() {
    gulp.watch(dirs.sass, ['sass']);
});

////////////////////
///// SERVER
////////////////////
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        proxy: "http://localhost:8080",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 8000
    });
});

gulp.task('nodemon', function(cb) {
    var started = false;
    return nodemon({
        'script': dirs.server,
        'watch': [dirs.server, dirs.html],
        'env': {
            'NODE_ENV': 'development' //Should be able to put this in bash profile!
        }
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function() {
        console.log('------ Restarted Server ------');
    });
});
