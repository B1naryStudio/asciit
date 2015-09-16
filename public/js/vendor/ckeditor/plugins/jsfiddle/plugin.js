(function () {
    CKEDITOR.plugins.add('jsfiddle', {
        requires: 'ajax',
        //icons: 'jsfiddle',
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
                label: editor.lang.jsfiddle.jsFiddleButtonTitle,
                command: 'jsfiddle',
                icon: this.path + 'icons/jsfiddle.png'
            });
            editor.ui.addButton('GitGist', {
                label: editor.lang.jsfiddle.gistButtonTitle,
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