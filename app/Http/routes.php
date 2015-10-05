<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use Illuminate\Http\Request;

Route::get('/', function () {
    $prefix = env('SERVER_PREFIX', '');
    return view('base', [
        'is_min' => env('JS_IS_MIN', false),
        'use_common_header' => env('USE_COMMON_HEADER', false),
        'js_path' => ($prefix ? '/' : '' ) . env('JS_PATH')
    ]);
});

Route::group(['prefix' => 'api/v1'], function () {
    Route::resource(
        '/questions',
        'API\QuestionController',
        ['only' => ['index', 'store', 'show', 'update', 'destroy']]
    );

    Route::resource(
        '/questions/{id}/answers',
        'API\Question\AnswerController',
        ['only' => ['index', 'store', 'destroy']]
    );

    Route::put(
        '/questions/{questions}/answers/{answers}',
        'API\Question\AnswerController@update'
    );

    // Patch uses on answers for closed status update only
    Route::patch(
        '/questions/{questions}/answers/{answers}',
        'API\Question\AnswerController@setClosed'
    );

//    Route::patch('/questions/{question_id}/answers/{answer_id}', function (Request $request, $question_id, $answer_id) {
//        $controller = App::make('App\Http\Controllers\API\Question\AnswerController');
//
//        if ($request->has('closed')) {
//            return $controller->setClosed($request, $question_id, $answer_id);
//        } else {
//            return $controller->updateFields($request, $question_id, $answer_id);
//        }
//    });

    Route::resource(
        '/questions/{id}/comments',
        'API\Question\CommentController',
        ['only' => ['store', 'update', 'destroy']]
    );

    Route::resource(
        '/folders',
        'API\FolderController',
        ['only' => ['index', 'destroy', 'store', 'update']]
    );

    Route::get('/crud-folders', 'API\FolderController@foldersForCrud');

    Route::post('/user/login', 'API\UserController@login');
    Route::delete('/user/login/{id}', 'API\UserController@logout');
    Route::get('/user/login', 'API\UserController@session');

    Route::resource(
        '/tags',
        'API\TagController',
        ['only' => ['index']]
    );

    Route::post('/images', 'API\ImageController@store');
    Route::get('/images/{filename}/{extension}', 'API\ImageController@show');

    Route::resource(
        '/votes',
        'API\VoteController',
        ['only' => ['store', 'destroy']]
    );

    Route::get('/questions-my', 'API\QuestionController@my');
    Route::get('/answers-my', 'API\Question\AnswerController@my');
});

Route::get('/gist-snippets', 'API\CodeSnippetController@getGistWidget');
Route::get('/pastebin-snippets', 'API\CodeSnippetController@getPastebinWidget');

Route::group(['prefix' => 'api/v1/widget'], function () {
    Route::get('/questions/recent', 'API\WidgetController@questionsRecent');
    Route::get('/questions/popular', 'API\WidgetController@questionsPopular');
    Route::get('/questions/upvoted', 'API\WidgetController@questionsUpvoted');
    Route::get('/questions/commented', 'API\WidgetController@questionsCommented');
});

// Auth mockups
Route::get('/auth/', 'Mockups\AuthController@auth');
Route::get('/auth/logout', 'Mockups\AuthController@logout');
Route::get('/auth/me/{binary_id}', 'Mockups\AuthController@profile');

// Header mockups
Route::get('/app/header', 'Mockups\HeaderController@menu');
Route::get('app/api/config', 'Mockups\HeaderController@config');

// Notification mockup
Route::resource(
    '/notifications',
    'Mockups\NotificationController',
    ['only' => ['store']]
);

// Link preview
Route::get('/link-preview', 'API\PreviewController@index');
