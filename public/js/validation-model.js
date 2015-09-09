define(['backbone', 'validation'], function () {
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

    // Validation settings for bootstrap
    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var messageBlock;

            if (attr === "error") {
                messageBlock = view.$('.error-block');
            } else {
                var $el = view.$('[name=' + attr + ']'),
                    $group = $el.closest('.form-group');

                $group.addClass('has-error');
                messageBlock = $group.find('.help-block')
            }

            messageBlock.html(error).removeClass('hidden');
        }
    });
});
