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

                    // The onConnect handler
                    function (session) {
                        // connection session attribute for collection/model
                        self.wsSession = session;
                        // Subscribing on the topic
                        session.subscribe(
                            self.liveURI,
                            function () {
                                // Context binding. Otherwise 'onLiveUpdate'
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
            },
            calls: function (calls) {
                // If there is remote call parameters
                if (calls) {
                    for (var funcName in calls) {
                        if (!calls.hasOwnProperty(funcName)) {
                            continue;
                        }
                        // Taking a function name from object
                        // Try to get a func from the current model/collection
                        var fn = this[funcName];
                        if (fn) {
                            // arg or massive of args
                            var args = calls[funcName];

                            if (typeof args !== 'array') {
                                args = [args];
                            }

                            fn.apply(this, args);
                        }
                    }
                }
            }
        };

        ModelMixins.LiveCollection = {
            onLiveUpdate: function(topic, message) {
                if (
                    (!this.searchQuery)
                    && ((!this.state) || (this.state.currentPage === 1))
                ) {
                    this.add(message.post);
                }
                this.remove(message.delete);
            }
        };
        _.extend(ModelMixins.LiveCollection, ModelMixins.LiveUpdating);

        ModelMixins.LiveModel = {
            onLiveUpdate: function(topic, message) {
                this.update(message.patch);
                this.calls(message.calls);
            },
            update: function (patch) {
                if (patch) {
                    this.set.call(this, patch);
                }
            }
        };
        _.extend(ModelMixins.LiveModel, ModelMixins.LiveUpdating);

        ModelMixins.RelativeTimestampsModel = {
            attachLocalDates: function () {
                if (i18n.lng) {
                    moment.locale(i18n.lng());
                }

                var updatedLocal = moment.utc(this.get('updated_at'));
                this.set('updated_local', updatedLocal);
                this.set('updated_local_formatted', moment(updatedLocal).toDate());
                this.set('updated_relative', moment(updatedLocal).fromNow());

                var createdLocal = moment.utc(this.get('created_at'));
                this.set('created_local', createdLocal);
                this.set('created_local_formatted', moment(createdLocal).toDate());
                this.set('created_relative', moment(createdLocal).fromNow());
            }
        };

        ModelMixins.Votable = {
            voteAdd: function (vote) {
                if (+vote.sign) {
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
                if (+vote.sign) {
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

        ModelMixins.Ownership = {
            isCurrentUserOwner: function () {
                return (App.User.Current.get('id') === this.get('user_id'));
            }
        };

        ModelMixins.API = {
            deferOperation: function (operation, item, attrs, customOptions) {
                var defer = $.Deferred();

                var options = {
                    success: function (data, response, options) {
                        defer.resolve(data);
                    },
                    error: function (model, xhr, options) {
                        var errors = JSON.parse(xhr.responseText);
                        defer.reject(errors);
                    }
                };

                // defining a defer object for custom success and error callbacks
                if (customOptions) {
                    if (customOptions.success) {
                        var func = customOptions.success;

                        options.success = function (data, response, options) {
                            options.defer = defer;
                            func(data, response, options);
                        };

                        delete customOptions.success;
                    }

                    if (customOptions.error) {
                        var func = customOptions.error;

                        options.error = function (data, response, options) {
                            options.defer = defer;
                            func(data, response, options);
                        };

                        delete customOptions.error;
                    }

                    options =_.extend(options, customOptions);
                }

                attrs = attrs || [];
                var res;

                if (operation == 'save') {
                    res = item[operation](attrs, options);
                } else {
                    res = item[operation](options);
                }

                return defer.promise();
            }
        };
    });

    return App.ModelMixins;
});
