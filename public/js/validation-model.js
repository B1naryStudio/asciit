define(['backbone', 'validation'], function () {
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
});
