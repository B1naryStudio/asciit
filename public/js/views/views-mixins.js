define([
    'app',
    'backbone'
], function (
    App,
    Backbone
) {
    App.ViewsMixins.SelectText = {
        selectText: function (e) {
            e.stopPropagation();
            var modelFieldContainer = e.target.closest('.model-field');

            if ($(modelFieldContainer).attr('contenteditable') === 'true') {
                return;
            }

            var editor = App.helper.editor;
            var selection = App.helper.getSelected();

            if (selection) {
                var text = new String(selection).replace(/^\s+|\s+$/g,'');

                if (text) {
                    var quote = '<blockquote><span class="author">' +
                        '<time class="relative" data-abs-time="' +
                        this.model.get('created_at') +
                        '">' +
                        this.model.get('created_relative') +
                        '</time>' +
                        ' by ' +
                        this.model.attributes.user.first_name +
                        ' ' +
                        this.model.attributes.user.last_name +
                        ':</span><br/>' +
                        text +
                        ' </blockquote>';

                    editor.focus();
                    App.helper.moveFocus(editor, quote);

                    $('html, body').scrollTop(
                        $('#new-answer-form').offset().top
                    );
                }
            }
        }
    };

    return App.ViewsMixins;
});
