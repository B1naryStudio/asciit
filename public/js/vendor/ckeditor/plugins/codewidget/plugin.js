(function () {
    CKEDITOR.plugins.add('codewidget', {
        requires: 'ajax',
        lang: ['uk', 'en', 'ru'],
        init: function (editor) {
            editor.addCommand(
                'jsfiddle',
                new CKEDITOR.dialogCommand('jsfiddleDialog')
            );
            editor.addCommand(
                'gitgist',
                new CKEDITOR.dialogCommand('gitgistDialog')
            );

            editor.ui.addButton('JSFiddle', {
                label: editor.lang.codewidget.jsFiddle.buttonTitle,
                command: 'jsfiddle',
                icon: this.path + 'icons/jsfiddle.png'
            });
            editor.ui.addButton('GitGist', {
                label: editor.lang.codewidget.gist.buttonTitle,
                command: 'gitgist',
                icon: this.path + 'icons/github.png'
            });

            CKEDITOR.dialog.add(
                'jsfiddleDialog',
                this.path + 'dialogs/jsfiddle.js'
            );
        }
    });
})();