define([
    'app',
    'marionette',
    'backbone',
    'tpl!views/templates/tag/select-row.tpl',
    'select2'
], function (
    App,
    Marionette,
    Backbone,
    SelectRowTpl
) {
    App.Tag.Views.TagSelectRow = Marionette.ItemView.extend({
        tagName: 'option',
        template: SelectRowTpl,
        onRender: function () {
            this.$el.val(this.model.attributes.title);
        }
    });

    App.Tag.Views.TagSelect = Marionette.CollectionView.extend({
        tagName: 'select',
        className: 'tag-select',
        childView: App.Tag.Views.TagSelectRow,

        onShow: function () {
            var self = this;
            var lang = i18n.lng().substr(0, 2);

            require(['vendor/select2/i18n/' + lang], function () {
                var select = self.$el
                    .attr('name', 'tag')
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
                                var tmp;

                                for (var i = 0; i < data[1].length; i++ ) {
                                    tmp = App.helper.htmlspecialchars(
                                        data[1][i]['title']
                                    );
                                    data[1][i].text = tmp;
                                    data[1][i].id = tmp;
                                }

                                return {
                                    results: data[1]
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
                            return App.helper.htmlspecialchars(
                                repo.title || repo.text
                            );
                        }
                    }
                ).val(null).trigger('change');

                // Setting the initial values according to
                // https://select2.github.io/announcements-4.0.html#removed-initselection
                if (self.options.selected) {
                    _.map(self.options.selected, function (selectedTag) {
                        var option = self.$('option[value=' + selectedTag + ']');

                        if (option.length) {
                            option.attr('selected', true);
                        } else {
                            var newOption = new Option(selectedTag, selectedTag,
                                true, true);
                            select.append(newOption);
                        }
                    });

                    select.trigger('change');
                }
            });
        }
    });

    return App.Tag.Views.TagSelect;
});
