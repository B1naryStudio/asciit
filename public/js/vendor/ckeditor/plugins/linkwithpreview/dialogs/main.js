'use strict';

CKEDITOR.dialog.add('linkWithPreviewDialog', function (editor) {
    return {
        allowedContent: 'a[href,target]',
        title: 'Insert Link',
        minWidth: 550,
        minHeight: 100,
        resizable: CKEDITOR.DIALOG_RESIZE_NONE,
        contents:[{
            id: 'LinkWithPreview',
            label: 'LinkWithPreview',
            elements: [
                {
                    type: 'html',
                    html: '<div class="link-preview-wrapper"><img class="link-preview-image"></div>'
                },
                {
                    type: 'text',
                    label: 'URL',
                    id: 'edp-URL',
                    validate: CKEDITOR.dialog.validate.notEmpty('url cannot be empty.'),
                    setup: function (element, definition) {
                        this._.dialog.preview.style.display = 'none';
                        var href = element.getAttribute('href');
                        var isExternalURL = /^(http|https):\/\//;
                        if (href) {
                            if (!isExternalURL.test(href)) {
                                href = 'http://' + href;
                            }
                            this.setValue(href);
                            this._.dialog.preview.setAttribute(
                                'src',
                                this._.dialog.previewOld.getAttribute('src')
                            );
                            this._.dialog.preview.style.display = 'block';
                        }
                        this._.dialog.definition.oldLink = href;

                        document.getElementById(this.domId)
                            .addEventListener('keyup', function (e) {
                                if (e.target.value.length > 10 &&
                                    definition.oldLink !== e.target.value
                                ) {
                                    definition.restart(e.target.value);
                                }
                            });
                    },
                    commit: function (element) {
                        var href = this.getValue();
                        var isExternalURL = /^(http|https):\/\//;
                        if (href) {
                            if (!isExternalURL.test(href)) {
                                href = 'http://' + href;
                            }
                            element.setAttribute('href', href);
                            element.setAttribute('data-cke-saved-href', href);
                            element.setAttribute('src', href);
                            element.setAttribute('data-cke-saved-src', href);
                            if (!element.getText()) {
                                element.setText(this.getValue());
                            }
                        }
                    }
                },
                {
                    type: 'text',
                    label: 'Text to display',
                    id: 'edp-text-display',
                    setup: function (element, definition) {
                        this.setValue(element.getText());
                    },
                    commit: function (element) {
                        var currentValue = this.getValue();
                        if (currentValue !== '' && currentValue !== null) {
                            element.setText(currentValue);
                        }
                    }
                }, 
                {
                    type: 'html',
                    html: '<p>The Link will be opened in another tab.</p>'
                }
            ]
        }],
        onShow: function () {
            var selection = editor.getSelection();
            var selector = selection.getStartElement();
            var element;

            if (selector) {
                element = selector.getAscendant('a', true);
                var tmp = selector.getAscendant('div', true);
                if (tmp) {
                    this.previewOld = tmp.find('img.cke_widget_element').$[0];
                }
            }

            if (!element || element.getName() !== 'a') {
                element = editor.document.createElement('a');
                element.setAttribute('target', '_blank');
                if (selection) {
                    element.setText(selection.getSelectedText());
                }
                this.insertMode = true;
            } else {
                this.insertMode = false;
            }
            this.element = element;
            this.preview = this.parts.contents.getElementsByTag('img').$[0];

            this.setupContent(this.element, this.definition);
        },
        onOk: function () {
            var dialog = this;
            var anchorElement = this.element;

            this.commitContent(this.element);

            if (this.insertMode) {
                var wrapper = editor.document.createElement('div');
                wrapper.setAttribute('id', 'link-preview-result-wrapper');
                wrapper.setAttribute(
                    'style',
                    'width: ' +
                        editor.config.linkwithpreview.thumbnailWidth +
                        'px;margin: 0 auto;'
                );
                var image = editor.document.createElement('img');
                image.setAttribute('src', this.preview.getAttribute('src'));
                image.setAttribute('style', 'width:100%;');
                image.setAttribute('class', 'cke_widget_element');
                wrapper.append(image);
                wrapper.append(this.element);
                editor.insertElement(wrapper);
            } else {
                this.previewOld.setAttribute('src', this.preview.getAttribute('src'));
                this.previewOld.setAttribute(
                    'data-cke-saved-src',
                    this.preview.getAttribute('src')
                );
            }
        },
        process: function (url) {
            var self = this;
            CKEDITOR.ajax.load(editor.config.linkwithpreview.url +
                encodeURIComponent(url), function (data) {
                data = JSON.parse(data);
                self.preloadHide(data.url);
            } );
        },
        restart: function (url) {
            if (this.timerId) {
                clearTimeout(this.timerId);
            }
            var self = this;
            this.oldLink = url;
            this.preloadShow();
            this.timerId = setTimeout(function () {
                self.process(url);
            }, 2000);
        },
        preloadShow: function () {
            this.dialog.preview.setAttribute(
                'src',
                editor.plugins.linkwithpreview.path + 'icons/loader.gif'
            );
            this.dialog.preview.style.display = 'block';
        },
        preloadHide: function (image) {
            this.dialog.preview.setAttribute('src', image);
        }
    };
});
