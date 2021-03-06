define([
    'app',
    'backbone',
    'models/model-mixins'
], function (
    App,
    Backbone,
    ModelMixins
) {
    App.Comment.Models.Model = Backbone.Model.extend(
        _.extend(
            {},
            ModelMixins.RelativeTimestampsModel,
            ModelMixins.Ownership,
            ModelMixins.LiveModel,
            {
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
                    if (this.id) {
                        this.liveURI = 'comments/' + this.id;
                        this.startLiveUpdating();
                    }

                    this.attachLocalDates();
                    this.on('change', this.attachLocalDates);
                }
            }
        )
    );

    App.Comment.Models.Collection = Backbone.Collection.extend(
        _.extend({}, ModelMixins.LiveCollection, {
            model: App.Comment.Models.Model,

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
        return API.deferOperation('save', model);
    });

    App.reqres.setHandler('comment:update', function (model) {
        return API.deferOperation('save', model);
    });

    App.reqres.setHandler('comment:delete', function (model) {
        return API.deferOperation('destroy', model, [], {
            wait: true
        });
    });

    return App.Comment.Models;
});
