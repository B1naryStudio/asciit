define(['backbone', 'validation'], function () {
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

    // Valisdation settings for bootstrap
    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');

            if(attr==='title' && $(view.el).attr('id')!='folders-list') {
                var el = $(view.el).find('.folders-form-list');
                if(el.length>0) {
                    el = el.find('.form-group');
                    el.removeClass('has-error');
                    el.find('.help-block').html('').addClass('hidden');
                }
            }
        },
        invalid: function (view, attr, error, selector) {
            console.log(view);
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');
            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
            if(attr==='title' && $(view.el).attr('id')!='folders-list') {
                var el = $(view.el).find('.folders-form-list');
                if(el.length>0) {
                    el = el.find('.form-group');
                    el.addClass('has-error');
                    el.find('.help-block').html(error).removeClass('hidden');
                }
            }
        }
    });
});
