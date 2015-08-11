define(['app'], function (App){
    var Settings = {
        extraPlugins: 'image2,imageresize',
        filebrowserImageUploadUrl: App.prefix + '/api/v1/images',
        imageUploadUrl: App.prefix + '/api/v1/images?responceType=json',
        codeSnippet_theme: App.codeSnippetTheme
    };

    return Settings;
});
