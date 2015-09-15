define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/question/question-layout.tpl',
    'views/answer/collection',
    'views/tag/view',
    'views/views-mixins',
    'views/view-behaviors/hiding-controls',
    'views/view-behaviors/delete-button',
    'views/view-behaviors/contains-votes',
    'views/view-behaviors/code-highlighter',
    'stickit',
    'highlight',
    'ckeditor',
    'ckeditor.adapter',
    'jquery.elastic'
], function (
    App,
    Marionette,
    Backbone,
    QuestionLayoutTpl,
    AnswersCompositeView,
    TagView,
    ViewsMixins,
    HidingControls,
    DeleteButton,
    ContainsVotes,
    CodeHighlighter
) {
    App.Question.Views.QuestionLayout = Marionette.LayoutView.extend(
        _.extend({}, ViewsMixins.SelectText, {
            tagname: 'div',
            id: 'question-view',
            template: QuestionLayoutTpl,
            regions: {
                answersRegion: '#answers-region',
                commentsRegion: '#comments-region',
                tag: '.tags',
                votes: '.question-votes'
            },
            ui: {
                itemArea: '.question_view *',
                commentButton: '.add-comment',
                answerButton:  '.add-answer',
                deleteButton:  '.actions .entry-controls .delete',
                editButton:    '.actions .entry-controls .edit'
            },
            triggers: {
                'mouseover @ui.itemArea': 'controls:show',
                'mouseout @ui.itemArea':  'controls:hide',
                'click @ui.deleteButton': 'delete'
            },
            events: {
                'click @ui.commentButton': 'showCommentForm',
                'click @ui.answerButton': 'toAnswerForm',
                'click @ui.editButton':   'onEditStart',
                'mouseup p': 'selectText'
            },
            behaviors: {
                HidingControls: {
                    behaviorClass:     HidingControls,
                    controlsContainer: '.question_view .actions .entry-controls'
                },
                DeleteButton: {
                    behaviorClass: DeleteButton,
                    itemArea: '.question_view'
                },
                Collapse: {
                    behaviorClass: ContainsVotes
                },
                CodeHighlighter: {
                    behaviorClass: CodeHighlighter
                }
            },

            showCommentForm: function (e) {
                e.stopPropagation();
                var el = $(e.target)
                    .parents('.question_view')
                    .siblings('#comments-region')
                    .find('section .comment-form');
                el.toggle();
                $(e.target).toggleClass('form-open');
                el.find('textarea').elastic({
                    compactOnBlur: false
                }).focus();
            },

            toAnswerForm: function () {
                $('html, body').scrollTop(
                    $('#new-answer-form').offset().top
                );
                this.newAnswerEditor.focus();
            },

            onEditStart: function () {
                this.trigger("question:edit", this.model);
            },

            onShow: function () {
                var self = this;
                $.when(App.request('tag:reset', this.model.get('tags')))
                    .done(function (tags) {
                        self.getRegion('tag')
                            .show(new TagView({
                                collection: tags
                            })
                        );
                    }
                );
            },

            initialize: function () {
                this.listenTo(App, 'question:updated', function () {
                    Backbone.history.loadUrl(
                        Backbone.history.fragment
                    );
                })
            }
        })
    );

    return App.Question.Views.QuestionLayout;
});