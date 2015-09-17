(function () {
    CKEDITOR.dialog.add("gistDialog", function (editor) {
        return {
            allowedContent: "a[href,target]",
            title: "GitHub Gist code snippet",
            minWidth: 550,
            minHeight: 80,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents: [{
                id: "GitHubGist",
                label: "GitHubGist",
                elements: [    // The only tab
                    {          // Text-field
                        type: "text",
                        id: "gistURL",
                        label: "URL",
                        validate: CKEDITOR.dialog.validate.regex(
                            /(ftp|http|https):\/\/gist.github.com\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                            editor.lang.codewidget.gist.urlValidation
                        )
                    },
                    {   // Explanation
                        type: "html",
                        html: "<p>" +
                              editor.lang.codewidget.gist.urlDescription +
                              "</p>"
                    }
                ]
            }],
            onOk: function () {
                var iframe = editor.document.createElement('iframe');
                var link = this.getValueOf('GitHubGist', 'gistURL');
                var iframeSrc = editor.config.gistApi + '?link=' + link
                iframe.setAttribute('src', iframeSrc);
                iframe.setAttribute('class', 'code-snippet gist full-height');

                editor.insertElement(iframe);
            }
        }
    });
})();