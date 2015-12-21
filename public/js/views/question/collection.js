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

        ui: {
            question_add: '.nav-question-add'
        },

        events: {
            'click @ui.question_add' : 'questionAdd'
        },

        behaviors: {
            SearchForm: {
                behaviorClass: SearchForm,
                emptinessMessage: undefined
            }
        },

        questionAdd: function () {
            App.trigger('question:add');
            return false;
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
