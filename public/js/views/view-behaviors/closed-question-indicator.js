define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.ClosedQuestionIndicator = Marionette.Behavior.extend({
        onRender: function () {
            this.view.model.on('live:updated', this.onShow, this);
        },

        onShow: function () {
            // selecting clause with preventing a type collision
            if (this.isQuestionClosed()) {
                this.$(this.ui.closedIndicator).show();
            } else {
                this.$(this.ui.closedIndicator).hide();
            }
        },

        onBestAnswerChanged: function (newModel) {
            this.view.model.set('closed', newModel.get('closed'));
            this.onShow();
        },

        isQuestionClosed: function () {
            return (+this.view.model.get('closed') == 1);
        }
    });

    return App.Behaviors.ClosedQuestionIndicator;
});