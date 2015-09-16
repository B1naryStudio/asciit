CKEDITOR.plugins.add( 'linkwithpreview', {
    icons: 'link',
    init: function (editor) {
        editor.addCommand(
            'linkwithpreview',
            new CKEDITOR.dialogCommand('linkWithPreviewDialog')
        );
        editor.ui.addButton( 'LinkWithPreview', {
            label: 'Add a link with preview',
            icons: 'link',
            command: 'linkwithpreview'
        });
        CKEDITOR.dialog.add(
            'linkWithPreviewDialog',
            this.path + 'dialogs/main.js'
        );
    }
});