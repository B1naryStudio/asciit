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

Route::group(['prefix' => 'api/v1'], function() {
    Route::resource('/questions', 'API\QuestionController');
    Route::resource('/questions/{id}/answers', 'API\Question\AnswerController');
    Route::resource('/user', 'API\UserController');
    Route::resource('/folders', 'API\FolderController', ['only' => ['index']]);
    Route::post('/user/login', 'API\UserController@login');
    Route::delete('/user/login/{id}', 'API\UserController@logout');
});
