define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/tag/view-row.tpl',
    'syphon'
], function (
    App,
    Marionette,
    Backbone,
    Tpl
) {
    App.Tag.Views.TagViewCollectionRow = Marionette.ItemView.extend({
        tagName: 'li',
        template: Tpl,
        onShow: function () {
            if (this.options.isSearchingTag()) {
                this.$el.addClass('search');
            }
        }
    });

    App.Tag.Views.TagsView = Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: App.Tag.Views.TagViewCollectionRow,
        initialize: function (options) {
            var self = this;
            this.childViewOptions = {
                isSearchingTag: function () {
                    return self.options.searchTag === this.model.get('title');
                }
            };
        }
    });

    return App.Tag.Views.TagsView;
});