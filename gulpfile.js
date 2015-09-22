
// Author: halvard@mekom.no

var gulp        = require('gulp');
var babel       = require('gulp-babel');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var cssmin      = require('gulp-minify-css');
var rename      = require("gulp-rename");
var uglify      = require('gulp-uglify');
var changed     = require('gulp-changed');
var browserSync = require('browser-sync').create();
var plumber     = require('gulp-plumber');
var eslint      = require('gulp-eslint');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var notify      = require('gulp-notify');
var notifier    = require('node-notifier');

var proxy = '127.0.0.1'; //if using browsersync

var readyNotifier = {
    title: 'Gulp',
    message: 'Ready to rumble!',
    time: 2000
};

var paths = {
    //source paths
    scss: [
        'src/scss/**/elements.scss',
        'src/scss/**/*.scss'
    ],
    js: 'src/js/**/*.js',
    img: 'src/img/*',
    //distribution paths
    cssDst: 'dist/css/',
    jsDst: 'dist/js/',
    imgDst: 'dist/img/'
};

gulp.task('styles', function() {
    return gulp.src(paths.scss)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(gulp.dest(paths.cssDst))
        .pipe(cssmin())
        .pipe(concat('main.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.cssDst + 'min/'))
        .pipe(notify('Generated CSS: <%= file.relative %>'))
        .pipe(browserSync.stream());
});
gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(babel())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.jsDst))
        .pipe(uglify())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest(paths.jsDst + 'min/'))
        .pipe(notify('Generated JS: <%= file.relative %>'))
        .pipe(browserSync.stream());
});
gulp.task('images', function() {
    return gulp.src(paths.img)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.imgDst))
        .pipe(notify('Images compressed.'))
        .pipe(browserSync.stream());
});
gulp.task('jslint', function() {
    gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .on('error', notify.onError({ message: 'eslint failed.' }));
});

// Default
gulp.task('default', ['js', 'styles', 'images'], function(){
    notifier.notify(readyNotifier);
});

// Watch
gulp.task('watch', function() {
    notifier.notify(readyNotifier);
    //source paths
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.scss, ['styles']);
    //distribution paths
    gulp.watch(paths.jsDst, ['jslint']);
});

// Compress images
gulp.task('compress-img', ['images']);

// Browsersync server
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: proxy
    });
});

// Autorefresh
gulp.task('autorefresh', ['browser-sync', 'watch'], function() {
    // browsersync injection
    gulp.watch("./").on('change', browserSync.reload);
});
