define([
    'app',
    'tpl!views/templates/tag/view-row.tpl',
    'syphon'
], function (App, Tpl) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.TagViewCollectionRow = Marionette.ItemView.extend({
            tagName: 'li',
            template: Tpl,
            onShow: function () {
                if (this.options.isSearchingTag()) {
                    this.$el.addClass('search');
                }
            }
        });

        View.TagsView = Marionette.CollectionView.extend({
            tagName: 'ul',
            childView: View.TagViewCollectionRow,
            initialize: function (options) {
                var self = this;
                this.childViewOptions = {
                    isSearchingTag: function () {
                        return self.options.searchTag === this.model.get('title');
                    }
                };
            }
        });
    });
    return App.Tag.Views.TagsView;
});