import Ember from "ember";
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Ember.Route.extend({
  model: function(params) {
    return this.modelFor('contacts').findBy('id', params.contact_id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('model', BufferedProxy.create({
      content: model
    }));
  },

  actions: {
    save: function(proxy) {
      proxy.applyBufferedChanges();
      this.transitionTo('contacts.show', proxy.get('content'));
    }
  }
});
