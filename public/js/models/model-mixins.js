define(['app', 'moment'], function(App, moment) {
    App.module('ModelMixins', function(ModelMixins, App, Backbone, Marionette, $, _) {
        ModelMixins.LiveCollection = {
            startLiveUpdating: function () {
                var self = this;

                ab.connect(
                    // The WebSocket URI of the WAMP server
                    'ws://' + window.location.hostname + App.prefix + ':9090/',

                    // The onconnect handler
                    function (session) {
                        // Subscribe on the topic
                        session.subscribe(
                            self.liveURI,
                            function (topic, model) {
                                self.add(model);
                            }
                        );
                    },

                    // The onhangup handler
                    function (code, reason, detail) {
                        // WAMP session closed here ..
                    },

                    // The session options
                    {
                        'maxRetries': 60,
                        'retryDelay': 2000
                    }
                );
            }
        };

        ModelMixins.RelativeTimestampsModel = {
            attachLocalDates: function () {
                var updatedRelative = moment.utc(this.get('updated_at')).toDate();
                this.set('updated_relative', moment(updatedRelative).fromNow());

                var createdRelative = moment.utc(this.get('created_at')).toDate();
                this.set('created_relative', moment(createdRelative).fromNow());
            }
        };
    });

    return App.ModelMixins;
});
