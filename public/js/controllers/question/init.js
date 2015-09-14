define([
    'app',
    'marionette',
    'backbone',
    'models/question'
], function (App, Marionette, Backbone) {
    var Controller = Marionette.Controller.extend({
        questions: function (searchQuery, searchTag, searchFolder, page) {
            require(['controllers/question/collection'], function (controller) {
                controller.execute(
                    searchQuery,
                    searchTag,
                    searchFolder,
                    page
                );
            });
        },

        question: function (id, answer_id) {
            require(['controllers/question/single'], function (controller) {
                controller.execute(id, answer_id);
            });
        },

        add: function () {
            require(['controllers/question/add'], function (controller) {
                controller.execute();
            });
        },

        edit: function (model) {
            require(['controllers/question/edit'], function (controller) {
                controller.execute(model);
            });
        }
    });
    App.Question.Controllers.Main = new Controller();

    return App.Question.Controllers.Main;
});
