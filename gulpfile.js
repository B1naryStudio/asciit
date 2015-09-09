var gulp = require('gulp');
var uglify= require('gulp-uglify');
var sequence = require('run-sequence');
//var rjs = require('gulp-rjs');

gulp.task('js', function () {
    gulp.src(['./public/js/**/*.js', '!./public/js/vendor/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/min'));
});

gulp.task('templates', function () {
    gulp.src('./public/js/views/templates/**/*.tpl')
        .pipe(gulp.dest('./public/js/min/views/templates/'));
});

gulp.task('vendor', function () {
    gulp.src([
        './public/js/vendor/**/*.js',
        '!./public/js/vendor/ckeditor/ckeditor.js',
        '!./public/js/vendor/moment/moment-with-locales.js',
        '!./public/js/vendor/progressbar/progressbar.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/min/vendor'));

    gulp.src('./public/js/vendor/ckeditor/ckeditor.js')
        .pipe(gulp.dest('./public/js/min/vendor/ckeditor'));

    gulp.src('./public/js/vendor/moment/moment-with-locales.js')
        .pipe(gulp.dest('./public/js/min/vendor/moment'));

    gulp.src('./public/js/vendor/progressbar/progressbar.js')
        .pipe(gulp.dest('./public/js/min/vendor/progressbar'));
});

gulp.task('default', function (callback) {
    sequence('js', 'vendor', 'templates', callback);
});