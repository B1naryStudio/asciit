define([
    'app',
    'tpl!views/templates/tag/view-row.tpl',
    'marionette',
    'syphon'
], function (App, Tpl, Marionette) {
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