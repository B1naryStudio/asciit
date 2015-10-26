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
                    html: '<div class="link-preview-wrapper"><div class="wrapper"><img class="link-preview-image"></div></div>'
                },
                {
                    type: 'text',
                    label: editor.lang.linkwithpreview.labelUrl,
                    id: 'edp-URL',
                    validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.linkwithpreview.messageEmptyUrl),
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
                        this._.dialog.elements.push(this);

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
                        if (href) {
                            element.setAttribute('href', href);
                            element.setAttribute('data-cke-saved-href', href);
                            element.setAttribute('src', href);
                            element.setAttribute('data-cke-saved-src', href);

                            // this hack need because commit element using order
                            // from definition, so without it setText would be
                            // after getText
                            var tmp = this._.dialog.elements[1].getValue();
                            if (!tmp.length) {
                                element.setText(this.getValue());
                            }
                        }
                    }
                },
                {
                    type: 'text',
                    label: editor.lang.linkwithpreview.labelTitle,
                    id: 'edp-text-display',
                    setup: function (element, definition) {
                        this.setValue(element.getText());
                        this._.dialog.elements.push(this);
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
                    html: '<p>' + editor.lang.linkwithpreview.description + '</p>'
                }
            ]
        }],
        onShow: function () {
            var selection = editor.getSelection();
            var selector = selection.getStartElement();
            var element;

            if (selector) {
                element = selector.getAscendant('a', true);
                if (element && !element.hasClass('link-preview-image-link')) {
                    element = element.getNext();
                }
                var tmp = selector.getAscendant('div', true);
                if (tmp) {
                    this.previewOld = tmp.find('img.cke_widget_element').$[0];
                }
            }

            if (!element || element.getName() !== 'a') {
                element = editor.document.createElement('a');
                element.setAttribute('target', '_blank');
                element.setAttribute('class', 'link-preview-image-link');
                if (selection) {
                    element.setText(selection.getSelectedText());
                }
                this.insertMode = true;
            } else {
                this.insertMode = false;
            }
            this.element = element;
            this.preview = this.parts.contents.getElementsByTag('img').$[0];
            this.elements = [];

            this.setupContent(this.element, this.definition);
        },
        onOk: function () {
            if (
                this.parts.footer.$.getElementsByTagName('a')[0]
                    .classList.contains('cke_dialog_ui_button_readonly')
            ) {
                return false;
            }
            this.commitContent(this.element);

            if (this.insertMode) {
                var wrapper = editor.document.createElement('div');
                wrapper.setAttribute('class', 'link-preview-result-wrapper');
                var image = editor.document.createElement('img');
                image.setAttribute('src', this.preview.getAttribute('src'));
                image.setAttribute('class', 'cke_widget_element');
                var image_link = editor.document.createElement('a');
                image_link.setAttribute('href', this.element.getAttribute('src'));
                image_link.append(image);
                wrapper.append(image_link);
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
            CKEDITOR.ajax.load(
                editor.config.linkwithpreview.url + encodeURIComponent(url),
                function (data) {
                    data = JSON.parse(data);
                    self.preloadHide(data.url);
                }
            );
        },
        restart: function (url) {
            if (this.timerId) {
                clearTimeout(this.timerId);
            }
            var self = this;
            this.preloadShow();
            var isExternalURL = /^(http|https):\/\//;
            if (!isExternalURL.test(url)) {
                url = 'http://' + url;
                this.dialog.elements[0].setValue(url);
            }
            this.oldLink = url;
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
            this.dialog.preview.classList.add('preload');
            this.dialog.parts.footer.$.getElementsByTagName('a')[0]
                .classList.add('cke_dialog_ui_button_readonly');
        },
        preloadHide: function (image) {
            this.dialog.preview.setAttribute('src', image);
            this.dialog.preview.classList.remove('preload');
            this.dialog.parts.footer.$.getElementsByTagName('a')[0]
                .classList.remove('cke_dialog_ui_button_readonly');
        }
    };
});
