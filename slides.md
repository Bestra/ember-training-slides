# Ember.js Jumpstart

- One day workshop
- 50/50 lecture and coding
- Hands-on

---
# Prerequisites

- You should be pretty comfortable in javascript.
- Node.js installed
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

```sh
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
# Pods
http://www.ember-cli.com/#pod-structure

---
# Ember Concepts

## MVC != MVC

^
- Routes, models, views, controllers
- Same words as other frameworks, different meanings
- Don't try to make an analogy to your previous experience based on what the thing is called.

---
# Embering vs. Javascripting

* Happy path is all Ember
* Anything else needs good javascript

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
- Mainly a problem with superclasses and mixins

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

```javascript
var foo = Ember.Object.create({name: "Dude"});
foo.get('name'); // "Dude"
foo.set('name', "Sweet")
```
## setProperties
## incrementProperty

---
# Chaining

```javascript
var walter = Ember.Object.create({name: "Walter"}),
var donny = Ember.Object.create({name: "Donny", friend: a})

donny.get('friend.name'); // => "Walter"
donny.get('friend.rollsOnShabbos') //=> undefined
donny.get('notThere.rollsOnShabbos') //=> undefined
```

^
- Using get will keep you from getting "Cannot read 'foo' of undefined"
- That's a good thing and a bad thing

---
# POJOs

```javascript
var a = {foo: 'bar'};
a.get('foo') // explodes
a.set('dude', 'sweet') // also explodes

Ember.get(a, 'foo');
Ember.set(foo, 'dude', 'sweet');
```

^
- Ember.get and Ember.set will work on Ember objects and POJOs

---
Why do we need getters and setters?

---
# Computed Properties

```javascript
var Person = Ember.Object.extend({
  firstName: "Some",
  lastName: "Guy",

  fullName: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName'),

  //always updates
  eagerProperty: function() {
    return window.location.origin
  }.property().volatile(),

  //alternate syntax
  otherFullName: Ember.computed('firstName, 'lastName', function() {
    return this.get('firstName') + " " + this.get('lastName');
  })
})
```
^
- property takes any number of dependent keys
- value is cached until one of the dependent properties changes
- changing a dependent property without using `set()` won't change the CP
- getters and setters eliminate the need for dirty checkinga ala angular

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
# Arrays

[reference](http://emberjs.com/api/classes/Ember.Array.html)

```javascript
var a = [1,2,3];

a.get('length')
a.get('firstObject')
a.objectAt(1)
a.indexOf(3)

var theDude = {name: "Lebowski"};

var people = [{name: "Lebowski"}, {name: "Bunny"}];

people.contains(theDude);

people.addObject(theDude);
people.addObject(theDude);

```
^
- Finding in a collection is all done by reference
- Always use the getters for access.
- addObject vs. pushObject

---
# Collections and Ember.Enumerable
- common mixin for all collections
- included on native arrays by default, including literals `[]`
- Big surface area, very useful!

map
mapBy
find
findBy
invoke
isAny
isEvery

---
# Ember.computed

- [Lots of common shortcuts](http://emberjs.com/api/#method_computed_alias)
- Improves readability
- Helpers for array operations (sort, filter etc)
- manage dependent keys automatically
---
# Motivating example - meals

```javascript

var Ingredient = Ember.Object.extend({
  hasFish: false
  calories: 0,
  name: ""
});

var Meal = Ember.Object.extend({
  //passed in properties
  ingredients: null, //an array

  //just for illustration
  initIngredients: function() {
    if (!this.get('ingredients')) {
      this.set('ingredients', []); //avoid prototype problems but don't override passed in values
    }
  }.on('init')

  //computed properties
  ingredientCalories: Ember.computed.mapBy('ingredients', 'calories'),
  totalCalories: Ember.computed.sum('ingredientCalories'),

  isUnderCalories: Ember.computed.lt('totalCalories', 500),

  fishIngredients: Ember.computed.filterBy('ingredients', 'hasFish'),
  noFish: Ember.computed.empty('fishIngredients'),

  isValid: Ember.computed.and('isUnderCalories', 'noFish'),

  addIngredient: function(ingredient) {
    this.get('ingredients').addObject(ingredient);
  }

});

var lunch = Meal.create();
var chz = Ingredient.create({name: "Cheese", calories: 50});
var lettuce = Ingredient.create({name: "lettuce", calories: 20});
lunch.get('ingredients').addObject(chz) //this kinda stinks
lunch.addIngredient(lettuce) // better;

```
^
- too many computed properties (CPs) can _reduce_ readability on occasion.

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

```javascript
// router.js

Router.map(function() {
  this.route("contacts", { path: "/contacts" });
});
```

* [Ember Routing Guide](http://emberjs.com/guides/routing/defining-your-routes/#toc_resources)

^
- ES6 imports
- Ember will expect us to have a Route defined at `app/routes/contacts.js` or it will
automatically generate a default one for us at runtime. Visiting `/contacts` will render
`/templates/contacts.hbs`

---
# Route definitions and names

```javascript
this.route("contacts", { path: "/contacts" });
```

- ContactsRoute `app/routes/contacts.js`
- ContactsController `app/controllers/contacts.js`
- Template `app/templates/contacts.hbs`

^
If we don't make these objects ourselves,
**Ember will generate them for us at runtime**

---
#Dynamic Route Segments

```javascript
this.route("show", { path: "/:id });
```

The `id` parameter will be available to the `show` route in the example above.

Dynamic segments are underscored.
```javascript
this.route("show", { path: "/:long_param" });
```

---
# Nested routes and nested resources

```javascript
Router.map(function() {
  this.resource("contacts", { path: "/contacts" }, function() {
    this.route("show", {path: ":contact_id"}); // contacts.show route
    this.route("edit", {path: ":contact_id"}); // contacts.edit route
    this.route("new"); // contacts.new route

    this.resource("export") // export route

    //contacts.index route is auto-generated
  });
});
```
^
- nested resources will reset their namespace
- routes can specify a namespace directly if they want

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
- 'model' is aliased to 'content'

^
- Proxying is [on the way out](https://github.com/emberjs/rfcs/pull/15), so avoid it if possible

---
# Controllers are singletons

^
- Controllers stick around after being instantiated.

---
# Proxies

```javascript
var proxy = Ember.ObjectProxy.create();
proxy.set('content', {foo: "bar"});
proxy.get('foo');

proxy.set('whatever', "you want");
proxy.get('anything');

^
- The proxy delegates gets and sets to its content if they don't exist on the proxy
- Proxies blow up if an undefined prop gets set (one not defined on the prototype)
- Proxies also blow up when getting an undefined prop instead of just returning undefined

```
---
# TESTING
# Basic setup with ember cli
# Unit testing with moduleFor

---
# Templates

---
# Handlebars

- Mustache on steriods
- Ember handlebars is Handlebars on HGH
^
- Ember has some helpers that are specific
- Vanilla handlebars uses some helpers that never show up in real Ember code
---
# {{debugger}}

## Demo
^
- Stops you in the middle of rendering
- Helpful comments in situ
---
# the rendering context

- Controller or Component

context.foo --> {{foo}}

---
# comments with {{!-- }}

^
- html comments will either be rendered or blow up your template
---
# Using {{bind-attr}}

```
<div class={{active}}> //no good yet.  Coming soon!
<div {{bind-attr class=active}}>
<div {{bind-attr class='active'}}> // stil binds to the context.active

<div {{bind-attr class=true}}> //wont work
```

- bind-attr with booleans adds or removes the attr.
```
hbs:
<button {{bind-attr disabled=isDisabled}}></button>

html:
<button disabled> //context.isDisabled is truthy
<button> //context.isDisabled is truthy
```

---
# Class Name Syntax
{{bind-attr class="..."}}

```
class="..."          bound value       class output
==============================================
"activity"              "is-active"       "is-active"

"isActive"              true              "is-active"
"isActive"              false              ""

"isActive:active"       true              "active"
"isActive:active"       false             ""

"isActive:active:lazy"  true              "active"
"isActive:active:lazy"  false             "lazy"

"isActive::lazy"        true              ""
"isActive::lazy"        false             "lazy"

":wont-change"          (not bound)       "wont-change"

```

"isActive:active :wont-change hidden"

^
- string bindings work like normal
- booleans property names will get dasherized
- you can bind multiple classes
---
# {{#if}} {{else}} and {{#unless}}
```
{{#if foo}}
  stuff
{{else}}
  no stuff
{{/foo}}

// {{#unless}} is what you'd expect
```

^
- Block helpers start with #, end with /
- Wrap content
- 'logicless' means this is as good as it gets

---
# Rendering Lists with {{#each}}
# {{#link-to}} and {{link-to}}
# Basic {{input}}
# Select boxes

---
# {{partial}}

^
- Partial doesn't take any locals
- Ember cli expects a normal path name
- non-cli expects the partial to start with '_' ala Rails
- Use a component as a partial instead

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

```javascript
beforeModel: function(transition) {}
```

^
- Abort or redirect if needed
- Often when making authorization decisions

---
# model
```javascript
model: function(params) {}
```

^
- Dynamic segment content is inserted into `params`
- Most common place to make an ajax request

---
# serialize
```javascript
serialize: function(model) {
  return "This-slug-goes-in-the-url";
}
```

- Default method returns `model.id`

---
# afterModel
```javascript
afterModel: function(model, transition) {}
```

---
# The Model Hooks Wait for Promises

---
# redirect
- redirect vs. afterModel

^
- transitioning to a child route from redirect WON'T run this route's model
hooks again.
- transitioning to a child route from afterModel WILL

---
# setupController

```javascript
//this is the default implementation
setupController: function(controller, model) {
  controller.set('model', model);
}
```

- setup other state

```javascript
setupController: function(controller, model) {
  this._super(controller, model);
  controller.set('page', 5);
  this.controllerFor('application').set('currentPage', 5);
}
```

---
# Controllers and .init

- controllers are proxies
- both getting and setting undefined props will cause a `TypeError`

---
# controllerFor

- Available in any route
- lookup by name

^
- gets the singleton instance of the named controller
- common to set application state on application controller

---
# where does the controller in setupController come from?

---
# renderTemplate
* calls `route.render()`
* use when you don't have 1:1 routes:templates
* we'll cover `render()` later

---
# Routes are run sequentially

```
URL                  Routes Run

/                    application -> index
/contacts            application -> contacts -> contacts.index
/contacts/edit       application -> contacts -> contacts.edit
```
---

# modelFor and controllerFor

```javascript
ApplicationController = Ember.Controller.extend({
  model: function() {
    return {id: 5, name: "Steve"}
  })
}

ContactsController = Ember.Controller.extend({
  model: function() {
    var currentUser = this.modelFor('application');
    return $.getJSON('api/user/' + currentUser.get('id') + '/contacts');
  })

  afterModel: function() {
    this.controllerFor('application').set('currentPage', 'contacts')
  }
}
```

^
- a route can access models from its parents

---
# route loading substates

```javascript
Router.map(function() {
  this.resource('contacts', function() {
    this.route('show', {path: "/:contact_id"});
  });
})
```
---
<!-- TODO: jsbin -->
# EXAMPLE render loading templates

---
<!-- TODO: jsbin -->
# EXAMPLE a spinner with loading and didTransition

---
# {{link-to}} and transitions

```
template: {{#link-to "contacts.edit" 1}}

route: this.transitionTo("contacts.edit", 1);
```
^

- link-to and transitionTo work the same

---
# transitions and dynamic segments

```javascript
this.route("calendar.edit_appointment", {path: "calendar/calendar/:date/:appointment_id/edit"})

this.resource("calendar", {path: "/calendar/:date"}, function() {
  this.resource("appointment", {path: "/:appointment_id"}, function() {
    this.route("edit"); // appointment.edit route
  })
})

{{link-to "calendar.appointment.edit" "2015-2-12" 1}}
```
- 1 param per *dynamic* segment
---
# passing a model to a transition

```
appointmentModel = {startTime: "2:00", notes: "Meet Jerry", id: 5}

{{link-to "calendar.appointment.edit" "2015-2-12" appointmentModel}}
```
* AppointmentRoute's model hooks *won't* run
* The `serialize` hook will put the model's id into the url

---
# routes without dynamic segments always run their model hooks

```javascript
this.resource("calendar", {path: "/calendar/:date"}, function() {
  this.resource("appointment", {path: "/:appointment_id"}, function() {
    this.route("edit"); // appointment.edit route
  })
})
```

^
- Index routes with big ajax payloads

---
# aborting and redirecting transitions

---
# actions
### No more $.on()*

<small>*mostly</small>

---
# Sending an action

```html
<div class="counter">
  <button {{action "decrementCounter"}}>-</button>
  <p>{{count}} things</p>
  <button {{action "incrementCounter"}}>+</button>
</div>
```

```javascript
ContactsController = Ember.Controller.extend({

  actions: {
   decrementCounter: function() {
    this.get('model').decrementProperty('count');
   },
   incrementCounter: function() {
    this.get('model').incrementProperty('count');
   }
  }
});
```

---
# Action Parameters

```html
{{#each widget in widgets}}
  <div class="counter">
    <button {{action "decrementCounter" widget}}>-</button>
    <p>{{widget.count}} items in this widget</p>
    <button {{action "incrementCounter" widget}}>+</button>
  </div>
{{/each}}
```

```javascript
ContactsController = Ember.Controller.extend({

  actions: {
   decrementCounter: function(widget) {
    widget.decrementProperty('count');
   },
   incrementCounter: function(widget) {
    widget.decrementProperty('count');
   }
  }
});
```
^
- Actions eliminate the need to attach data-foo to dom elements
- Pass the entire object with the action rather than looking it up by id later

---
# actions on other non-click events

```
<form {{action "save" on="submit"}}</form>
```

- full list [here](http://emberjs.com/guides/understanding-ember/the-view-layer/#toc_adding-new-events)

---
# action hierarchy

```javascript
                ApplicationRoute
                    ^
                    |
                    +
                  Routes...
                    ^
                    |
                    +
Controller  +-->  Route
    ^
    |
    +
Template
```

---
# Action propogation

```javascript
  actions: {
    clicked: function() {
     console.log("I was clicked");
     return true // forces the action to bubble
    }
  }
```
^
- by default they don't

---
# actions bubble

```
<div class="container" {{action "editItem" item}}>
  <div class="delete {{action "deleteItem" item}}></div>
</div>

```

---
# bubbles=false

```
<div class="container" {{action "editItem" item}}>
  <div class="delete {{action "deleteItem" item bubbles=false}}></div>
</div>

```

---
# send()

```javascript
actions: {
  delete: function(item) {
  this.send("confirmDelete", "Are you sure?", item)
  }
}
```

^
- Routes, Components, Views, Controllers via `Ember.ActionHandler`
- Can send to self

---
# Actions are harder to test

- testing support in controllers and components
- less support for routes
- use methods instead when possible

---
<!-- jsbin -->
# Modal Example
http://emberjs.jsbin.com/yiyuji/1/edit?html,css,js,output
- [Ember.Route.render](http://emberjs.com/api/classes/Ember.Route.html#method_render)
docs are useful

^
- the controller created by render is a singleton
- Disconnecting the outlet doesn't destory the controller

---
# TESTING integration testing using module() and startApp()

---
# Components
- js and template

---
# component naming conventions
- Name needs a dash (follows web component convention)
- Slashes in component names as of handlebars 2.0 `cat-person/list`

```
{{cat-person}}
without pods:
/app/components/cat-person.js
/app/templates/components/cat-person.js

pods:
/app/pods/components/cat-person/component.js
/app/pods/components/cat-person/template.hbs
```

---
# components are isolated

---
# passing data in

---
# actions
# single action
# named actions

---
# component roles

## partials with locals

## Reusable Widgets
- translate low-level events (DOM) to high-level events (app domain)
- manage screen real estate

## Application Objects
- Components are the new controllers

---
# Components as widgets

{{calender-item clicked="deleteItem"}}
- caller decides what the low level event should translate to
- `calender-item` can be used in many different places

---
# data down actions up
- two-way bindings into widget components should be avoided
- a widget shouldn't modify high-level app state

---
# debounce example
- several components save a model
- controller implements debounce in one place
- debounce happens some times, some times not.

---
# component block form
# block params
# component block form is super useful
# nesting components
# using `this.parentView` in a nested component

# component lifecycle
# binding classes
# changing component element
# didInsertElement
# jquery with components
# changing application state in components -dont if possible

# places where you can't use components
# render()

# TESTING components
# component actions
# using the integration helpers to test a rendered component

# Query Params are a controller thing
# using the query-params handlebars helper

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

# Writing forms

==============

# Ember Data
# Why not until now?
# The pieces

==============

# Feature flags
# Reading the source

# antipattern: doing too much work init

======

# Using sass with ember cli


