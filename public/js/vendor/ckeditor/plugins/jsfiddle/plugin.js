(function () {
    CKEDITOR.plugins.add('jsfiddle', {
        icons: 'jsfiddle',
        lang: ['uk', 'en', 'ru'],
        init: function (editor) {
            editor.addCommand(
                'jsfiddle',
                new CKEDITOR.dialogCommand('jsfiddleDialog')
            );
            editor.ui.addButton('JSFiddle', {
                label: editor.lang.jsfiddle.buttonTitle,
                command: 'jsfiddle'
            });

            CKEDITOR.dialog.add(
                'jsfiddleDialog',
                this.path + 'dialogs/jsfiddle.js'
            );
        }
    });
})();