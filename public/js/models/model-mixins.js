define(['app', 'moment'], function(App, moment) {
    App.module('ModelMixins', function(ModelMixins, App, Backbone, Marionette, $, _) {
        ModelMixins.LiveUpdating = {
            startLiveUpdating: function () {
                var self = this;

                ab.connect(
                    // The WebSocket URI of the WAMP server
                    'ws://' + window.location.hostname
                            + ':'
                            + App.websocketPort
                            + App.prefix,

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
            onLiveUpdate: function(topic, message) {
                this.add(message.post);
            }
        };
        _.extend(ModelMixins.LiveCollection, ModelMixins.LiveUpdating);

        ModelMixins.LiveModel = {
            onLiveUpdate: function(topic, message) {
                // If there is remote call parameters
                if (message.calls) {
                    for (var funcName in message.calls) {
                        // Taking a function name from object
                        // Try to get a func from the current model/collection
                        var fn = this[funcName];
                        if (fn) {
                            // arg or massive of args
                            var args = message.calls[funcName];

                            if (typeof args !== 'array') {
                                args = [args];
                            }

                            fn.apply(this, args);
                        }
                    }
                }
            }
        };
        _.extend(ModelMixins.LiveModel, ModelMixins.LiveUpdating);

        ModelMixins.RelativeTimestampsModel = {
            attachLocalDates: function () {
                var updatedLocal = moment.utc(this.get('updated_at')).toDate();
                this.set('updated_local', updatedLocal);
                this.set('updated_relative', moment(updatedLocal).fromNow());

                var createdLocal = moment.utc(this.get('created_at')).toDate();
                this.set('created_local', updatedLocal);
                this.set('created_relative', moment(createdLocal).fromNow());
            }
        };

        ModelMixins.Votable = {
            voteAdd: function (vote) {
                if (vote.sign) {
                    this.set(
                        'vote_likes',
                        this.get('vote_likes') + 1
                    );
                } else {
                    this.set(
                        'vote_dislikes',
                        this.get('vote_dislikes') + 1
                    );
                }

                if (vote.user_id == App.User.Current.get('id')) {
                    this.set('vote', vote);                        }

                this.calcVoteValue();
            },
            voteDelete: function (vote) {
                if (vote.sign) {
                    this.set(
                        'vote_likes',
                        this.get('vote_likes') - 1
                    );
                } else {
                    this.set(
                        'vote_dislikes',
                        this.get('vote_dislikes') - 1
                    );
                }

                if (vote.user_id == App.User.Current.get('id')) {
                    this.set('vote', null);
                }

                this.calcVoteValue();
            },
            calcVoteValue: function () {
                this.set(
                    'vote_value',
                    this.get('vote_likes') - this.get('vote_dislikes')
                );
            }
        };
    });

    return App.ModelMixins;
});
