define([
    'app',
    'moment'
], function (
    App,
    Moment
) {
    App.ModelMixins = {
        LiveUpdating: {
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
        },

        LiveCollection: {
            onLiveUpdate: function(topic, message) {
                if (
                    (!this.searchQuery)
                    && ((!this.state) || (this.state.currentPage === 1))
                ) {
                    this.add(message.post);
                }
                this.remove(message.delete);
            }
        },
        LiveModel: {
            onLiveUpdate: function(topic, message) {
                this.update(message.patch);
                this.calls(message.calls);
            },
            update: function (patch) {
                if (patch) {
                    this.set.call(this, patch);
                    this.trigger.call(this, 'live:updated');
                }
            }
        },
        RelativeTimestampsModel: {
            attachLocalDates: function () {
                if (i18n.lng) {
                    Moment.locale(i18n.lng());
                }

                var updatedLocal = Moment.utc(this.get('updated_at'));
                this.set('updated_local', updatedLocal);
                this.set('updated_local_formatted', Moment(updatedLocal).toDate());
                this.set('updated_relative', Moment(updatedLocal).fromNow());

                var createdLocal = Moment.utc(this.get('created_at'));
                this.set('created_local', createdLocal);
                this.set('created_local_formatted', Moment(createdLocal).toDate());
                this.set('created_relative', Moment(createdLocal).fromNow());
            }
        },

        Votable: {
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
        },
        Ownership: {
            isCurrentUserOwner: function () {
                return (App.User.Current.get('id') === +this.get('user_id'));
            }
        },
        API: {
            deferOperation: function (operation, item, attrs, customOptions) {
                var defer = $.Deferred();

                var options = {
                    success: function (data, response, options) {
                        defer.resolve(data);
                    },
                    error: function (model, xhr, options) {
                        if (xhr.statusCode('500')) {
                            defer.reject({
                                error: i18n.t('ui.server-error')
                            });
                        } else {
                            var errors = JSON.parse(xhr.responseText);
                            defer.reject(errors);
                        }
                    }
                };

                // defining a defer object for custom success and error callbacks
                if (customOptions) {
                    var func;
                    if (customOptions.success) {
                        func = customOptions.success;

                        options.success = function (data, response, options) {
                            options.defer = defer;
                            func(data, response, options);
                        };

                        delete customOptions.success;
                    }

                    if (customOptions.error) {
                        func = customOptions.error;

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
        }
    };
    _.extend(App.ModelMixins.LiveCollection, App.ModelMixins.LiveUpdating);
    _.extend(App.ModelMixins.LiveModel, App.ModelMixins.LiveUpdating);

    return App.ModelMixins;
});
