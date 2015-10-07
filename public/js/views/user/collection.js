define([
    'app',
    'marionette',
    'backbone',
    'views/view-behaviors/search-form',
    'tpl!views/templates/user/collection.tpl',
    'tpl!views/templates/user/row.tpl',
], function (
    App,
    Marionette,
    Backbone,
    SearchForm,
    UsersCollectionTpl,
    UserRowTpl
) {
    App.User.Views.UserRowView = Marionette.ItemView.extend({
        template: UserRowTpl,
        tagName: 'tr',
        className: 'user-element'
    });

    App.User.Views.UsersView = Marionette.CompositeView.extend({
        className: 'users',
        template: UsersCollectionTpl,
        childView: App.User.Views.UserRowView,
        childViewContainer: '.users-list',

        behaviors: {
            SearchForm: {
                behaviorClass: SearchForm
            }
        },

        onNotFound: function () {
            this.$('.users-table').hide();
        }
    });

    return App.User.Views.UsersView;
});
