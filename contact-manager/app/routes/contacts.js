import Ember from 'ember';
export default Ember.Route.extend({
  model: function () {
    return this.get('contacts').all();
  },

  contacts: Ember.inject.service('contact-store')
});
