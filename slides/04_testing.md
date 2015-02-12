---
# TESTING

- Helpers for ember testing are framework-agnostic
- Qunit is default
- Mocha support is out too

[ember cli testing guide](http://www.ember-cli.com/#testing)
[ember testing guide](http://emberjs.com/guides/testing/)

^
- Ember CLI does most of the setup work for you.
- Unit tests and 'integration tests'
- Ember.Test provides general helpers that other packages use
- Currently adapters for qunit and mocha

---
# Unit testing

- complex property logic
- business logic

---
# Ember-Qunit Basics

- module
- moduleFor
- tests
- assertions
- qunit testing style

^
- Ember source tests are a good place to go for examples

---
Vanilla Qunit

```javascript
import Contact from "contact-manager/models/contact";
module('Unit: Contact');

test("it has a default email", function() {
  var contact = Contact.create();
  ok(true, "Ok asserts that true things are true");
  ok("Truthy thing", "Truthy things are true too");
  equal(contact.get('email'),
        "contact@example.com",
        "The default email is @example.com");

  contact.set('email', "steve@dave.biz");
  equal(contact.get('email'),
        "steve@dave.biz",
        "It can change the email");
});

```
---
# Testing Ember Objects

```
import { moduleFor, test } from "ember-qunit";

moduleFor('route:contacts', "Unit: ContactsRoute");

test("The route can be created", function() {
  var route = this.subject(); //instantiates the route
  ok(route, "The route exists");
});

```
?????????
---
```
moduleFor('route:contacts', "Unit: ContactsRoute");
```
- Finds the ContactsRoute as it's defined in your app

```
route:index --> IndexRoute
controller:contacts/edit  --> ContactsEditController
services:contact-store --> ContactStoreService

component:
template:
helper:
view:
model: (only models created with Ember Data)

```

---
```
test("It passes", function() {

  this.subject();
});
```
`this.subject()` will instantiate the class you specified in `moduleFor()`

---
# Integration Testing
- startApp()
- test helpers

---
# TESTING components
# component actions
# using the integration helpers to test a rendered component

