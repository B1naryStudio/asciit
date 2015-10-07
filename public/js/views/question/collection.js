define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/question/collection.tpl',
    'views/question/row',
    'views/view-behaviors/search-form',
    'models/tag',
    'syphon'
], function (
    App,
    Marionette,
    Backbone,
    QuestionsTpl,
    QuestionView,
    SearchForm
) {
    App.Question.Views.Questions = Marionette.CompositeView.extend({
        tagName: 'div',
        id: 'question-list',
        template: QuestionsTpl,
        childView: QuestionView,
        childViewContainer: '.list',

        behaviors: {
            SearchForm: {
                behaviorClass: SearchForm
            }
        },

        initialize: function (options) {
            var self = this;
            this.childViewOptions = {
                searchTag: function () {
                    return self.options.searchTag;
                }
            };
        }
    });

    return App.Question.Views.Questions;
});
