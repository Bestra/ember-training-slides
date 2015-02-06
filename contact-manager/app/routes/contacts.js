import Ember from 'ember';
import Contact from 'contact-manager/models/contact';

var fakeModel = [
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

export default Ember.Route.extend({
  model: function () {
    return fakeModel;
  },
});
