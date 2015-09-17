CKEDITOR.plugins.add( 'linkwithpreview', {
    requires: 'ajax',
    init: function (editor) {
        editor.addCommand(
            'linkwithpreview',
            new CKEDITOR.dialogCommand('linkWithPreviewDialog')
        );
        editor.ui.addButton( 'LinkWithPreview', {
            label: 'Add a link with preview',
            icon: this.path + 'icons/linkwithpreview.png',
            command: 'linkwithpreview'
        });
        CKEDITOR.dialog.add(
            'linkWithPreviewDialog',
            this.path + 'dialogs/main.js'
        );
    }
});