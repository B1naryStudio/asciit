var elixir = require('laravel-elixir');
var gulp = require('gulp');
var sequence = require('run-sequence');
var concat = require('gulp-concat');
var path = require('path');
var es = require('event-stream');
var fs = require('fs');
var assign = require('object-assign');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var File = gutil.File;
// Warning: using in eval, so it necessary
var amdOptimize = require('amd-optimize');
var del = require('del');
var template = require('gulp-tmpl');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap-amd');

// must be global because it using in require-main
// file - mainConfigFile for requirejs
jsPath = 'js';
var jsPathFull = './public/' + jsPath + '/';
var jsPathMinFull = './public/' + jsPath + '/min/';

var concatSettings = {
    'controllers/question/collection': [
        jsPathMinFull + 'controllers/question/collection.js',
        jsPathMinFull + 'views/templates/question/collection.tpl.js',
        jsPathMinFull + 'views/templates/question/row.tpl.js',
        jsPathMinFull + 'views/templates/tag/view-row-popular.tpl.js',
        jsPathMinFull + 'views/templates/question/collection-layout.tpl.js',
        jsPathMinFull + 'views/templates/tag/collection-popular.tpl.js'
    ],
    'controllers/question/single': [
        jsPathMinFull + 'controllers/question/single.js',
        jsPathMinFull + 'views/templates/answer/answers.tpl.js',
        jsPathMinFull + 'views/templates/answer/single-answer.tpl.js',
        jsPathMinFull + 'views/templates/question/question-layout.tpl.js',
        jsPathMinFull + 'views/templates/question/empty.tpl.js',
        jsPathMinFull + 'views/templates/comment/comments.tpl.js',
        jsPathMinFull + 'views/templates/comment/single-comment.tpl.js'
    ],
    'controllers/activity': [
        jsPathMinFull + 'controllers/activity.js',
        jsPathMinFull + 'views/templates/activity/layout.tpl.js',
        jsPathMinFull + 'views/templates/question/row-by-user.tpl.js',
        jsPathMinFull + 'views/templates/vote/votes.tpl.js',
        jsPathMinFull + 'views/templates/answer/row-by-user.tpl.js'
    ],
    'controllers/folder': [
        jsPathMinFull + 'controllers/folder.js',
        jsPathMinFull + 'views/templates/folder/layout.tpl.js',
        jsPathMinFull + 'views/templates/folder/row.tpl.js',
        jsPathMinFull + 'views/templates/folder/add.tpl.js'
    ],
    'controllers/paginator': [
        jsPathMinFull + 'controllers/paginator.js',
        jsPathMinFull + 'views/templates/paginator/collection.tpl.js',
        jsPathMinFull + 'views/templates/paginator/row.tpl.js',
        jsPathMinFull + 'views/templates/paginator/more.tpl.js'
    ],
    'controllers/popup': [
        jsPathMinFull + 'controllers/popup.js',
        jsPathMinFull + 'views/templates/popup/header.tpl.js',
        jsPathMinFull + 'views/templates/popup/main.tpl.js'
    ],
    'controllers/tag': [
        jsPathMinFull + 'controllers/tag.js',
        jsPathMinFull + 'views/templates/tag/collection.tpl.js',
        jsPathMinFull + 'views/templates/tag/collection-row.tpl.js',
        jsPathMinFull + 'views/templates/tag/collection-layout.tpl.js'
    ],
    'controllers/user/edit-users': [
        jsPathMinFull + 'controllers/user/edit-users.js',
        jsPathMinFull + 'views/user/collection-layout.js',
        jsPathMinFull + 'views/user/collection.js',
        jsPathMinFull + 'views/templates/user/collection-layout.tpl.js',
        jsPathMinFull + 'views/templates/user/collection.tpl.js',
        jsPathMinFull + 'views/templates/user/row.tpl.js',
        jsPathMinFull + 'views/templates/role/select-row.tpl.js'
    ],
    'controllers/user/login': [
        jsPathMinFull + 'controllers/user/login.js',
        jsPathMinFull + 'views/templates/user/login.tpl.js'
    ],
    'controllers/role': [
        jsPathMinFull + 'controllers/role.js',
        jsPathMinFull + 'views/templates/role/collection.tpl.js',
        jsPathMinFull + 'views/templates/role/collection-layout.tpl.js',
        jsPathMinFull + 'views/templates/role/row.tpl.js'
    ],
    main: [
        jsPathMinFull + 'vendor/require/require.min.js',
        jsPathFull + 'config.js',
        jsPathMinFull + 'require-main.js',
        jsPathMinFull + 'models/**/*.js',
        jsPathMinFull + 'views/view-behaviors/**/*.js',
        jsPathMinFull + 'controllers/paginator.js',
        jsPathMinFull + 'controllers/popup.js',
        jsPathMinFull + 'controllers/user/session.js',
        jsPathMinFull + 'controllers/user/logout.js',
        jsPathMinFull + 'controllers/**/init.js',
        jsPathMinFull + 'views/empty.js',
        jsPathMinFull + 'views/form.js',
        jsPathMinFull + 'views/main-layout.js',
        jsPathMinFull + 'views/question/empty.js',
        jsPathMinFull + 'views/question/form.js',
        jsPathMinFull + 'views/folder/select.js',
        jsPathMinFull + 'views/tag/select.js',
        jsPathMinFull + 'views/tag/view.js',
        jsPathMinFull + 'views/vote/single.js',
        jsPathMinFull + 'views/popup/alert.js',
        jsPathMinFull + 'views/popup/confirm.js',
        jsPathMinFull + 'views/role/select.js',
        jsPathMinFull + 'views/templates/menu/menu.tpl.js',
        jsPathMinFull + 'views/templates/main-layout.tpl.js',
        jsPathMinFull + 'views/templates/empty.tpl.js',
        jsPathMinFull + 'views/templates/tag/view-row.tpl.js',
        jsPathMinFull + 'views/templates/tag/select-row.tpl.js',
        jsPathMinFull + 'views/templates/vote/votes.tpl.js',
        jsPathMinFull + 'views/templates/folder/select.tpl.js',
        jsPathMinFull + 'views/templates/folder/select-row.tpl.js',
        jsPathMinFull + 'views/templates/question/form.tpl.js',
        jsPathMinFull + 'views/templates/popup/alert.tpl.js',
        jsPathMinFull + 'views/templates/popup/confirm.tpl.js',
        jsPathMinFull + 'views/templates/vote/votes.tpl.js',
        jsPathMinFull + 'views/templates/role/select-row.tpl.js',
        jsPathMinFull + 'tools/alert-overriding.js',
    ]
};

var staticExclude = [];
var separateFiles = [];

var getRealModuleName = function (file) {
    var filePath = jsPathFull.replace('.', '');
    return file.path
        .substr(file.path.indexOf(filePath) + filePath.length)
        .replace(path.extname(file.path), '');
};

// Warning: using in eval, so it necessary
var filterDependencies = function (fileName) {
    return es.map(function (file, callback) {
        var name = getRealModuleName(file);
        if (
            fileName !== 'require-main' &&
            fileName !== name &&
            (
                staticExclude.indexOf(name) > -1 ||
                separateFiles.indexOf(name) > -1
            )
        ) {
            callback();
        } else {
            callback(null, file);
        }
    });
};

var addPhantomExtension = function () {
    return es.map(function (file, callback) {
        file.path = file.path + '.tpl';
        callback(null, file);
    });
};

var loadSeparateFiles = function () {
    separateFiles = [];
    return es.map(function (file, callback) {
        var name = getRealModuleName(file);
        separateFiles.push(name);
        callback(null, file);
    });
};

var loadStaticExclude = function () {
    staticExclude = [];
    return es.map(function (file, callback) {
        var name = getRealModuleName(file);
        staticExclude.push(name);
        callback(null, file);
    });
};

gulp.task('js-prepare-static', function () {
    return gulp.src([
        jsPathFull + 'vendor/*/*.js',
        jsPathFull + 'vendor/ckeditor/plugins/codesnippet/lib/highlight/highlight.pack.js',
        jsPathFull + 'vendor/ckeditor/adapters/jquery.js',
        jsPathFull + 'app.js',
        jsPathFull + 'tools/validation-model.js',
    ])
        .pipe(loadStaticExclude());
});

gulp.task('js-prepare', function () {
    return gulp.src([
        jsPathFull + 'require-main.js',
        jsPathFull + 'models/**/*.js',
        jsPathFull + 'controllers/**/*.js',
        jsPathFull + 'views/view-behaviors/**/*.js',
        jsPathFull + 'views/main-layout.js',
        jsPathFull + 'views/empty.js',
        jsPathFull + 'views/question/form.js',
        jsPathFull + 'views/folder/select.js',
        jsPathFull + 'views/tag/select.js',
        jsPathFull + 'views/tag/view.js',
        jsPathFull + 'views/popup/alert.js',
        jsPathFull + 'views/popup/confirm.js',
        jsPathFull + 'views/vote/single.js',
        jsPathFull + 'views/role/select.js'
    ])
        .pipe(loadSeparateFiles());
});

gulp.task('js-app', function () {
    var command = 'gulp.src(\'' + jsPathFull + '**/**/*.js\')';

    for (var i = 0; i < separateFiles.length; i++) {
        command += '.pipe(amdOptimize(\'' + separateFiles[i] + '\', {' +
            'baseUrl: \'' + jsPathFull + '\',' +
            'configFile: \'' + jsPathFull + 'require-main.js\',' +
            '}))' +
            '.pipe(filterDependencies(\'' + separateFiles[i] + '\'))' +
            '.pipe(concat(\'' + separateFiles[i] + '.js\'))' +
            '.pipe(gulp.dest(\'' + jsPathMinFull + '\'))';
    }
    return eval(command);
});

gulp.task('js-templates', function () {
    gulp.src([
        jsPathFull + 'views/templates/**/**/*.tpl'
    ])
        .pipe(addPhantomExtension())
        .pipe(template())
        .pipe(wrap({
            moduleRoot: jsPathFull + 'views/',
            modulePrefix: 'tpl!views'
        }))
        .pipe(gulp.dest(jsPathMinFull + 'views/templates/'));
});

gulp.task('js-concat-main', function () {
    return gulp.src(concatSettings['main'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsPathMinFull));
});

gulp.task('js-concat-other', function () {
    var result;
    for (var module in concatSettings) {
        if (!concatSettings.hasOwnProperty(module)) {
            continue;
        }
        if (module !== 'main') {
            result = gulp.src(concatSettings[module])
                .pipe(concat(module + '.js'))
                .pipe(uglify())
                .pipe(gulp.dest(jsPathMinFull));
        }
    }

    return result;
});

gulp.task('js-vendor', function () {
    gulp.src([
        jsPathFull + 'vendor/select2/**/*.js'
    ]).pipe(gulp.dest(jsPathMinFull + 'vendor/select2'));

    gulp.src([
        jsPathFull + 'vendor/autobahn/**/*.js'
    ]).pipe(gulp.dest(jsPathMinFull + 'vendor/autobahn'));

    gulp.src([
        jsPathFull + 'vendor/snippet-iframe/**/*.js'
    ]).pipe(gulp.dest(jsPathMinFull + 'vendor/snippet-iframe'));

    gulp.src([
        jsPathFull + 'vendor/jquery/jquery.elastic.*.js'
    ]).pipe(gulp.dest(jsPathMinFull + 'vendor/jquery'));

    gulp.src([
        jsPathFull + 'vendor/require/*.js'
    ]).pipe(gulp.dest(jsPathMinFull + 'vendor/require'));

    gulp.src([
        jsPathFull + 'vendor/moment/*.js'
    ]).pipe(gulp.dest(jsPathMinFull + 'vendor/moment'));

    gulp.src(
        jsPathFull + 'vendor/jquery/iframeResizer.contentWindow.min.js'
    ).pipe(gulp.dest(jsPathMinFull + 'vendor/jquery/'));

    gulp.src(
        jsPathFull + 'vendor/jquery/iframeResizer.min.js'
    ).pipe(gulp.dest(jsPathMinFull + 'vendor/jquery/'));

    return gulp.src(
        jsPathFull + 'vendor/ckeditor/**/*.*'
    ).pipe(gulp.dest(jsPathMinFull + 'vendor/ckeditor'));
});

gulp.task('js-clean', function () {
    return del([jsPathMinFull]);
});

gulp.task('css-clean', function () {
    return del(['./public/assets/css/all.*']);
});

gulp.task('clean', function (callback) {
    return sequence(['js-clean', 'css-clean'], callback);
});

elixir(function (mix) {
    mix.task('js');
});

elixir(function (mix) {
    mix.styles(
        './public/assets/css/*.css',
        './public/assets/css/',
        './public/assets/css/'
    );
});

gulp.task('js', function (callback) {
    return sequence(
        'clean',
        [
            'js-prepare',
            'js-prepare-static',
            'js-vendor',
            'js-templates'
        ],
        'js-app',
        'js-concat-other',
        'js-concat-main',
        callback
    );
});