define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.BestAnswerControls = Marionette.Behavior.extend({
        defaults: {
            controlsContainer: '.closed-controls'
        },

        onRender: function () {
            this.view.model.on('change:closed', this.onShow, this);
        },

        onShow: function () {
            // selecting clause with preventing a type collision
            if (this.isAnswerBest()) {
                this.onStatusBestShow();
                this.ui.selectAsBestButton.hide();
            } else {
                this.ui.indicatorOfBest.hide();
                this.ui.cancelBestStatusButton.hide();
            }
        },

        onOverEntry: function () {
            if (!this.isAnswerBest() && this.isOwnerOfQuestion()) {
                this.ui.selectAsBestButton.show();
            }
        },
        onOutEntry: function () {
            this.ui.selectAsBestButton.hide();
        },

        onBestSelect: function () {
            this.view.trigger('best:change', 1);
            console.log('Picked as the best');
        },
        onBestCancel: function () {
            this.view.trigger('best:change', 0);
            console.log('Canceled a selection as the best');
        },

        onBestChanged: function (newModel) {
            this.view.model.set('closed', newModel.get('closed'));
            this.onShow();
        },

        // switches to the cancel button on mouse hover the status
        onBestCancelButtonShow: function () {
            // question ownership clause
            if (this.isAnswerBest() && this.isOwnerOfQuestion()) {
                this.ui.indicatorOfBest.hide();
                this.ui.cancelBestStatusButton.show();
            }
        },

        // Shows the status of the best answer (on show or on mouse out of cancel)
        onStatusBestShow: function () {
            if (this.isAnswerBest()) {
                this.ui.indicatorOfBest.show();
                this.ui.cancelBestStatusButton.hide();
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

    return App.Behaviors.BestAnswerControls;
});