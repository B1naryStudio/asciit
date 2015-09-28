define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.ClosedQuestionIndicator = Marionette.Behavior.extend({
        onShow: function () {
            // selecting clause with preventing a type collision
            if (this.isQuestionClosed()) {
                this.ui.closedIndicator.show();
            } else {
                this.ui.closedIndicator.hide();
            }
        },

        onBestAnswerChanged: function (newModel) {
            this.view.model.set('closed', newModel.get('closed'));
            this.onShow();
        },

        isQuestionClosed: function () {
            return (+this.view.model.get('closed') == true);
        }
    });

    return App.Behaviors.ClosedQuestionIndicator;
});