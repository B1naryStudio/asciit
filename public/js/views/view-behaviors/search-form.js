define([
    'app',
    'marionette',
    'backbone'
], function (
    App,
    Marionette,
    Backbone
) {
    App.Behaviors.SearchForm = Marionette.Behavior.extend({
        events: {
            'submit form': 'submit'
        },

        submit: function (event) {
            event.preventDefault();

            var data = Backbone.Syphon.serialize(this.view);
            var searchQuery = data['search_query'];
            Backbone.Validation.callbacks.valid(this.view, 'search_query');

            // return search query to controller
            this.view.trigger('form:submit', searchQuery);
        },

        onNotFound: function () {
            Backbone.Validation.callbacks.invalid(
                this.view,
                'search_query',
                i18n.t('ui.empty') + '...'
            );
        },

        onShow: function () {
            var query = this.view.options.searchQuery;
            if (query) {
                this.$el.find('#search-query').val(query).focus();
            }
        }
    });

    return App.Behaviors.SearchForm;
});