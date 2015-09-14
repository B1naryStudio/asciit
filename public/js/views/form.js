define([
    'app',
    'marionette',
    'backbone',
    'stickit'
], function (
    App,
    Marionette,
    Backbone
) {
    App.FormView.View = Marionette.ItemView.extend({
        events: {
            'submit form': 'submit'
        },
        submit: function (event) {
            event.preventDefault();
            var data = Backbone.Syphon.serialize(this);
            this.trigger('form:submit', data);
        },
        onRender: function() {
            return this;
        },
        remove: function() {
            Backbone.Validation.unbind(this);
            return Backbone.View.prototype.remove.apply(this, arguments);
        }
    });

    return App.FormView.View;
});