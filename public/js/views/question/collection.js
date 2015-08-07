define([
    'app',
    'tpl!views/templates/question/collection.tpl',
    'tpl!views/templates/question/row.tpl',
    'syphon'
], function (App, QuestionsTpl, QuestionTpl) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionCollectionRow = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'question-row',
            template: QuestionTpl
        });

        View.Questions = Marionette.CompositeView.extend({
            tagName: 'div',
            id: 'question-list',
            template: QuestionsTpl,
            childView: View.QuestionCollectionRow,
            childViewContainer: '.list',

            events: {
                'submit form': 'submit'
            },

            submit: function (event) {
                event.preventDefault();

                var data = Backbone.Syphon.serialize(this);
                var searchQuery = data['search_query'];
                Backbone.Validation.callbacks.valid(this, 'search_query');
                // return search query to controller
                this.trigger('form:submit', searchQuery);
            },

            onNotFound: function () {
                Backbone.Validation.callbacks.invalid(this, 'search_query', 'Nothing here...');
            },
            onShow: function () {
                var query = this.collection.searchQuery;
                if (query) {
                    $('#search_query').val(query);
                    console.log(query);
                }
            }
        });
    });
    return App.Question.Views.Questions;
});
