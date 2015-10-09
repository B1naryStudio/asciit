define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/role/row.tpl',
    'views/role/select',
    'views/view-behaviors/waiting-state',
    'views/view-behaviors/server-validation'
], function (
    App,
    Marionette,
    Backbone,
    SearchForm,
    RoleRowTpl,
    RoleSelectView,
    WaitingState,
    ServerValidation
) {
    App.Role.Views.RoleRowView = Marionette.LayoutView.extend({
        template: RoleRowTpl,
        tagName: 'tr',
        className: 'user-element',

        regions: {
            roleSelect: '.role-select-wrapper'
        },

        ui: {
            errorBlock: '.error-block'
        },

        events: {
            'mouseenter': 'onOverEntry',
            'mouseleave':  'onOutEntry'
        },

        childEvents: {
            'select:switched': 'onRoleSelectSwitched'
        },

        behaviors: {
            WaitingState: {
                behaviorClass: WaitingState
            },
            ServerValidation: {
                behaviorClass: ServerValidation
            }
        },

        onOverEntry: function () {
            this.$('.role-value').hide();
            this.$('.role-select').show();
        },

        onOutEntry: function () {
            this.$('.role-value').show();
            this.$('.role-select').hide();
        },

        onRoleSelectSwitched: function (childview, roleId) {
            this.triggerMethod('waiting:start');
            this.model.set('local_role_id', +roleId);
            this.triggerMethod('role:switched');
        },

        onRoleUpdated: function (updatedModel) {
            this.$('.role-value').text(updatedModel.get('local_role').title);
            this.triggerMethod('waiting:stop');
        },

        onModelInvalid: function () {
            this.triggerMethod('waiting:stop');

            this.model.set('local_role_id', this.model.get('local_role').id);
            this.getRegion('roleSelect').reset();
            this.onShow();
        },

        onShow: function () {
            var selectView = new RoleSelectView({
                collection: this.options.roles,
                currentRole: this.model.get('local_role_id')
            });

            this.getRegion('roleSelect').show(selectView);
        }
    });

    App.Role.Views.RoleView = Marionette.Collection.extend({
        className: 'roles',
        childView: App.Role.Views.RoleRowView,

        onNotFound: function () {
            this.$('.users-table').hide();
        }
    });

    return App.Role.Views.RoleView;
});
