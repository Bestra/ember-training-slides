import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    return this.modelFor('contacts').findBy('id', parseInt(params.contact_id));
  },

  afterModel: function(model) {
    if (!model) {
      this.replaceWith('contacts');
    }
  }
});
