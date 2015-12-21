define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/empty.tpl'
], function (
    App,
    Marionette,
    Backbone,
    EmptyTpl
) {
    App.Main.Views.Empty = Marionette.ItemView.extend({
        tagName: 'div',
        id: 'empty-view',
        className: 'empty',
        template: EmptyTpl
    });

    return App.Main.Views.Empty;
});