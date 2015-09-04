<?php

// folders
Rbac::action([
    'API\\FolderController@index',
    'API\\FolderController@foldersForCrud',
], 'folders.view');
Rbac::action('API\\FolderController@store', 'folders.create');
Rbac::action('API\\FolderController@update', 'folders.edit');
Rbac::action('API\\FolderController@destroy', 'folders.delete');

// questions
Rbac::action([
    'API\\QuestionController@index',
    'API\\QuestionController@my',
    'API\\QuestionController@show',
], 'questions.view');
Rbac::action('API\\QuestionController@store', 'questions.create');
//Rbac::action('API\\QuestionController@update', 'questions.edit');
Rbac::action('API\\QuestionController@destroy', 'questions.delete');

// answers
Rbac::action([
    'API\\Question\\AnswerController@index',
    'API\\Question\\AnswerController@my',
], 'answers.view');
Rbac::action('API\\Question\\AnswerController@store', 'answers.create');
//Rbac::action('API\\Question\\AnswerController@update', 'answers.edit');
Rbac::action('API\\Question\\AnswerController@destroy', 'answers.delete');

// comments
Rbac::action('API\\Question\\CommentController@store', 'comments.create');
//Rbac::action('API\\Question\\CommentController@update', 'comments.edit');
Rbac::action('API\\Question\\CommentController@destroy', 'comments.delete');

// tags
Rbac::action('API\\TagController@index', 'tags.view');
//Rbac::action('API\\TagController@update', 'tags.edit');
//Rbac::action('API\\TagController@destroy', 'tags.delete');

// votes
Rbac::action('API\\VoteController@store', 'votes.create.own');
Rbac::action('API\\VoteController@destroy', 'votes.delete.own');

//images
Rbac::action('API\\ImageController@show', 'images.view');
Rbac::action('API\\ImageController@store', 'images.create');
