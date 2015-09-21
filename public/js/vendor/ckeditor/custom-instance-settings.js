define(['app'], function (App){
    var Settings = {
        extraPlugins: 'image2,imageresize,codewidget,xml,ajax,linkwithpreview',
        filebrowserImageUploadUrl: App.prefix + '/api/v1/images',
        imageUploadUrl: App.prefix + '/api/v1/images?responceType=json',
        codeSnippet_theme: App.codeSnippetTheme,
        gistApi: App.prefix + '/gist-snippets',
        language: i18n.lng()
    };

    return Settings;
});
