(function () {
    CKEDITOR.plugins.add('jsfiddle', {
        icons: 'jsfiddle',
        init: function (editor) {
            editor.addCommand(
                'jsfiddle',
                new CKEDITOR.dialogCommand('jsfiddleDialog')
            );
            editor.ui.addButton('JSFiddle', {
                label: 'Add a JSFiddle code snippet',
                command: 'jsfiddle'
            });

            CKEDITOR.dialog.add(
                'jsfiddleDialog',
                this.path + 'dialogs/jsfiddle.js'
            );
        }
    });
})();