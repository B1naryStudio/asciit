define(['app', 'marionette', 'models/question'], function (App, Marionette) {
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
        }
    });
    App.Question.Controllers.Main = new Controller();

    return App.Question.Controllers.Main;
});
