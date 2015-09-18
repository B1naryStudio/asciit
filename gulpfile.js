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

// must be global because it using in require-main
// file - mainConfigFile for requirejs
jsPath = 'js/';
var jsPathFull = './public/js/';
var jsPathMinFull = './public/js/min/';

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
        jsPathFull + 'config.js',
        jsPathFull + 'require-main.js'
    ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsPathMinFull))
        .pipe(rjs({
            baseUrl: jsPathFull,
            mainConfigFile: jsPathFull + 'require-main.js',
            //optimize: 'none',
            paths: {
                requireLib: 'vendor/require/require'
            },
            include: ['requireLib']
        }))
        .pipe(gulp.dest(jsPathFull));
});

var separate_files = [
    'models/question',
    'models/answer',
    'models/tag',
    'models/folder',
    'models/question',
    'models/comment',
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

    gulp.src(jsPathFull + 'models/model-mixins.js')
        .pipe(rjs({
            baseUrl: jsPathFull,
            mainConfigFile: jsPathFull + 'require-main.js',
            //optimize: 'none',
            exclude: function () {
                return staticExclude;
            }
        }))
        .pipe(gulp.dest(jsPathMinFull));

    return gulp.src([
        jsPathFull + 'controllers/**/*.js',
        '!' + jsPathFull + 'models/model-mixins.js',
        jsPathFull + 'models/*.js',
        jsPathFull + 'views/main-layout.js',
        jsPathFull + 'views/views-mixins.js',
        jsPathFull + 'views/vote/single.js',
        jsPathFull + 'models/model-mixins.js'
    ])
        .pipe(rjs({
            baseUrl: jsPathFull,
            mainConfigFile: jsPathFull + 'require-main.js',
            //optimize: 'none',
            exclude: function (file) {
                var result = assign(['models/model-mixins'], staticExclude);
                for (var i = 0; i < separate_files.length; i++) {
                    if (file !== separate_files[i]) {
                        result.push(separate_files[i]);
                    }
                }
                return assign(result);
            }
        }))
        .pipe(gulp.dest(jsPathMinFull));
});

gulp.task('js-concat', function () {
    var result = [
        jsPathMinFull + 'main.js',
        jsPathMinFull + 'controllers/user.js',
        jsPathMinFull + 'views/main-layout.js',
        jsPathMinFull + 'models/model-mixins.js',
        jsPathMinFull + 'controllers/paginator.js'
    ];
    for (var i = 0; i < separate_files.length; i++) {
        result.push(jsPathMinFull + separate_files[i] + '.js');
    }

    return gulp.src(result)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsPathMinFull));
});

gulp.task('js-vendor', function () {
    gulp.src([
        jsPathFull + 'vendor/select2/**/*.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest(jsPathMinFull + 'vendor/select2'));

    gulp.src([
        jsPathFull + 'vendor/autobahn/**/*.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest(jsPathMinFull + 'vendor/autobahn'));

    gulp.src([
        jsPathFull + 'vendor/jquery/jquery.elastic.*.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest(jsPathMinFull + 'vendor/jquery'));

    gulp.src(jsPathFull + 'vendor/jquery/iframeResizer.contentWindow.min.js')
        .pipe(gulp.dest(jsPathMinFull + 'vendor/jquery/'));

    return gulp.src(jsPathFull + 'vendor/ckeditor/**/*.*')
        .pipe(gulp.dest(jsPathMinFull + 'vendor/ckeditor'));
});

elixir(function (mix) {
    mix.styles(
        './public/assets/css/*.css',
        './public/assets/css/',
        './public/assets/css/'
    );
});

elixir(function (mix) {
    mix.task('js');
});

gulp.task('js', function (callback) {
    return sequence(['js-require', 'js-main','js-vendor'], 'js-concat', callback);
});