# Ember.js Jumpstart

- One day workshop
- 50/50 lecture and coding
- Hands-on

---
# Prerequisites

- You should be pretty comfortable in javascript.
- You need a computer that can run node.js
- Install the Ember Inspector plugin for chrome or firefox

---
# Ember.js

Ember is an end-to-end solution

- Routing and URLs
- Templating
- API integration and persistence (Ember Data)
- Dependencies via node and bower
- Environment management

---
# Ember-cli (http://www.ember-cli.com/)

- Node command-line tool and development environment
- The "happy path" for making new Ember applications, blessed by the core team.
- Testing support out of the box
- Share code via addons

---
# Goals for Today

^
# big topic
-  Learn the big concepts
-  Techniques for testing and debugging
-  Walk away with a project
-  Where to learn more

---
# Morning Overview

- Setup
- Ember Objects and Properties
- Routes
- Basic Handlebars

---
# Our Project

We're going to make a contact list application.  It won't be too flashy but it will give us a chance
to show off the key strengths and weaknesses of Ember.

---
# Hello World!

```
npm install -g bower
npm install -g ember-cli@0.1.7
ember new contact-manager
cd contact-manager
```

cd into your new app and run it with `ember serve`

![Hello World](/slide-images/hello.png)

---
# Ember inspector
- Chrome and Firefox

---
# Ember CLI Project Structure
![Ember project structure](/slide-images/project-structure.png)

---
# Ember Concepts

## MVC != MVC

^
- Routes, models, views, controllers
- Same words as other frameworks, different meanings
- Don't try to make an analogy to your previous experience based on what the thing is called.

---
# The Ember object model

```javascript
var Person = Ember.Object.extend({
  attack: function(damage) { console.log ("Attack for" + damage + "damage") })
});

var Warrior = Person.extend({
  attack: function(damage) { this._super(damage + 50) }
});
```

^
 - _Almost_ everthing in Ember descends from Ember.Object
 - Ember.Object.extend({}) creates a subclass of Ember.Object
 - Override superclass methods like you'd expect
 - Call `_super` from inside a subclassed method.

---
# Object initialization behavior

---
# init
```javascript
var Person = Ember.Object.extend({
  init: function() {
    console.log("I'm a person");
    this._super();
  }
})

Person.create();
// console: "I'm a person"
```

^
- called when the object is created
- call this._super() on anything other than Ember.Object

---
# .on('init')

```javascript
var Person = Ember.Object.extend({
  sayHi: function() {
    console.log("I'm a person");
  }.on('init')

  setCats: function() {
    this.set('cats', ["fluffy", "meekins"]);
  }.on('init')
})

var dude = Person.create();
// console: "I'm a person"
dude.get('cats') // ["fluffy", "meekins"]
```

^
- Generally better than overriding `init`
- never overrides default init behavior
- init event can trigger arbitrary number of actions

---
# Initializing references
```javascript
var Person = Ember.Object.extend({
  cats: [] // every instance of Person will have the same cats
})
```
^
- Person will be the prototype for any instance
- Easy to accidentally mutate someone else's array

---
# Mixins

```javascript
var hasCats = Ember.Mixin.create({
  cats: null,
  setCats: function() {
    this.set('cats', []);
  }.on('init'),
  catNames: Ember.computed.mapBy('cats.name')
})

var CatPerson = Ember.Object.create(hasCats),
dude = CatPerson.create();
```

^
- Multiple mixins applied in order
- Mixins functions can be overridden with this._super()
- Mixins more common than inheritance in Ember
- Enumerable, ObjectProxy, etc.
---
# Getters and setters

```
var foo = Ember.Object.create({name: "Dude"});
foo.get('name'); // "Dude"
foo.set('name', "Sweet")
```
Why do we need these?

---
# Computed Properties

```
var Person = Ember.Object.extend({
  firstName: "Some",
  lastName: "Guy",
  fullName: function() {
    return this.get('firstName') + " " + this.get('lastName');
}.property('firstName', 'lastName')
```

^
- property takes any number of dependent keys
- value is cached until one of the dependent properties changes
- changing a dependent property without using `set()` won't change the CP

---
# Alternate syntax

```javascript
fullName: Ember.computed('firstName, 'lastName', function() {
  return this.get('firstName') + " " + this.get('lastName');
})
```

---
# Array dependencies

- .property('cats') will only update if the `cats` array is replaced
- .property('cats.[]') updates if a cat is added or removed
- .property('cats.@each.name') updates if a cat is added or removed, or if a cat's name is changed

---
# computed setters
Current:

```javascript
fullName: Ember.computed('firstName, 'lastName', function(key, value) {
  if (arguments.length > 1) {
    var names = value.split(' ');
    this.set('firstName', names[0]);
    this.set('lastName', names[1]);
  }
  return this.get('firstName') + " " + this.get('lastName');
})
```

With the `new-computed-syntax` flag

```javascript
fullName: Ember.computed('firstName, 'lastName', {
  get: function(key) {
    return this.get('firstName') + " " + this.get('lastName');
  },
  set: function(key, value) {
    var names = value.split(' ');
    this.set('firstName', names[0]);
    this.set('lastName', names[1]);
    return value;
  }
})
```

^
- Currently done by checking the number of args in the getter function
- New method part of the 2.0 rfc
---
# Ember.Enumerable mixin
- Most collections, including array literals `[]`
- Big surface area, very useful!

---
# Ember.computed

- Lots of common shortcuts (http://emberjs.com/api/)
- Improves readability
- Helpers for array operations (sort, filter etc)

---
# Routing
## URL = Application State

^
- Mapping URLs to pages is an [explicit goal](http://www.confreaks.com/videos/2960-jsconfeu2013-stop-breaking-the-web)
- URLs are shareable
- Ember can manage the URL with hash or the history api.
- Query parameters are also supported (more later)

---
# Defining Routes

```
// router.js

Router.map(function() {
  this.route("contacts", { path: "/contacts" });
});
```
^
- ES6 imports
- Ember will expect us to have a Route defined at `app/routes/contacts.js` or it will
automatically generate a default one for us at runtime. Visiting `/contacts` will render
`/templates/contacts.hbs`

---
# Route definitions and names

```
this.route("contacts", { path: "/contacts" });
```

- ContactsRoute `app/routes/contacts.js`
- ContactsController `app/controllers/contacts.js`
- Template `app/templates/contacts.hbs`

^
If we don't make these objects ourselves,
**Ember will generate them for us at runtime**

---
# Resources and Nested Routes

```
Router.map(function() {
  this.resource("contacts", { path: "/contacts" }, function() {
    this.route("edit"); // contacts.edit route
    this.route("add"); // contacts.add route
    //contacts.index route is auto-generated
  });
});
```

---
# Route nesting = template nesting

---
# Template Nesting

- A route's template can have an {{outlet}} for its children

^
- Ember's nested resources are not Rails' nested resources
- Nested resources  == master/detail, navbar

---
# Resource makes a common parent route/template for its children

^
- Show how via contacts

---
# Data Flow
- A model can be a value, an object, an array, etc.
- Route provides model to controller
- Controller _decorates_ model for display in the template

---
# EXAMPLE Contacts Route

```javascript
// app/routes/contacts.js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {name: "Bob Dole"}
  },
});
```
^
- `model` is a _hook_ the route provides
- More on route hooks shortly.

---
# Controllers

- Ember provides Controller, ObjectController, and ArrayController
- ObjectController and ArrayController proxy their models

^
- Proxying is [on the way out](https://github.com/emberjs/rfcs/pull/15), so avoid it if possible

---
# Controllers are singletons

^
- Controllers stick around after being instantiated.

---

# TESTING
# Basic setup with ember cli
# Unit testing with moduleFor

# Common Handlebars Helpers
# Using {{bind-attr}}
# Class Name Syntax
# Rendering Lists with {{#each}}
# Basic {{input}}
# Select boxes

---
#Dynamic Route Segments

```
this.route("show", { path: "/:id });
```
The `id` parameter will be available to the `show` route in the example above.

Dynamic segments are underscored.
```
this.route("show", { path: "/:long_param" });
```

---
# The Route Lifecycle
 ## The 5 (or so) hooks of the apocalypse:
 - beforeModel
 - model
 - (serialize)
 - afterModel
 - (redirect)
 - setupController
 - renderTemplate
---
# beforeModel

```
beforeModel: function(transition) {}
```

- Abort or redirect if needed

---
# model
# serialize and slugging
# afterModel
# The Model Hooks Wait for Promises
# setupController
# renderTemplate

---
# Routes are run sequentially

```
URL                  Routes Run

/                    application -> index
/contacts            application -> contacts -> contacts.index
/contacts/edit       application -> contacts -> contacts.edit
```
---

# {{link-to}} and transitions
# link-to and transitionTo work the same
# transition parameters
# keeping the model hook from running
# aborting transitions

# modelFor and controllerFor

# actions
# {{action "foo"}}
# action bubbling chain
# preventing bubbling by returning false
# preventing bubbling with {{action bubbles=false}}
# data down actions up

# route loading substates

# TESTING integration testing using module() and startApp()

# Query Params are a controller thing

# Components
# component naming conventions
# components are isolated
# passing data in
# actions
# single action
# named actions
# component block form
# block params
# component block form is super useful

# component lifecycle
# binding classes
# changing component element
# didInsertElement
# jquery with components
# changing application state in components -dont if possible

# TESTING components
# component actions
# using the integration helpers to test a rendered component

# services
# Ember.inject.service()
# initializers
# the application container

# Views
# Controllers, Components, Views
# Tempate Rendering Context
# View layouts


# observers
# observers are synchronous
# observers and computed properties
# Ember.run

# How Ember avoids DOM thrash
# A brief look at the run loop
# Ember.run.once
# ArrayComputed properties
# Rerendering lists

# Debugging
# Configuring logging
# Using the stack trace
# effective breakpoints
# {{debugger}} to inspect template context

==============

# Ember Data
# Why not until now?
# The pieces

==============

# Feature flags
# Reading the source

# antipattern: doing too much work init


