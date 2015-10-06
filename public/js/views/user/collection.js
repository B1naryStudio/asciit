define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/user/collection.tpl',
    'tpl!views/templates/user/row.tpl',
], function (
    App,
    Marionette,
    Backbone,
    UsersCollectionTpl,
    UserRowTpl
) {
    App.User.Views.UserRowView = Marionette.ItemView.extend({
        template: UserRowTpl,
        tagName: 'tr',
        className: 'user-element'
    });

    App.User.Views.UsersView = Marionette.CompositeView.extend({
        tagName: 'div',
        className: 'users',
        template: UsersCollectionTpl,
        childView: App.User.Views.UserRowView,
        childViewContainer: '.users-list'
    });

    return App.User.Views.UsersView;
});
