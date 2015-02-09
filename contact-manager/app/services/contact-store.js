import Ember from "ember";
import Contact from 'contact-manager/models/contact';

var fakeContacts = [
  Contact.create({
    id: '1',
    firstName: "Mike",
    lastName: "Doel"
  }),
  Contact.create({
    id: '2',
    firstName: "Bob",
    lastName: "Dole"
  })
];

export default Ember.Object.extend({
  contacts: fakeContacts,

  all: function() {
    return this.get('contacts');
  },

  find: function(id) {
    return this.get('contacts').findBy('id', parseInt(id));
  }
});
