define(['app'], function (App){
    var Settings = {
        extraPlugins: 'image2,imageresize,codewidget,xml,ajax,linkwithpreview',
        filebrowserImageUploadUrl: App.prefix + '/api/v1/images',
        imageUploadUrl: App.prefix + '/api/v1/images?responseType=json',
        codeSnippet_theme: App.codeSnippetTheme,
        gistApi: App.prefix + '/gist-snippets',
        pastebinApi: App.prefix + '/pastebin-snippets',
        linkwithpreview: {
            url: App.prefix + '/link-preview?url=',
            thumbnailWidth: 200 // px
        },
        language: i18n.lng()
    };

    return Settings;
});
