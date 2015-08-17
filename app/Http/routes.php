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

Route::get('/', function () {
    return view('base');
});

Route::group(['prefix' => 'api/v1'], function() {
    Route::resource(
        '/questions',
        'API\QuestionController',
        ['only' => ['index', 'store', 'show']]
    );

    Route::resource(
        '/questions/{id}/answers',
        'API\Question\AnswerController',
        ['only' => ['index', 'store']]
    );

    Route::resource(
        '/folders',
        'API\FolderController',
        ['only' => ['index']]
    );

    Route::post('/user/login', 'API\UserController@login');
    Route::delete('/user/login/{id}', 'API\UserController@logout');
    Route::get('/user/login', 'API\UserController@session');

    Route::resource(
        '/tags',
        'API\TagController',
        ['only' => ['index']]
    );

    Route::post('/images', 'API\ImageController@store');
    Route::get('/images/{filename}', 'API\ImageController@show');

    Route::resource(
        '/votes',
        'API\VoteController',
        ['only' => ['store', 'destroy']]
    );

    Route::resource(
        '/questions/{id}/comments',
        'API\Question\CommentController',
        ['only' => ['store']]
    );

    Route::get('/questions-my', 'API\QuestionController@my');
    Route::get('/answers-my', 'API\Question\AnswerController@my');
});

Route::group(['prefix' => 'api/v1/widget'], function() {
    Route::get('/questions/recent', 'API\WidgetController@questionsRecent');
    Route::get('/questions/popular', 'API\WidgetController@questionsPopular');
    Route::get('/questions/upvoted', 'API\WidgetController@questionsUpvoted');
    Route::get('/questions/commented', 'API\WidgetController@questionsCommented');
});