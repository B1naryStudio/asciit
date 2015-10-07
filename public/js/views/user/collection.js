define([
    'app',
    'marionette',
    'backbone',
    'views/view-behaviors/search-form',
    'tpl!views/templates/user/collection.tpl',
    'tpl!views/templates/user/row.tpl',
    'views/role/select',
    'models/user'
], function (
    App,
    Marionette,
    Backbone,
    SearchForm,
    UsersCollectionTpl,
    UserRowTpl,
    RolesSelectView
) {
    App.User.Views.UserRowView = Marionette.LayoutView.extend({
        template: UserRowTpl,
        tagName: 'tr',
        className: 'user-element',

        regions: {
            roleSelect: '.role-select-wrapper'
        },

        events: {
            'mouseenter': 'onOverEntry',
            'mouseleave':  'onOutEntry'
        },

        childEvents: {
            'role:switched': function (childview, roleId) {
                this.model.set('role_id', +roleId);
                this.triggerMethod('role:switched');
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

        onShow: function () {
            var selectView = new RolesSelectView({
                collection: this.options.roles,
                currentRole: this.model.get('role_id')
            });

            this.getRegion('roleSelect').show(selectView);
        },

        onRoleUpdated: function (updatedModel) {
            this.$('.role-value').text(updatedModel.get('role').title);
        },

        onRoleUpdateError: function () {
            this.model.set('role_id', this.model.get('role').id);
            this.getRegion('roleSelect').reset();
            this.onShow();
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
