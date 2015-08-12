define(['app'], function(App) {
    App.module('Vote', function(Vote, App, Backbone, Marionette, $, _) {
        Vote.Model = Backbone.Model.extend({
            urlRoot: App.prefix + '/api/v1/votes',
            defaults: {
                'sign': 1
            }
        });

        Vote.Collection = Backbone.Collection.extend({
            model: Vote.Model,
            url: App.prefix + '/api/v1/votes'
        });

        var API = {
            addVote: function (model) {
                var defer = $.Deferred();

                if (!model.save([], {
                        wait: true,
                        success: function () {
                            defer.resolve(model);
                        },
                        error: function (model, xhr, options) {
                            var errors = JSON.parse(xhr.responseText);
                            defer.reject(errors);
                            console.log(errors);
                        }
                    })) {
                    defer.reject({'description': 'Server error, voting is impossible.'});
                }

                return defer.promise();
            },
            cancelVote: function (model) {
                var defer = $.Deferred();

                if (!model.destroy({
                        wait: true,
                        success: function () {
                            defer.resolve(model);
                        },
                        error: function (model, xhr, options) {
                            var errors = JSON.parse(xhr.responseText);
                            defer.reject(errors);
                            console.log(errors);
                        }
                    })) {
                    defer.reject({'description': 'Server error, unvoting is impossible.'});
                }

                return defer.promise();
            }
        };
        App.reqres.setHandler('vote:add', function (model) {
            return API.addVote(model);
        });
        App.reqres.setHandler('vote:cancel', function (model) {
            return API.cancelVote(model);
        });
    });

    return App.Vote;
});
