define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.BestAnswer = Marionette.Behavior.extend({
        defaults: {
            controlsContainer: '.closed-controls'
        },

        onRender: function () {
            var self = this;

            // live:updated - model was changed via websockets
            this.view.model.on('live:updated', function () {
                self.onShow();

                // best:showed - A new data was showed. Needs a handling for
                //               persistance.
                self.view.trigger('best:showed', self.view.model);
            });

            // best:cleared - model had an old best-value which was corrected
            //                for the data persistency.
            this.view.model.on('best:cleared', this.onShow, this);
        },

        onShow: function () {
            // selecting clause with preventing a type collision
            if (this.isAnswerBest()) {
                this.$el.addClass('best');
                this.onStatusBestShow();
                this.$(this.ui.selectAsBestButton).hide();
            } else {
                this.$el.removeClass('best');
                this.$(this.ui.indicatorOfBest).hide();
                this.$(this.ui.cancelBestStatusButton).hide();
            }
        },

        onOverEntry: function () {
            if (!this.isAnswerBest() && this.isOwnerOfQuestion()) {
                this.$(this.ui.selectAsBestButton).show();
            }
        },
        onOutEntry: function () {
            this.$(this.ui.selectAsBestButton).hide();
        },

        onBestSelect: function () {
            this.view.trigger('best:change', 1);
        },
        onBestCancel: function () {
            this.view.trigger('best:change', 0);
        },

        // best:changed - model has been updated by query. Data of UI is not
        //                persistent yet.
        onBestChanged: function (newModel) {
            this.view.model.set('closed', newModel.get('closed'));
            this.onShow();
            // best:showed - A new data was showed. Needs a handling for
            //               persistance.
            this.view.trigger('best:showed', this.view.model);
        },

        // switches to the cancel button on mouse hover the status
        onBestCancelButtonShow: function () {
            // question ownership clause
            if (this.isAnswerBest() && this.isOwnerOfQuestion()) {
                this.$(this.ui.indicatorOfBest).hide();
                this.$(this.ui.cancelBestStatusButton).show();
            }
        },

        // Shows the status of the best answer (on show or on mouse out of cancel)
        onStatusBestShow: function () {
            if (this.isAnswerBest()) {
                this.$(this.ui.indicatorOfBest).show();
                this.$(this.ui.cancelBestStatusButton).hide();
            }
        },

        isOwnerOfQuestion: function () {
            return this.view.options.questionOwnerId ==
                App.User.Current.get('id');
        },
        isAnswerBest: function () {
            return (+this.view.model.get('closed') == 1);
        }
    });

    return App.Behaviors.BestAnswer;
});