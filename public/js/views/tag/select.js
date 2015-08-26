define([
    'app',
    'tpl!views/templates/tag/select_row.tpl',
    'select2'
], function (App, SelectRowTpl) {
    App.module('Tag.Views', function (View, App, Backbone, Marionette, $, _) {
        View.TagSelectRow = Marionette.ItemView.extend({
            tagName: 'option',
            template: SelectRowTpl,
            onRender: function () {
                this.$el.val(this.model.attributes.title);
            }
        });

        View.TagSelect = Marionette.CollectionView.extend({
            tagName: 'select',
            className: 'tag-select',
            childView: View.TagSelectRow,
            onShow: function () {
                var self = this;
                var lang = i18n.lng();

                require(['vendor/select2/i18n/' + lang], function () {
                    self.$el.attr('name', 'tag')
                        .attr('multiple', 'multiple')
                        .select2({
                            placeholder: i18n.t('tags.select'),
                            language: lang,
                            tags: true,
                            ajax: {
                                url: App.prefix + '/api/v1/tags',
                                dataType: 'json',
                                delay: 250,
                                data: function (params) {
                                    return {
                                        search: params.term,
                                        page_size: 10
                                    };
                                },
                                processResults: function (data, params) {
                                    for (var i = 0; i < data.length; i++ ) {
                                        data[i].text = data[i]['title'];
                                        data[i].id = data[i]['title'];
                                    }
                                    return {
                                        results: data
                                    };
                                },
                                cache: true
                            },
                            escapeMarkup: function (markup) {
                                return markup;
                            },
                            minimumInputLength: 2,

                            templateResult: function (repo) {
                                if (repo.loading) {
                                    return repo.text;
                                }

                                if (!repo.title) {
                                    repo.title = repo.text;
                                }
                                return SelectRowTpl(repo);
                            },
                            templateSelection: function (repo) {
                                return repo.title || repo.text;
                            }
                        }).val(null).trigger('change');
                });


            }
        });
    });
    return App.Tag.Views.TagSelect;
});
