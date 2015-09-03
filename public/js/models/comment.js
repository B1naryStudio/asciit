define([
    'app',
    'models/model-mixins'
], function(App, ModelMixins) {
    App.module('Comment', function(Comment, App, Backbone, Marionette, $, _) {
        Comment.Model = Backbone.Model.extend(
            _.extend({}, ModelMixins.RelativeTimestampsModel, {
                defaults: {
                    'text': ''
                },
                validation: {
                    text: {
                        required: true,
                        msg: i18n.t('validation.required-field')
                    }
                },
                initialize: function (options) {
                    this.urlRoot = App.prefix + '/api/v1/questions/'
                        + options.q_and_a_id
                        + '/comments';

                    this.attachLocalDates();
                    this.on('change', this.attachLocalDates);
                }
            })
        );

        Comment.Collection = Backbone.Collection.extend(
            _.extend({}, ModelMixins.LiveCollection, {
                model: Comment.Model,

                initialize: function (models, options) {
                    this.liveURI = 'entries/'
                        + options.q_and_a_id
                        + '/comments';

                    this.url = App.prefix + '/api/v1/questions/'
                        + options.q_and_a_id
                        + '/comments';

                    this.startLiveUpdating();
                }
            })
        );

        var API = ModelMixins.API;

        App.reqres.setHandler('comment:add', function (model) {
            return API.addModel(model);
        })
    });
    return App.Comment;
});
