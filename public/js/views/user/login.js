define([
    'app',
    'marionette',
    'backbone',
    'views/form',
    'tpl!views/templates/user/login.tpl',
    'syphon'
], function (
    App,
    Marionette,
    Backbone,
    FormView,
    Tpl
) {
    App.User.Views.UserLoginForm = FormView.extend({
        tagName: 'div',
        template: Tpl,
        onDataInvalid: function (errors) {
            $('.error').html('');
            if (!errors) {
                var msg = i18n.t('validation.login-error');
                $('.error.all').html(msg);
            } else {
                for (var i in errors) {
                    if (!errors.hasOwnProperty(i)) {
                        continue;
                    }

                    $('.error.' + i).html(errors[i]);
                }
            }
        }
    });

    return App.User.Views.UserLoginForm;
});

