define(['app', 'tpl!views/templates/answer/answers.tpl',
    'tpl!views/templates/answer/single-answer.tpl',
    'stickit'
], function (App, AnswersTpl, SingleAnswerTpl) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {
        View.SingleAnswerCompositeView = Marionette.CompositeView.extend({
            template: SingleAnswerTpl
        });

        View.AnswersCompositeView = Marionette.CompositeView.extend({
            tagName: 'section',
            className: 'answers-list',
            template: AnswersTpl,
            childView: View.SingleAnswerCompositeView,
            childViewContainer: '#answers',

            bindings: {
                '[name=description]': {
                    observe: 'description',
                    setOptions: {
                        validate: true
                    }
                }
            },
            events: {
                'submit form': 'submit'
            },

            submit: function (event) {
                event.preventDefault();

                if (this.model.isValid(true)) {
                    // To event in controller
                    this.trigger('form:submit', this.model);
                }
            },
            onDataInvalid: function (errors) {
                for (var field in errors) {
                    //console.log('Error in ' + field + ': ' + errors[field] );
                    Backbone.Validation.callbacks.invalid(this, field, errors[field]);
                }
            },
            // Refresh model and form for the futher using without view rendering
            onModelRefresh: function (freshModel) {
                this.model = freshModel;
                this.stickit();
                this.refreshCounter();
            },
            refreshCounter: function () {
                $(this.el).find('.counter').html(this.model.get('count'));
            },
            onRender: function() {
                this.stickit();
                return this;
            },
            initialize: function () {
                Backbone.Validation.bind(this);
            },
            remove: function() {
                // Remove the validation binding
                // See: http://thedersen.com/projects/backbone-validation/#using-form-model-validation/unbinding
                Backbone.Validation.unbind(this);
                return Backbone.View.prototype.remove.apply(this, arguments);
            }
        });
    });

    return App.Answer.Views.AnswersCompositeView;
});
