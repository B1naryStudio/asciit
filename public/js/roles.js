define([
    'app'
], function (
    App
) {
    App.Roles = {
        USER: [
            '',
            'questions',
            'questions/:id',
            'login',
            'logout',
            'tags',
            'tags/:tag',
            'activity',
            'question/:question_id/answer/:answer_id',
            'folders/:folder'
        ],
        ADMIN: [
            '',
            'questions',
            'questions/:id',
            'login',
            'logout',
            'edit-users',
            'tags',
            'tags/:tag',
            'activity',
            'question/:question_id/answer/:answer_id',
            'folders',
            'folders/:folder',
            'roles'
        ]
    };

    return App.Roles;
});
