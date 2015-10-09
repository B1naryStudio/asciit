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
            if (App.User && App.User.Current) {
                App.User.Current.destroy({
                    wait: true,
                    success: function (model, response) {
                        delete App.User.Current;
                        document.location = App.prefix + '/';
                    },
                    error: function (model, xhr) {
                        console.log(JSON.parse(xhr.responseText));
                    }
                });
            } else {
                location.reload();
            }
        }
    });
    App.User.Controllers.Logout = new Controller();

    return App.User.Controllers.Logout;
});
