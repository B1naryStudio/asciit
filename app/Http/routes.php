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
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Illuminate\Support\Facades\Response;

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

Route::get('/auth/#/', function () {
    $customClaims = [
        "id" =>  "55dc13391846c68a1ad56daa",
        "email" =>  "admin@admin",
        "role" => "ADMIN",
        "iat" => 1440615292
    ];

    $payload = JWTFactory::make($customClaims);

    $data = JWTAuth::encode($payload);

    return Response::json([
        'message' => []
    ], 303)
        ->withCookie('x-access-token', $data->get());
});

Route::get('/auth/#/logout', function () {
    setcookie('x-access-token', '', -1);
});