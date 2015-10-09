define([
    'app',
    'marionette',
    'backbone',
    'views/view-behaviors/search-form',
    'tpl!views/templates/user/collection.tpl',
    'tpl!views/templates/user/row.tpl',
    'views/role/select',
    'views/view-behaviors/waiting-state',
    'views/view-behaviors/server-validation',
    'models/user'
], function (
    App,
    Marionette,
    Backbone,
    SearchForm,
    UsersCollectionTpl,
    UserRowTpl,
    RolesSelectView,
    WaitingState,
    ServerValidation
) {
    App.User.Views.UserRowView = Marionette.LayoutView.extend({
        template: UserRowTpl,
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
            var selectView = new RolesSelectView({
                collection: this.options.roles,
                currentRole: this.model.get('local_role_id')
            });

            this.getRegion('roleSelect').show(selectView);
        }
    });

    App.User.Views.UsersView = Marionette.CompositeView.extend({
        className: 'users',
        template: UsersCollectionTpl,
        childView: App.User.Views.UserRowView,
        childViewContainer: '.users-list',

        behaviors: {
            SearchForm: {
                behaviorClass: SearchForm
            }
        },

        onNotFound: function () {
            this.$('.users-table').hide();
        }
    });

    return App.User.Views.UsersView;
});
