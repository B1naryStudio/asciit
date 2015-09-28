define([
    'app',
    'marionette'
], function (
    App,
    Marionette
) {
    App.Behaviors.ClosedQuestionIndicator = Marionette.Behavior.extend({
        defaults: {
            controlsContainer: '.closed-controls'
        },

        onShow: function () {
            // selecting clause with preventing a type collision
            if (this.isQuestionBest()) {
                this.showClosedStatus();
            }
        },

        isQuestionBest: function () {
            return (+this.view.model.get('closed') == true);
        },

        showClosedStatus: function () {
            this.ui.closedIndicator.show();
        }
    });

    return App.Behaviors.ClosedQuestionIndicator;
});