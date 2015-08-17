define([
    'app',
    'tpl!views/templates/question/collection.tpl',
    'tpl!views/templates/question/row.tpl',
    'views/tag/view',
    'models/tag',
    'syphon'
], function (App, QuestionsTpl, QuestionTpl, TagView) {
    App.module('Question.Views', function (View, App, Backbone, Marionette, $, _) {
        View.QuestionCollectionRow = Marionette.LayoutView.extend({
            tagName: 'div',
            className: 'question-row',
            template: QuestionTpl,
            regions: {
                tag: '.tags'
            },
            onShow: function () {
                var self = this;
                $.when(App.request('tag:reset', this.model.attributes.tags))
                    .done(function (tags) {
                        self.getRegion('tag')
                            .show(new TagView({
                                collection: tags,
                                searchTag: self.options.searchTag()
                            }));
                });

                // Highligting code-snippets
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
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
