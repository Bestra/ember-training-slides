import Ember from "ember";
import Contact from 'contact-manager/models/contact';

export default Ember.Route.extend({
  model: function() {
    return Contact.create();
  },

  actions: {
    save: function(model) {
      var contacts = this.modelFor('contacts');
      contacts.addObject(model.set('id', contacts.length+1));
      this.transitionTo('contacts.show', model);
    },

    cancel: function() {
      this.transitionTo('contacts');
    }
  }
});
