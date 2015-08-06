define([
    'app',
    'tpl!views/templates/question/collection.tpl',
    'tpl!views/templates/question/row.tpl',
    'views/tag/view',
    'syphon'
], function (App, QuestionsTpl, QuestionTpl, TagView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionCollectionRow = Marionette.LayoutView.extend({
            tagName: 'div',
            template: QuestionTpl,
            regions: {
                tag: '.tags'
            },
            onShow: function () {
                console.log(this.model.attributes.tags);
                this.getRegion('tag').show(new TagView({ collection: this.model.attributes.tags }));
            }
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
                // return search query to controller
                this.trigger('form:submit', searchQuery);
            },

            onNotFound: function () {
                Backbone.Validation.callbacks.invalid(this, 'search_query', 'Nothing here...');

                // Turn error indication off;
                setTimeout(function () {
                    Backbone.Validation.callbacks.valid(this, 'search_query');
                }, 1700);
            }
        });
    });
    return App.Question.Views.Questions;
});
