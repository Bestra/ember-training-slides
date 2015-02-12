import Ember from 'ember';
import contactList from 'contact-manager/utils/sample-contacts';
export default Ember.Route.extend({
  model: function() {
    return contactList;
  },

  redirect: function() {
    // this.transitionTo('contacts.show', 1);
  },
});
