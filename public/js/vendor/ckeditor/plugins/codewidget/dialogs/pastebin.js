(function () {
    CKEDITOR.dialog.add("pastebinDialog", function (editor) {
        return {
            allowedContent: "a[href,target]",
            title: "Pastebin code snippet",
            minWidth: 550,
            minHeight: 80,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents: [{
                id: "Pastebin",
                label: "Pastebin",
                elements: [    // The only tab
                    {          // Text-field
                        type: "text",
                        id: "snippetURL",
                        label: "URL",
                        validate: function () {
                            // Check link by pattern
                            var reg = new RegExp(
                                /(ftp|http|https):\/\/pastebin.com\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                            );
                            var link = this.getValue();

                            if (!reg.exec(link)) {
                                return editor.lang.codewidget.Pastebin.urlValidation;
                            }

                            // Check is this link returns a real gist
                            var pastebinId = this.getValue()
                                .slice(-9)
                                .replace('\/', '');
                            var link = 'http://pastebin.com/embed_iframe.php?i=' +
                                pastebinId;
                            var encodedLink = encodeURIComponent(link);
                            var iframeSrcLink = editor.config.pastebinApi +
                                '?link=' +
                                encodedLink;

                            var data = CKEDITOR.ajax.load(iframeSrcLink);

                            if (!data) {
                                return editor.lang.codewidget.Pastebin
                                    .urlReturnsValidation;
                            }
                        }
                    },
                    {   // Explanation
                        type: "html",
                        html: "<p>" +
                              editor.lang.codewidget.Pastebin.urlDescription +
                              "</p>"
                    }
                ]
            }],
            onOk: function () {
                var pastebinId = this.getValueOf('Pastebin', 'snippetURL')
                    .slice(-9)
                    .replace('\/', '');

                var link = 'http://pastebin.com/embed_iframe.php?i=' +
                    pastebinId;
                var encodedLink = encodeURIComponent(link);
                var iframeSrcLink = editor.config.pastebinApi +
                    '?link=' +
                    encodedLink;

                var iframe = editor.document.createElement('iframe');
                iframe.setAttribute('src', iframeSrcLink);
                iframe.setAttribute(
                    'class',
                    'code-snippet pastebin full-height'
                );

                editor.insertElement(iframe);
                var br = editor.document.createElement('br');
                editor.insertElement(br);
            }
        }
    });
})();