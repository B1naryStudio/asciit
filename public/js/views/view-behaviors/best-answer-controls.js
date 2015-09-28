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

        //onRender: function () {
        //    this.view.model.on('change:closed', this.onShow, this);
        //},

        onShow: function () {
            // selecting clause with preventing a type collision
            if (this.isAnswerBest()) {
                this.onStatusBestShow();
            } else {
                this.onStatusBestHide();
            }
        },

        onOverEntry: function () {
            this.showBestSelectButton();
        },
        onOutEntry: function () {
            this.hideBestSelectButton();
        },

        onBestSelect: function () {
            this.view.trigger('best:change', true);
            console.log('Picked as the best');
        },
        onBestCancel: function () {
            this.view.trigger('best:change', false);
            console.log('Canceled a selection as the best');
        },

        onBestChanged: function (newModel) {
            this.view.model.set('closed', newModel.get('closed'));
            this.view.render();
            this.onShow();
        },

        // shows the button to cancel a selection
        onBestCancelButtonShow: function () {
            // question ownership clause
            if (this.isOwnerOfQuestion()) {
                this.ui.indicatorOfBest.hide();
                this.ui.cancelBestStatusButton.show();
            }
        },

        // shows the button to pick the best
        showBestSelectButton: function () {
            if (!this.isAnswerBest() && this.isOwnerOfQuestion()) {
                this.ui.selectAsBestButton.show();
            }
        },

        hideBestSelectButton: function () {
            this.ui.selectAsBestButton.hide();
        },

        // Shows the status of the best answer
        onStatusBestShow: function () {
            this.ui.indicatorOfBest.show();
            this.ui.cancelBestStatusButton.hide();
        },
        onStatusBestHide: function () {
            this.ui.indicatorOfBest.hide();
        },

        isOwnerOfQuestion: function () {
            return this.view.options.questionOwnerId ==
                App.User.Current.get('id');
        },
        isAnswerBest: function () {
            return (+this.view.model.get('closed') == true);
        }
    });

    return App.Behaviors.BestAnswerControls;
});