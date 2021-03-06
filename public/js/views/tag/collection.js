define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/tag/collection.tpl',
    'tpl!views/templates/tag/collection-row.tpl'
], function (
    App,
    Marionette,
    Backbone,
    CollectionTpl,
    TagTpl
) {
    App.Tag.Views.TagCollectionRow = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'tag-element',
        template: TagTpl
    });

    App.Tag.Views.Tags = Marionette.CompositeView.extend({
        tagName: 'div',
        template: CollectionTpl,
        childView: App.Tag.Views.TagCollectionRow,
        childViewContainer: '.list',

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
        },
        onShow: function () {
            var query = this.collection.searchQuery;
            if (query) {
                $('#search-query').val(query).focus();
            }
        }
    });

    return App.Tag.Views.Tags;
});
