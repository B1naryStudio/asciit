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

        onShow: function () {
            // selecting clause with preventing a type collision
            if (this.isQuestionBest()) {
                this.onStatusBestShow();
            }
        },

        onOverEntry: function () {
            this.onBestSelectButtonShow();
        },

        onOutEntry: function () {
            this.onBestSelectButtonHide();
        },

        onBestSelect: function () {
            console.log('Picked as the best');
        },

        onBestCancel: function () {
            console.log('Canceled a selection as the best');
        },

        // shows the button to cancel a selection
        onBestCancelButtonShow: function () {
            // question ownership clause
            if (this.isQuestionOwner()) {
                this.ui.indicatorOfBest.hide();
                this.ui.cancelBestStatusButton.show();
            }
        },

        // shows the button to pick the best
        onBestSelectButtonShow: function () {
            if (this.isQuestionOwner() && !this.isQuestionBest()) {
                this.ui.selectAsBestButton.show();
            }
        },

        onBestSelectButtonHide: function () {
            this.ui.selectAsBestButton.hide();
        },

        // Shows the status of the best answer
        onStatusBestShow: function () {
            this.ui.indicatorOfBest.show();
            this.ui.cancelBestStatusButton.hide();
        },

        isQuestionOwner: function () {
            return true;
        },

        isQuestionBest: function () {
            return false;
            return this.view.model.get('closed').toString == 'true';
        }
    });

    return App.Behaviors.BestAnswerControls;
});