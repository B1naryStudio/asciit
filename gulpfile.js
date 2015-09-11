var elixir = require('laravel-elixir');
var gulp = require('gulp');
var sequence = require('run-sequence');
var requirejs = require('requirejs');
var concat = require('gulp-concat');
var through = require('through2');
var path = require('path');
var es = require('event-stream');
var fs = require('fs');
var assign = require('object-assign');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var File = gutil.File;

var rjs = function (opts) {
    var filePath = opts.baseUrl.replace('.', '');
    return es.map(function (file, cb) {
        var name = file.path
            .substr(file.path.indexOf(filePath) + filePath.length)
            .replace(path.extname(file.path), '');
        var exclude = [];
        if (opts.exclude) {
            exclude = opts.exclude(name);
        }

        console.log(name);
        var options = assign({}, opts, {
            name: name,
            out: function (text) {
                console.log('done...');
                cb(null, new File({
                    path: name + '.js',
                    contents: new Buffer(text)
                }));
            },
            exclude: exclude
        });
        requirejs.optimize(options);
    });
};

gulp.task('js-main', function () {
    jsPath = 'js';
    return gulp.src([
        './public/js/config.js',
        './public/js/require-main.js'
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js/min/'))
        .pipe(rjs({
            baseUrl: './public/js/',
            mainConfigFile: './public/js/require-main.js',
            //optimize: 'none',
            paths: {
                requireLib: 'vendor/require/require'
            },
            include: ['requireLib']
        }))
        .pipe(gulp.dest('./public/js'));
});

var separate_files = [
    'models/question',
    'models/answer',
    'models/tag',
    'models/folder',
    'models/question',
    'models/comment',
    'models/model-mixins',
    'models/vote',
    'models/user',
    'models/paginator',
    'views/views-mixins'
];

gulp.task('js-require', function () {
    jsPath = 'js';
    var staticExclude = [
        'marionette',
        'backbone',
        'app',
        'tpl',
        'text',
        'syphon',
        'moment',
        'stickit',
        'jquery.scroll',
        'updown',
        'paginator',
        'ckeditor',
        'ckeditor.adapter'
    ];

    return gulp.src([
        './public/js/controllers/**/*.js',
        './public/js/models/*.js',
        './public/js/views/main-layout.js',
        './public/js/views/views-mixins.js',
        './public/js/views/vote/single.js'
    ])
        .pipe(rjs({
            baseUrl: './public/js/',
            mainConfigFile: './public/js/require-main.js',
            //optimize: 'none',
            exclude: function (file) {
                var result = assign([], staticExclude);
                for (var i = 0; i < separate_files.length; i++) {
                    if (file !== separate_files[i]) {
                        result[result.length] = separate_files[i];
                    }
                }
                return assign(result);
            }
        }))
        .pipe(gulp.dest('./public/js/min'));
});

gulp.task('js-concat', function () {
    var result = [
        './public/js/min/all.js',
        './public/js/min/controllers/user.js',
        './public/js/min/views/main-layout.js'
    ];
    for (var i = 0; i < separate_files.length; i++) {
        result[result.length] = './public/js/min/' + separate_files[i] + '.js';
    }

    return gulp.src(result)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js/min/'));
});

gulp.task('js-vendor', function () {
    gulp.src([
        './public/js/vendor/select2/**/*.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/min/vendor/select2'));

    return gulp.src('./public/js/vendor/ckeditor/**/*.*')
        .pipe(gulp.dest('./public/js/min/vendor/ckeditor'));
});

elixir(function (mix) {
    mix.stylesIn('./public/assets/css/', './public/assets/css/');
});

elixir(function (mix) {
    mix.task('js');
});

gulp.task('js', function (callback) {
    return sequence(['js-require', 'js-main','js-vendor'], 'js-concat', callback);
});