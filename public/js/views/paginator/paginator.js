define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/paginator/collection.tpl',
    'tpl!views/templates/paginator/row.tpl',
    'tpl!views/templates/paginator/more.tpl',
    'marionette'
], function (
    App,
    Marionette,
    Backbone,
    PaginatorTpl,
    PaginatorRowTpl,
    PaginatorMoreTpl
) {
    App.Paginator.Views.PaginatorCollectionRow = Marionette.ItemView.extend({
        tagName: 'li',
        getTemplate: function () {
            if (this.model.type === 'more') {
                return PaginatorMoreTpl;
            }
            return PaginatorRowTpl;
        },
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
