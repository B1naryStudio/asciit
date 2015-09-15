define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    /*
     * Folds the rendered view collection on it's show to <maxEntries> elements.
     * Unfolds and folds again by the view event "list:fold", "list:unfold".
     * If entry added, hides an extra-elements. (if folded)
     * If entry removed, adds shown elems to <maxEntries> number (if folded)
     */
    App.Behaviors.Collapse = Marionette.Behavior.extend({
        defaults: {
            maxEntries: 3
        },

        collectionEvents: {
            "add": "onEntryAdded",
            "remove": "onEntryRemoved"
        },

        onShow: function () {
            this.collapseAllPrevious();
        },

        onListFold: function () {
            this.collapseAllPrevious(true);  //with effect
        },

        onListUnfold: function () {
            // Unfolds all
            this.$(this.view.childViewContainer + " > *").slideDown("slow");
            this.switchToFoldButton();
            this.folded = false;
        },

        onEntryAdded: function () {
            if (
                this.folded ||
                (this.folded === null) ||       // turned off
                (this.folded === undefined)     // wasn't turned on
            ) {
                this.collapseAllPrevious(true);  //with effect
            }
        },

        onEntryRemoved: function () {
            if (this.folded) {
                // Last <maxEntries> elements in list should be unfolded anyway
                var numLastToShow = this.options.maxEntries;

                // we should not count the model in the waiting for delete state
                if (
                    this.$(this.view.childViewContainer + " > :last-child")
                        .hasClass('removing')
                ) {
                    numLastToShow++;
                }

                var $toShow = this.$(
                    this.view.childViewContainer +
                    " > :nth-last-child(-n+" +
                    numLastToShow +
                    ")"
                );

                $toShow.slideDown();
                this.refreshMoreCounter();
            }

            if (this.view.collection.length === this.options.maxEntries) {
                this.buttonsOff();
            }
        },

        collapseAllPrevious: function (effect) {
            if (this.view.collection.length > this.options.maxEntries) {
                // All elements below the first <maxEntries>
                var $toHide = this.$(
                    this.view.childViewContainer +
                    " > :nth-child(-n+" +
                    (this.view.collection.length - this.options.maxEntries) +
                    ")"
                );

                if (effect) {
                    $toHide.slideUp();
                } else {
                    $toHide.hide();     // quick folding when the view is showed
                }

                this.switchToUnfoldButton();
                this.folded = true;
            } else {
                this.folded = null;     // for gracefully unfolding buttons
            }
        },


        switchToFoldButton: function () {
            this.ui.foldButton.show();
            this.ui.unfoldButton.hide();
        },

        switchToUnfoldButton: function () {
            this.refreshMoreCounter();
            this.ui.foldButton.hide();

            // unfolds gracefully if buttons disabled
            if (this.folded === null) {
                this.ui.unfoldButton.slideDown();
            } else {
                this.ui.unfoldButton.show();
            }
        },

        buttonsOff: function () {
            this.ui.foldButton.slideUp();
            this.ui.unfoldButton.slideUp();
            this.folded = null;
        },

        refreshMoreCounter: function () {
            var more = this.view.collection.length - this.options.maxEntries;
            this.$(this.ui.unfoldButton).html(
                i18n.t("ui.showMore", {num: more})
            );
        }
    });

    return App.Behaviors.Collapse;
});