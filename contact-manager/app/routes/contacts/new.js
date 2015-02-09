import Ember from "ember";
import Contact from 'contact-manager/models/contact';

export default Ember.Route.extend({
  model: function() {
    return Contact.create();
  },

  contacts: Ember.inject.service('contact-store'),

  actions: {
    save: function(model) {
      var contacts = this.get('contacts').all();
      contacts.addObject(model.set('id', contacts.length+1));
      this.transitionTo('contacts.show', model);
    },

    cancel: function(model) {
      this.transitionTo('contacts');
    }
  }
});
