<?php
/*
 * Permissions
 */
// folders
Rbac::permission('folders.view');
Rbac::permission('folders.create');
Rbac::permission('folders.edit');
Rbac::permission('folders.delete');

Rbac::permission('folders.manage', [
    'folders.view',
    'folders.create',
    'folders.edit',
    'folders.delete'
]);

// questions
Rbac::permission('questions.view');
Rbac::permission('questions.create');
//Rbac::permission('questions.edit');
//Rbac::permission('questions.edit.own', ['questions.edit'], function($params) {});
Rbac::permission('questions.delete');
Rbac::permission('questions.delete.own', ['questions.delete'], function($params) {
    $question_id = $params['questions'];
    $question_repo = app('App\Repositories\Contracts\QuestionRepository');
    $question = $question_repo->find($question_id);

    $question_owner = $question->user_id;
    $current_user = $this->user->id;

    return $question_owner == $current_user;
});


Rbac::permission('questions.manage', [
    'questions.view',
    'questions.create',
//    'questions.edit',
    'questions.delete'
]);

Rbac::permission('questions.manage.own', [
    'questions.create',
//    'questions.edit.own',
    'questions.delete.own'
]);

// answers
Rbac::permission('answers.view');
Rbac::permission('answers.create');
Rbac::permission('answers.edit');
Rbac::permission('answers.edit.own', ['answers.edit'], function($params) {});
Rbac::permission('answers.delete');
Rbac::permission('answers.delete.own', ['answers.delete'], function($params) {
    $answer_id = $params['answers'];
    $answer_repo = app('App\Repositories\Contracts\AnswerRepository');
    $answer = $answer_repo->find($answer_id);

    $owner = $answer->user_id;
    $current_user = $this->user->id;

    return $owner == $current_user;
});

Rbac::permission('answers.manage', [
    'answers.view',
    'answers.create',
    'answers.edit',
    'answers.delete'
]);
Rbac::permission('answers.manage.own', [
    'answers.create',
    'answers.edit.own',
    'answers.delete.own'
]);

// comments
Rbac::permission('comments.view');
Rbac::permission('comments.create');
//Rbac::permission('comments.edit');
//Rbac::permission('comments.edit.own', ['comments.edit'], function($params) {});
Rbac::permission('comments.delete');
Rbac::permission('comments.delete.own', ['comments.delete'], function($params) {});

Rbac::permission('comments.manage', [
    'comments.view',
    'comments.create',
//    'comments.edit',
    'comments.delete'
]);
Rbac::permission('comments.manage.own', [
    'comments.create',
//    'comments.edit.own',
    'comments.delete.own'
]);

// tags
Rbac::permission('tags.view');
//Rbac::permission('tags.create');
//Rbac::permission('tags.edit');
//Rbac::permission('tags.delete');

Rbac::permission('tags.manage', [
    'tags.view',
//    'tags.create',
//    'tags.edit',
//    'tags.delete'
]);

// votes
Rbac::permission('votes.view');
Rbac::permission('votes.create.own');
Rbac::permission('votes.delete.own');

Rbac::permission('votes.own', [
    'votes.create.own',
    'votes.delete.own',
]);

// images
Rbac::permission('images.view');
Rbac::permission('images.create');

/*
 * Roles
 */

Rbac::role('ADMIN', [
    'folders.manage',   // manage = view + create + edit + delete for all items
    'questions.manage',
    'answers.manage',
    'comments.manage',
    'tags.manage',

    'votes.view',
    'votes.own',

    'images.view',
    'images.create',
]);

Rbac::role('USER', [
    'folders.view',

    'questions.view',
    'questions.manage.own',

    'answers.view',
    'answers.manage.own',

    'comments.view',
    'comments.manage.own',

    'tags.view',

    'votes.view',
    'votes.own',

    'images.view',
    'images.create',
]);
