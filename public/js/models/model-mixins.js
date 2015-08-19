define(['app', 'moment'], function(App, moment) {
    App.module('ModelMixins', function(ModelMixins, App, Backbone, Marionette, $, _) {
        ModelMixins.LiveUpdating = {
            startLiveUpdating: function () {
                var self = this;

                ab.connect(
                    // The WebSocket URI of the WAMP server
                    'ws://' + window.location.hostname + App.prefix + ':9090/',

                    // The onconnect handler
                    function (session) {
                        // connection session attribute for collection/model
                        self.wsSession = session;
                        // Subscribing on the topic
                        session.subscribe(
                            self.liveURI,
                            function () {
                                // Context binding. Otherwise 'onliveUpdate'
                                // will see a window as a this
                                self.onLiveUpdate.apply(self, arguments);
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
        },

        ModelMixins.LiveCollection = {
            onLiveUpdate: function(topic, model) {
                this.add(model);
            }
        };
        _.extend(ModelMixins.LiveCollection, ModelMixins.LiveUpdating);

        ModelMixins.LiveModel = {
            onLiveUpdate: function(topic, message) {
                // If there is remote call parameters
                if (message.calls) {
                    for (var i in message.calls) {
                        // Taking a function name from object
                        var funcName = message.calls[i];

                        // Try to get a func from the current model/collection
                        var fn = this[funcName];
                        if (fn) {
                            fn.call(this);
                        }
                    }
                }
            }
        };
        _.extend(ModelMixins.LiveModel, ModelMixins.LiveUpdating);

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
