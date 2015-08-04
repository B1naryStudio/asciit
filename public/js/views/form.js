define(['app', 'stickit'], function (App) {
    App.module('FormView', function (FormView, App, Backbone, Marionette, $, _) {
        FormView.View = Marionette.ItemView.extend({
            events: {
                'submit form': 'submit'
            },
            submit: function (event) {
                event.preventDefault();
                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', data);
            },
            onRender: function() {
                //this.stickit();
                return this;
            },
            remove: function() {
                Backbone.Validation.unbind(this);
                return Backbone.View.prototype.remove.apply(this, arguments);
            }
        });
    });
    return App.FormView.View;
});