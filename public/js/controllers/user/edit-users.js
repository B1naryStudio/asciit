define([
    'app',
    'marionette',
    'backbone',
], function (
    App,
    Marionette,
    Backbone
) {
    var Controller = Marionette.Controller.extend({
        execute: function () {
            console.log('editUsers');
        }
    });
    App.User.Controllers.editUsers = new Controller();

    return App.User.Controllers.editUsers;
});
