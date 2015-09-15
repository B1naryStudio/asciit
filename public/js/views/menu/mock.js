define([
    'app',
    'marionette',
    'backbone'
], function (
    App,
    Marionette,
    Backbone
) {
    App.Main.MenuStartView = Marionette.ItemView.extend({
        tagName: 'div',
        id: 'menu-view',
        getTemplate: function () {
            return '#nav-wrapper';
        }
    });

    return App.Main.MenuStartView;
});