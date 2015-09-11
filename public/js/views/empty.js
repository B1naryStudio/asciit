define([
    'app',
    'tpl!views/templates/empty.tpl',
    'marionette'
], function (App, EmptyTpl, Marionette) {
    App.Main.Views.Empty = Marionette.ItemView.extend({
        tagName: 'div',
        id: 'empty-view',
        className: 'empty',
        template: EmptyTpl
    });
    return App.Main.Views.Empty;
});