# Ember.js Jumpstart

* One day workshop
* 50/50 lecture and coding
* Hands-on

---
# Prerequisites

* You should be pretty comfortable in javascript.
* You need a computer that can run node.js
* Install the Ember Inspector plugin for chrome or firefox

---
# Ember.js

Ember is an end-to-end solution

* Routing and URLs
* Templating
* API integration and persistence (Ember Data)
* Dependencies via node and bower
* Environment management

---
# Ember-cli (http://www.ember-cli.com/)

* Node command-line tool and development environment
* The "happy path" for making new Ember applications, blessed by the core team.
* Testing support out of the box
* Share code via addons

---
# Goals for Today

* Learn the big concepts
* Techniques for testing and debugging
* Walk away with a project
* Where to learn more

---
# Morning Overview

* Setup
* Ember Objects and Properties
* Routes
* Basic Handlebars

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
* Chrome and Firefox

---
# Ember CLI Project Structure
![Ember project structure](/slide-images/project-structure.png)

---
# Ember Concepts - an aside

* Routes, models, views, controllers
* Same words as other frameworks, different meanings
* Don't try to make an analogy to your previous experience based on what the thing is called.

---
# The Ember object model

 * _Almost_ everthing in Ember descends from Ember.Object
 * Ember.Object.extend({}) creates a subclass of Ember.Object
 * Override superclass methods like you'd expect
 * Call `_super` from inside a subclassed method.

```
var Person = Ember.Object.extend({
  attack: function(damage) { console.log ("Attack for" + damage + "damage") })
});

var Warrior = Person.extend({
  attack: function(damage) { this._super(damage + 50) }
});
```
---
# init and .on('init')
# Mixins

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

* property takes any number of dependent keys
* value is cached until one of the dependent properties changes
* changing a dependent property without using `set()` won't change the CP

---
# Array dependencies
* .property('cats') will only update if the `cats` array is replaced
* .property('cats.[]') updates if a cat is added or removed
* .property('cats.@each.name') updates if a cat is added or removed, or if a cat's name is changed

---
# computed setters
# Ember.Enumerable mixin
* Most collections, including array literals `[]`
* Big surface area, very useful!

---
# Ember.computed

* Lots of common shortcuts (http://emberjs.com/api/)
* Improves readability
* Helpers for array operations (sort, filter etc)

---
# Routing

* URL -> data -> page
* Mapping URLs to pages is an [explicit goal](http://www.confreaks.com/videos/2960-jsconfeu2013-stop-breaking-the-web)
* Ember can manage the URL with hash or the history api.
* Query parameters are also supported (more later)

---
# Defining Routes

`router.js` defines all the available routes. The router has its own DSL
for describing your app, which we'll cover in detail shortly.  The simplest DSL function is
'route'.

```
Router.map(function() {
  this.route("contacts", { path: "/contacts" });
});
```

Ember will expect us to have a Route defined at `app/routes/contacts.js` or it will
automatically generate a default one for us at runtime. Visiting `/contacts` will render
`/templates/contacts.hbs`

^
- ES6 imports

---
# Resources and Nested Routes

```
Router.map(function() {
  this.resource("contacts", { path: "/contacts" }, function() {
    this.route("edit");
  });
});
```

A **resource** can nest other routes or resources under it.
[The Guide](http://emberjs.com/guides/routing/defining-your-routes/) does just as good of a job
explaining it as I would here.

Nesting routes allows you to also nest their templates.

---
# Template Nesting

* A route's template can render its child template via {{outlet}}

---
# Route Names

```
this.route("contacts", { path: "/contacts" });
```
"contacts" will correspond to several new files we'll be creating.

* Route `app/routes/contacts.js`
* Controller `app/controllers/contacts.js`
* Template `app/templates/contacts.hbs`

If we don't make these objects ourselves,
**Ember will generate them for us at runtime**

---
# Ember's nested resources are not Rails' nested resources

# Data Flow
https://gist.github.com/Bestra/8befa3117217a4f93fb3
* A model can be a value, an object, an array, etc.
* Route provides model to controller
* Controller _decorates_ model for display in the template

---
# Contacts Route

* `model` is a _hook_ the route provides
* More on route hooks shortly.

^ Show the route code
https://gist.github.com/Bestra/8befa3117217a4f93fb3
---

# Controllers

* Ember provides Controller, ObjectController, and ArrayController
* Currently Proxies the model.
* Proxying is [on the way out](https://github.com/emberjs/rfcs/pull/15), so avoid it if possible

---

# Controllers are singletons

# TESTING
# Basic setup with ember cli
# Unit testing with moduleFor

# Common Handlebars Helpers
# Using {{bind-attr}}
# Class Name Syntax
# Rendering Lists with {{#each}}
# Basic {{input}}
# Select boxes


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
# beforeModel
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

# modelFor

# actions
# {{action "foo"}}
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

# Views
# Controllers, Components, Views
# Tempate Rendering Context
# View layouts


# observers
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
