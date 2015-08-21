define([
    'app',
    'tpl!views/templates/empty.tpl'
], function (App, EmptyTpl) {
    App.module('Main.Views', function (Main, App, Backbone, Marionette, $, _) {
        Main.Empty = Marionette.ItemView.extend({
            tagName: 'div',
            id: 'empty-view',
            className: 'empty',
            template: EmptyTpl
        });
    });
    return App.Main.Views.Empty;
});