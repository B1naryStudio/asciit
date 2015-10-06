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
        childViewContainer: '.users-list',

        events: {
            'submit form': 'submit'
        },

        submit: function (event) {
            event.preventDefault();

            var data = Backbone.Syphon.serialize(this);
            var searchQuery = data['search_query'];
            Backbone.Validation.callbacks.valid(this, 'search_query');

            // return search query to controller
            this.trigger('form:submit', searchQuery);
        },

        onNotFound: function () {
            Backbone.Validation.callbacks.invalid(
                this,
                'search_query',
                i18n.t('ui.empty') + '...'
            );

            this.$('.users-table').hide();
        },

        onShow: function () {
            var query = this.options.searchQuery;
            if (query) {
                this.$el.find('#search-query').val(query).focus();
            }
        }
    });

    return App.User.Views.UsersView;
});
