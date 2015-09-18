define(['app'], function (App){
    var Settings = {
        extraPlugins: 'image2,imageresize,codewidget,xml,ajax',
        filebrowserImageUploadUrl: App.prefix + '/api/v1/images',
        imageUploadUrl: App.prefix + '/api/v1/images?responceType=json',
        gistApi: App.prefix + '/gist-snippets',
        codeSnippet_theme: App.codeSnippetTheme,
        language: i18n.lng()
    };

    return Settings;
});
