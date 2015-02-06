import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("contacts", { path: "/contacts" }, function() {
    this.route('edit', {path: ":contact_id/edit"});
    this.route('show', {path: ":contact_id"});
    this.route('new');
  });
});

export default Router;
