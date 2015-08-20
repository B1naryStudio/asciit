define([
    'app',
    'tpl!views/templates/question/collection.tpl',
    'tpl!views/templates/question/collection-empty.tpl',
    'views/question/row',
    'views/tag/view',
    'models/tag',
    'syphon'
], function (App, QuestionsTpl, QuestionsEmptyTpl, QuestionView, TagView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.Questions = Marionette.CompositeView.extend({
            tagName: 'div',
            id: 'question-list',
            template: QuestionsTpl,
            childView: QuestionView,
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
                Backbone.Validation.callbacks.invalid(
                    this,
                    'search_query',
                    'Nothing here...'
                );
            },
            onShow: function () {
                var query = this.collection.searchQuery;
                if (query) {
                    $('#search-query').val(query).focus();
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
    });
    return App.Question.Views.Questions;
});
