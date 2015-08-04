define(['app', 'tpl!views/templates/answer/answers.tpl',
    'tpl!views/templates/answer/single-answer.tpl',
    'stickit'
], function (App, AnswersTpl, SingleAnswerTpl) {
    App.module('Answer.Views', function (View, App, Backbone, Marionette, $, _) {

        // Valisdation settings for bootstrap
        _.extend(Backbone.Validation.callbacks, {
            valid: function (view, attr, selector) {
                var $el = view.$('[name=' + attr + ']'),
                    $group = $el.closest('.form-group');

                $group.removeClass('has-error');
                $group.find('.help-block').html('').addClass('hidden');
            },
            invalid: function (view, attr, error, selector) {
                var $el = view.$('[name=' + attr + ']'),
                    $group = $el.closest('.form-group');

                $group.addClass('has-error');
                $group.find('.help-block').html(error).removeClass('hidden');
            }
        });

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
