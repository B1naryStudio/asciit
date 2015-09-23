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
                new CKEDITOR.dialogCommand('gistDialog')
            );
            editor.addCommand(
                'codepen',
                new CKEDITOR.dialogCommand('codepenDialog')
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
            editor.ui.addButton('CodePen', {
                label: editor.lang.codewidget.gist.buttonTitle,
                command: 'codepen',
                icon: this.path + 'icons/codepen.png'
            });

            CKEDITOR.dialog.add(
                'jsfiddleDialog',
                this.path + 'dialogs/jsfiddle.js'
            );
            CKEDITOR.dialog.add(
                'gistDialog',
                this.path + 'dialogs/gist.js'
            );
            CKEDITOR.dialog.add(
                'codepenDialog',
                this.path + 'dialogs/codepen.js'
            );
        }
    });
})();