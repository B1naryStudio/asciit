define([
    'app',
    'tpl!views/templates/paginator/collection.tpl',
    'tpl!views/templates/paginator/row.tpl'
], function (App, PaginatorTpl, PaginatorRowTpl) {
    App.module('Paginator.Views', function (View, App, Backbone, Marionette, $, _) {
        View.PaginatorCollectionRow = Marionette.ItemView.extend({
            tagName: 'li',
            template: PaginatorRowTpl,
            initialize: function (options) {
                this.$el.addClass(this.model.get('type'));
                if (this.model.get('is_disabled')) {
                    this.$el.addClass('disabled');
                }
            }
        });

        View.Collection = Marionette.CompositeView.extend({
            className: 'paginator',
            template: PaginatorTpl,
            childView: View.PaginatorCollectionRow,
            childViewContainer: '.pages',
            events: {
                'click .next': 'getNextPage',
                'click .prev': 'getPrevPage',
                'click .page': 'goToPage'
            },
            getNextPage: function () {
                this.trigger('form:page', this.info.currentPage + 1);
            },
            getPrevPage: function () {
                this.trigger('form:page', this.info.currentPage - 1);
            },
            goToPage: function (event) {
                this.trigger('form:page', parseInt(event.target.innerHTML));
            },
            initialize: function (options) {
                this.info = options.state;
            }
        });
    });
    return App.Paginator.Views.Collection;
});
