import Ember from 'ember';


export default Ember.Component.extend({
  value: null,

  shouldValidateEmail: Ember.computed.equal('validator', 'email'),

  hasValidEmail: Ember.computed.match('value', /^.+@.+\..+$/),

  errorText: function() {
    if (this.get('shouldValidateEmail') && !this.get('hasValidEmail')) {
      return "Email isn't valid";
    } else {
      return null;
    }
  }.property('value')
});
