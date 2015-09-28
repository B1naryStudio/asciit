define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.QuoteButton = Marionette.Behavior.extend({
        onControlShow: function (e) {
            var container = $(e.path[0]);  //get container with text
            var line_height = parseInt(container.css('line-height'));
            var container_offset = container.offset();
            var current_line = Math.ceil(
                (e.pageY - container_offset.top) / line_height
            );
            this.$el
                .css({
                    left: e.pageX + 3,
                    top: (current_line - 1) * line_height +
                        container_offset.top
                });
            $(document).bind('click', function () {
                App.trigger('select:cancel');
            });
        },

        onControlClose: function (e) {
            $(document).unbind('click');
        },

        onQuoteSet: function (e) {
            var selected = App.helper.getSelectedInfo();
            if (selected.text) {
                var quote = '<blockquote><span class="author">' +
                    '<time class="relative" data-abs-time="' +
                    selected.model.get('created_at') +
                    '">' +
                    selected.model.get('created_relative') +
                    '</time>' +
                    ' by ' +
                    selected.model.get('user').first_name +
                    ' ' +
                    selected.model.get('user').last_name +
                    ':</span><br/>' +
                    selected.text +
                    ' </blockquote>';
                var editor = App.helper.editor;
                editor.focus();
                App.helper.moveFocus(editor, quote);

                $('html, body').scrollTop(
                    $('#new-answer-form').offset().top
                );
                App.trigger('select:cancel');
            }
        }
    });

    return App.Behaviors.QuoteButton;
});