define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/role/select-row.tpl',
], function (
    App,
    Marionette,
    Backbone,
    SelectRowTpl
) {
    App.Role.Views.RoleSelectRow = Marionette.ItemView.extend({
        tagName: 'option',
        template: SelectRowTpl,
        onRender: function () {
            this.$el.val(this.model.attributes.id);
        }
    });

    App.Role.Views.RoleSelect = Marionette.CollectionView.extend({
        tagName: 'select',
        className: 'role-select form-control',
        childView: App.Role.Views.RoleSelectRow,

        events: {
            'change': 'onChange'
        },

        onChange: function () {
            var value = this.getCurrentValue();
            this.triggerMethod('select:switched', value);
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
