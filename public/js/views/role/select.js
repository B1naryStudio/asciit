define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/role/select-row.tpl',
    'tpl!views/templates/role/select.tpl',
], function (
    App,
    Marionette,
    Backbone,
    SelectRowTpl,
    SelectTpl
) {
    App.Role.Views.RoleSelectRow = Marionette.ItemView.extend({
        tagName: 'option',
        template: SelectRowTpl,
        onRender: function () {
            this.$el.val(this.model.attributes.id);
        }
    });

    App.Role.Views.RoleSelect = Marionette.CompositeView.extend({
        tagName: 'select',
        className: 'role-select',
        template: SelectTpl,
        childView: App.Role.Views.RoleSelectRow,
        childViewContainer: '.role-options',

        events: {
            'change': 'onChange'
        },

        onChange: function () {
            var value = this.getCurrentValue();
            this.triggerMethod('role:switched', value);
        },

        getCurrentValue: function () {
            return this.$el.val();
        },

        onShow: function () {
            this.$('option[value=' + this.options.currentRole + ']')
                .attr('selected', true);
        }
    });

    return App.Role.Views.RoleSelect;
});
