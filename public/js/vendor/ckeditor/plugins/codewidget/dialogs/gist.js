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
                        validate: function () {
                            // Check link by pattern
                            var reg = new RegExp(
                                /(ftp|http|https):\/\/gist.github.com\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                            );
                            var link = this.getValue();

                            if (!reg.exec(link)) {
                                return editor.lang.codewidget.gist.urlValidation;
                            }

                            // Check is this link returns a real gist
                            var iframeSrcLink = editor.config.gistApi +
                                                '?link=' +
                                                link;
                            var data = CKEDITOR.ajax.load(iframeSrcLink);

                            if (!data) {
                                return editor.lang.codewidget.gist
                                    .urlReturnsGistValidation;
                            }
                        }
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
                var link = this.getValueOf('GitHubGist', 'gistURL');
                var iframeSrcLink = editor.config.gistApi +
                    '?link=' +
                    link;

                var iframe = editor.document.createElement('iframe');
                iframe.setAttribute('src', iframeSrcLink);
                iframe.sandbox='allow-same-origin';
                iframe.setAttribute('class', 'code-snippet gist full-height');

                editor.insertElement(iframe);
                var br = editor.document.createElement('br');
                editor.insertElement(br);
            }
        }
    });
})();