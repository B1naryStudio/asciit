define([
    'app',
    'tpl!views/templates/question/collection.tpl',
    'views/question/row',
    'marionette',
    'backbone',
    'models/tag',
    'syphon'
], function (App, QuestionsTpl, QuestionView, Marionette, Backbone) {
    App.Question.Views.Questions = Marionette.CompositeView.extend({
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
                i18n.t('ui.empty') + '...'
            );
        },
        onShow: function () {
            var query = this.options.searchQuery;
            if (query) {
                this.$el.find('#search-query').val(query).focus();
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
