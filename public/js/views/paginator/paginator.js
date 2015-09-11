define([
    'app',
    'tpl!views/templates/paginator/collection.tpl',
    'tpl!views/templates/paginator/row.tpl',
    'marionette',
    'paginator'
], function (App, PaginatorTpl, PaginatorRowTpl, Marionette) {
    App.Paginator.Views.PaginatorCollectionRow = Marionette.ItemView.extend({
        tagName: 'li',
        template: PaginatorRowTpl,
        initialize: function (options) {
            this.$el.addClass(this.model.get('type'));
            if (this.model.get('is_disabled')) {
                this.$el.addClass('disabled');
            }
        }
    });

    App.Paginator.Views.Collection = Marionette.CompositeView.extend({
        className: 'paginator',
        template: PaginatorTpl,
        childView: App.Paginator.Views.PaginatorCollectionRow,
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

    return App.Paginator.Views.Collection;
});
