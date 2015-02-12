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
- Environment management (development, production, etc)

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
![OSX contacts app](/slide-images/apple-contacts.png)

---
# Editing Contacts
![OSX contacts edit](/slide-images/apple-edit.png)

---
# New Contacts
![OSX contacts new](/slide-images/apple-new.png)

---
# Hello World!

Global Setup
```sh
npm install -g bower
npm install -g ember-cli@0.1.12
```
Creating a new project

```
ember new contact-manager
cd contact-manager
```

cd into your new app and run it with `ember serve`

![Hello World](/slide-images/hello.png)

---
# Ember CLI Project Structure
![Ember project structure](/slide-images/project-structure.png)

- package.json
- bower.json

---
# Ember Concepts

## MVC != MVC

^
- Routes, models, views, controllers, templates
- Same words as other frameworks, different meanings
- Don't try to make an analogy to your previous experience based on what the thing is called.

---
# Mile High Overview
- Templates
- Routes
- Models

---
# Template
- Handlebars template
- HTML with dynamic content in {{}}
```
<div>
  My friend is {{friend.name}}
</div>
```

---
# Route
- Defines a url for the user to view
- Turns a url into a model
- Renders a template with its model

---
# Model
- Any javascript value
- Arrays, Objects, Ember Objects, etc.

---
# What are we seeing?
- app/router.js

---
# Router.js

- the most important file in the project

```
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
});

export default Router;
```

---
# Import

```
import Ember from 'ember';
import config from './config/environment';
```
- no global variables!
- 'ember' is special
- environment.js is a file in our project
- 'import' can use relative file paths

```
import foo from '<project-name>/models/foo`
// <project-name> is the name of your project

```

---
# Defining a route

```
Router.map(function() {
  this.route('about');
});
```

## defines more than just a route

1. You can navigate to `/about`
1. Ember runs the route at `app/routes/about.js`
1. Ember renders the template at `app/templates/about.hbs`

---
# A template

Create the file at `/app/templates/about.hbs`

```handlebars
<div>
  This is the contacts app for our workshop
</div>
```

Visit '/about'

---
# Auto Generation

- We didn't have to define the about route
- Ember will create some objects for us
- Too much magic can be confusing

---
# The About Route

- define '/app/routes/about.js'

```
import Ember from 'ember';

export default Ember.Route.extend();
```
- the 'name' of the export doesn't matter
- only the file path matters

---
# Routes and paths

```
Router.map(function() {
  this.route('about', {path: '/start'});
});
```

1. You can navigate to `/start`
1. Ember runs the route at `app/routes/about.js`
1. Ember renders the template at `app/templates/about.hbs`

The route name and template **don't** depend on the route's path

---
# a model

- Show today's date on the about page

```
//app/routes/about.js

export default Ember.Route.extend({
  model: function() {
   var today = new Date().toISOString();
   return {date: today};
  }
});
```

```
<div>
<p> This is the contacts app for our workshop </p>
<p> Today is {{model.date}} </p>
</div>
```
---
# Ember Workflow

- Start with a static mockup
- Break the app into screens and URLs
- Define the app's Routes
- Fill in the app's Templates from the mockup
- Wire up models

---
# Breaking an app into routes
[google doc](https://docs.google.com/a/neo.com/presentation/d/1i6TgxM41f6KMP_3w4lXB7wzuAsChJjaegG-OYv1J_nI/edit?usp=sharing)

---
# HTML Mockup
https://gist.github.com/Bestra/3730867a60307c687bbb

- copy `index.hbs` into `/app/templates/index.hbs`
- copy `app.css` into `/app/styles/app.css`
- copy `reset.css` into `/app/styles/reset.css`
- delete `app/templates/application.hbs`

---
# A Route's Responsibilities

- Turn its part of the url into a model
- Render its template with that model

^
- URLs are shareable
- Ember can manage the URL with hash or the history api.
- Query parameters are also supported (more later)

---
# Exercise

- Add routes to the app in `router.js`
- Break the mockup out into different templates
- Add {{outlet}} where needed
- Create Routes as needed

---
# Ember inspector
- Chrome and Firefox

---
# Hello Ember
[jsbin](http://emberjs.jsbin.com/wujadu/2/edit?html,js,output)

## JSBins are great
- Good resource for learning and sharing
- Almost mandatory for demonstrating bugs

---
# Modules vs. Globals
- jsbin uses globals
- 'app/routes/contacts.js' --> App.ContactsRoute
- 'app/routes/contacts/edit.js' --> App.ContactsEditRoute

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

```javascript
mike = Person.create();
mike.attack(30); //console: "Attack for 30 damage"

conan = Warrior.create();
conan.attack(30); //console: "Attack for 80 damage"
```

^
 - _Almost_ everthing in Ember descends from Ember.Object
 - Ember.Object.extend({}) creates a subclass of Ember.Object
 - Override superclass methods like you'd expect
 - Call `_super` from inside a subclassed method.

---
# Getters and setters

```javascript
var foo = Ember.Object.create({name: "Dude"});
foo.get('name'); // "Dude"
foo.set('name', "Sweet")
foo.get('name'); // "Sweet"
```

---
Why do we need getters and setters?

```
//model = {person: "Steve", catCount: 2};

<div>
  My man {{model.person}} has {{model.catCount}} cats
</div>
```

Handlebars templates know to update when a property has been _set_

```
model.catCount = 5 // handlebars won't update the template
model.set('catCount, 5); // setter causes updates to fire
```

---
# Computed Properties

```javascript
var Person = Ember.Object.extend({
  firstName: "Some",
  lastName: "Guy",

  fullName: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName'),
})

var guy = Person.create();
guy.get('fullName'); // 'Some Guy'
guy.set('firstName', 'Another');
guy.get('fullName'); // 'Another Guy'

guy.lastName = 'Person';
guy.get('fullName'); // 'Another Guy'
// the property doesn't update without 'set'
```

^
- fullName is a _computed property_
- firstName and lastName are _dependent keys_
- value is cached until one of the dependent properties changes
- changing a dependent property without using `set()` won't change the CP
- getters and setters eliminate the need for dirty checkinga ala angular

---
# Caching

```javascript
var LoudPerson = Person.extend({
  loudName: function() {
    var name = this.get('fullName')
    console.log("Calculating");
    return name.toUpperCase();
  }.property('fullName')
});

joe = Person.create();
joe.get('loudName'); //console: Calculating
joe.get('loudName'); //console:
joe.set('firstName', "Bob");
joe.get('loudName'); //console: Calculating
```

- properties save their values
- properties only recalculate when they have to

---

# Chaining

```javascript
var walter = Ember.Object.create({name: "Walter"}),
var donny = Ember.Object.create({name: "Donny", friend: walter})

donny.get('friend.name'); // => "Walter"
donny.get('friend.rollsOnShabbos') //=> undefined
donny.get('notThere.rollsOnShabbos') //=> undefined (no error)
donny.notThere.rollsOnShabbos // TypeError!
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

Ember.get(a, 'foo'); // 'bar'
Ember.set(a, 'dude', 'sweet'); //{foo: 'bar', dude: 'sweet'}
```

^
- Ember.get and Ember.set will work on Ember objects and POJOs

---
# Arrays

[reference](http://emberjs.com/api/classes/Ember.Array.html)

```javascript
var a = ['first', 'second', 'third'];

a.length // 3
a.get('length') // 3
a.[0] // 'first'
a.get('firstObject') // 'first'
a.objectAt(1) // 'second'
```

---
# Adding things to arrays

```
var a = ['first', 'second'];

a.addObject('third') // ['first', 'second', 'third']
a.addObject('third') // ['first', 'second', 'third'] -- same
a.pushObject('third') // ['first', 'second', 'third', 'third']

```

- addObject doesn't add duplicates
- be careful adding objects!
^
- Finding in a collection is all done by reference

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
# Example

```javascript

var Ingredient = Ember.Object.extend({
  calories: 0,
  name: ""
});

var Meal = Ember.Object.extend({
  //passed in properties
  ingredients: null, //an array

  //computed properties
  totalCalories: function() {
    return this.get('ingredients').reduce(function(memo, item) {
      return memo + item.get('calories');
    }, 0)
  }.property('ingredients.@each.calories'),

  isTooBig: function() {
    return this.get('totalCalories') > 2500;
  }
});
```

---
# CPs and Arrays

```
cats: [{name: 'Fifi', color: 'black'}, {name: 'Fluffy', color: 'calico'}],

catNames: function() {
  return this.get('cats').mapBy('name');
}.property(?????)
```
- .property('cats') will only update if the `cats` array is replaced
- .property('cats.[]') updates if a cat is added or removed
- .property('cats.@each.name') updates if a cat is added or removed,
or if a cat's name is changed.  NOT if the color changes

---
# Example

```javascript
var Ingredient = Ember.Object.extend({
  calories: 0,
  name: ""
});

var Meal = Ember.Object.extend({
  //passed in properties
  ingredients: null, //an array

  //computed properties
  ingredientCalories: Ember.computed.mapBy('ingredients', 'calories'),
  totalCalories: Ember.computed.sum('ingredientCalories'),

  isTooBig: Ember.computed.gt('totalCalories', 2500)

});
```

---
# Mixins

```javascript
var HasCats = Ember.Mixin.create({
  cats: null,
  setCats: function() {
    this.set('cats', []);
  }.on('init'),
  catNames: Ember.computed.mapBy('cats.name')
})

var CatPerson = Ember.Object.create(HasCats),
dude = CatPerson.create();
```

^
- Multiple mixins applied in order
- Mixins functions can be overridden with this._super()
- Mixins more common than inheritance in Ember
- Enumerable, ObjectProxy, etc.
---
# Excercise: Contact model

- Make a contact for our app

---
# Defining Routes

```javascript
// router.js

Router.map(function() {
  this.route("contacts", { path: "/contacts" });
});
```
---

# Route definitions and names

- [Ember Routing Guide](http://emberjs.com/guides/routing/defining-your-routes/#toc_resources)

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
# Dynamic Route Segments

Dynamic segments are underscored.

```javascript
//router.js
this.route("person", { path: "/:person_id" });
this.route("show", { path: "/:id });

// routes/person.js

export default Ember.Route.extend({
  model: function(params) {
   return findPerson(params.person_id);
  }
});
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
# Resource makes a common parent route/template for its children
<!-- jsbin nested resource/templates -->
[example jsbin](http://emberjs.jsbin.com/pocico/4/edit?html,js,output)
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
    return {name: "Bob Dole"};
  },
});
```

^
- `model` is a _hook_ the route provides
- More on route hooks shortly.

---
# Routes are run sequentially

```
URL                  Routes Run

/                    application -> index
/contacts            application -> contacts -> contacts.index
/contacts/edit       application -> contacts -> contacts.edit
```

---
# Controllers

- Ember will generate a controller for you based on your route definition
- It's good practice to always define your own stuff rather than letting ember
do it for you

^
- Ember provides Controller, ObjectController, and ArrayController
- ObjectController and ArrayController proxy their models
- 'model' is aliased to 'content'
- Proxying is [on the way out](https://github.com/emberjs/rfcs/pull/15), so avoid it if possible

---
# Controllers are decorators

- display the same model in many contexts
- logic specific to a particular view/template
- logicless templates == view logic in controllers

---
# Controllers are singletons

- There's only one of each kind in your app
- It doesn't go away between requests
- If you make a mess you have to clean it up
^
- Controllers stick around after being instantiated.

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
# Templates

---
# Handlebars

- Mustache on steriods
- Ember handlebars is different than vanilla handlebars

^
- Ember has some helpers that are specific
- Vanilla handlebars uses some helpers that never show up in real Ember code
---
# Debugging

- Configuring logging
- Using the stack trace
- effective breakpoints
- {{debugger}} to inspect template context

---
# Logging

```
config/environment.js

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }
```

---

## Demo
^
- Stops you in the middle of rendering
- Helpful comments
---
# the rendering context

- Controller or Component

```
{{foo}} --> context.foo
```

---
# comments

```
{{!-- This is a comment --}}
```

^
- html comments will either be rendered or blow up your template
---
# Using {{bind-attr}}

```
<div class={{active}}> //no good yet.  Coming soon!
<div {{bind-attr class=active}}>
<div {{bind-attr class='active'}}> // stil binds to context.active

<div {{bind-attr class=true}}> //wont work
```

- bind-attr with booleans adds or removes the attr.

```javascript

hbs:
<button {{bind-attr disabled=isDisabled}}></button>

html:
<button disabled> //context.isDisabled is truthy
<button> //context.isDisabled is truthy
```

---
# Class Name Syntax

- `{{bind-attr class="..."}}`

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

- "isActive:active :wont-change hidden" will bind three classes

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
# Using {{with}}

```
<div class="cat-box">
  {{someThing.person.cat.name}} is in the box and {{get-pronoun someThing.person.cat}} is
  {{someThing.person.cat.hungryStatus}}
</div>

{{#with someThing.person.cat as |cat|}}
  {{cat.name}} is in the box and {{get-pronoun cat}} is
  {{cat.hungryStatus}}
{{/with}}
```

---
# Rendering Lists with {{#each}}

- trying to bind to a raw array {{someArray}} doesn't work.
- newer block syntax {{#each foos as |foo|}}

---
# {{partial 'foo'}}
```
//contact-form.hbs
<div>
  <label>
    <span class="field-label">Your Email</span>
    {{input value=contactEmail}}
  </label>
</div>

//edit.hbs
<div>
  Edit your contact info
  {{partial 'contact-form'}}
</div>

//new.hbs
<div>
  Add new contact info
  {{partial 'contact-form'}}
</div>
```

^
- Partial doesn't take any locals
- Ember cli expects a normal path name
- non-cli expects the partial to start with '_' ala Rails
- Use a component as a partial instead

---
# Links

- Links go to a _route_ instead of a url

```
{{#link-to routeName arg1 arg2 ...}}
  tag content goes here
{{/link-to}}

{{link-to tagContent routeName arg1 arg2 ...}}
```

^
- adds an 'active' class to a link when the current route matches the link's specified route
- the link-to helper is really complicated internally. just sayin.

---
# Simple links

```
//route
this.route('person', {path: '/:id'});

//Will go to the person route with id=1
{{link-to 'Show this person' 'person' 1}}
```

```
//route
//'calendar/2015-01-05/appointments/5'
this.resource('calendar', {path: 'calendar/:date}, function() {
  this.route('appointment', {path: 'appointments/:id'});
}

//Will go to the appointment route with id=1
{{link-to 'Edit my appointment' 'calendar.appointment' '2015-01-05' 5}}
```

---
# Exercise

- Make the contacts list dynamic
- Get contacts from app/utils/contact-generator.js
- Make the links work

---
# Sorting and Filtering

```
  people: [{name: 'Bob', priority: 2},
   {name: 'Mike', priority: 1},
   {name: 'Stevesy', priority: 1}],

  peopleSort: ['priorty:asc', 'name:asc'],
  sortedPeople: Ember.computed.sort('people', 'peopleSort'),

  priortyPeople: Ember.computed.filterBy('sortedPeople', 'priority', 1)
```

[filtering jsbin](http://emberjs.jsbin.com/cusomu/1/edit?html,js,output)

---
# Exercise: Sorting the contacts list
- Sort contacts by last name, then first

---
# Basic {{input}}
- The [input helpers guide](http://emberjs.com/guides/templates/input-helpers/) gives a useful overview
- [input api docs](http://emberjs.com/api/classes/Ember.Handlebars.helpers.html#method_input)
- specify types
- bind to or set most html attributes
- bind actions if needed

```
{{input value=model.foo placeholder="Foo goes here"}}
```
^
- value binding is two-way

---
# Exercise: Filtering contacts list
- Make the filter input actually work
- Don't worry about filtering out the current person

---
# check boxes

```
{{input type="checkbox" name="Likes Cats" checked=likesCats}}
```

^
- note 'name' is another html attribute. most of them won't be needed.
---
# Select boxes

<!-- jsbin select boxes -->
[Select boxes jsbin](http://emberjs.jsbin.com/nepihi/1/edit?html,css,js,output)

- 2 cases for using selects
^ - an empty select will default to the first value unless you set "prompt='foo'"
---
# Select w/strings

```
// colors = ['red', 'blue', 'green']

{{view "select" content=model.colors
                value=selectedColor}}
```
^
- it's a view rather than a handlebars helper
- content points to an array
- Ember generates the `<option>` tags for you

---
# Select w/objects

```
given people:
[{id: 1, name: 'Steve'}, {id: 2, name:'Jerry'},
 {id: 3, name: 'Bob'}, {id: 4, name: 'Larry'}]

{{view "select" content=model.people
                optionLabelPath="content.name"
                optionValuePath="content.id"
                prompt="Pick a guy"
                value=selectedPerson}}

produces:
<option value="1">Steve</option>
<option value="2">Jerry</option>
etc.
```

^
- The paths have to be strings

---
# value vs. selection

```
//if selectedThing is {id: 5, name: 'Bob'}
{{view "select" value=selectedThing}}

{{view "select" selection=selectedThing}}
```

^
- with value selectedThing will be '5'
- seletion is probably what you want. points to the object itself.

---
# Selection Groups

```javascript
groupedPeople: [{id: 1, name: 'Steve', group: "Jets"},
                {id: 3, name: 'Bob', group: "Sharks"},
                {id: 2, name:'Jerry', group: "Jets"},
                {id: 4, name: 'Tecumseh', group: "Sharks"}]

{{view "select" content=model.groupedPeople
                    optionLabelPath="content.name"
                    optionValuePath="content.id"
                    optionGroupPath="group" // <- Not 'content.group'
                    prompt="Pick a guy"
                    selection=selectedPerson}}
```

![unsorted groups](/slide-images/unsorted-select-group.png)

^
- Content has to be sorted by group first

---
# Multiselects

- HTML multiselect is so ugly you'll probably just make your own.
^
- see the jsbin for an example
- make sure to bind to selection, not value

---
# Radio buttons?

- no direct helper for ember
- pretty easy to do yourself
- some solutions exist as ember cli addons

---
# Form Exercise

<!-- TODO: jsbin, build a form for the provided model -->

Build a form for the provided model
in this [jsbin](http://emberjs.jsbin.com/xiguhu/7/edit?html,css,js,output)

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
- params are always strings

^
- Dynamic segment content is inserted into `params`
- Most common place to make an ajax request

---
# serialize

- Useful for slugging

```javascript
this.transitionTo('person', {lastName: 'jones', id: 5});

//personRoute
serialize: function(model) {
  return model.get('lastName');
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

```
//routes/index.js

export default Ember.Route.extend({
  redirect: function() {
    this.transitionTo('contacts');
  }
});
```

- Many times we don't _want_ an index route

^
- transitioning to a child route from redirect WON'T run this route's model
hooks again.
- transitioning to a child route from afterModel WILL

---
# setupController

- setup non-model state

```javascript
setupController: function(controller, model) {
  this._super(controller, model);
  controller.set('page', 5);
  this.controllerFor('application').set('currentPage', 5);
}
```

---
# Excercise: redirects

- Redirect to 'contacts' when the user visits '/'
- Show the first contact when the user visits '/contacts/'
- Get rid of the index templates and controllers you're no longer using

---
# controllerFor

- Available in any route
- lookup by name

^
- gets the singleton instance of the named controller
- common to set application state on application controller

---
# renderTemplate
* calls `route.render()`
* use when you don't have 1:1 routes:templates
* we'll cover `render()` later

---
# {{link-to}} and transitions

```
template: {{#link-to "contacts.edit" 1}}

route: this.transitionTo("contacts.edit", 1);

controller: this.transitionToRoute("contacts.edit", 1);

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
# replaceWith

- like transitionTo, but doesn't add to history
- makes sure 'back' doesn't break

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
# Exercise: Clear the Filter

- Add a button to clear the contacts filter
- It can be ugly

---
# Exercise: New Contacts

- Define a route for new contacts at 'contacts/new'.  Nest it under 'contacts'.
- Turn the contacts/edit template into a partial
- Use the partial to make 'contacts/new.hbs'
- Cancel should redirect to the previously shown contact
- Save should go to the show page for the new contact

---
# Actions are harder to test

- testing support in controllers and components
- less support for routes
- use methods instead when possible

---
<!-- jsbin components -->
# Components
- [jsbin](http://emberjs.jsbin.com/wirete/2)
- Can be defined with code and/or template.
- Similar to a controller...

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
# passing data in

Javascript
```
MyController = Ember.ObjectController.extend({
  cats: ['Tom', 'Garry', 'Jerry']
});
CatPersonComponent = Ember.Component.extend({
  cats: null, //passed in
  catCount: Ember.computed.alias('cats.length')
});
```

Templates
```
//application template
{{cat-person cats=cats}}

//component template
There are {{catCount}} cats.
<ul>
  {{#each cat in cats}}
    <li>
      {{cat}}
    </li>
  {{/each}}
</ul>
```

---
# Bindings are two-way by default

```
//app
{{name-form name=person.name}}

//name-form component
{{input value=name}}
```

---
# Modifying a component's tag and attributes

- tagName
- classNames
- classNameBindings
- attributeBindings

^
- Components are all divs by default
- use tagName, tagName can also be passed in
- classNames is a static array
- classNameBindings uses the same syntax as bindAttr
- you could use both classNames and classNameBindings if you really want to
- attributeBindings can use a 'sourceProp:attr' syntax too.

---
# Component Actions

- Remember, components are isolated
- Internal actions stay trapped unless passed out

```
//application
{{date-picker startDate="2015-01-01"
              endDate="2015-05-05"}}

//date-picker
<div>
  {{#each date in cells}}
    <div class="calendar-cell" {{action "selectDate" date}}></div>
  {{/each}}
  <button {{action "getPreviousMonth"}}>Last Month</button>
  <button {{action "getNextMonth"}}>Next Month</button>
</div>
```

^
- All three actions here are internal
- Component only maintains internal state

---
# Action Bindings

```
{{date-picker startDate="2015-01-01"
              endDate="2015-05-05"
              datePicked="setDate"}}

//DatePickerComponent sends the action
someFunction: function() {
  this.sendAction('datePicked', this.get('currentDateString'))
}

//Controller implements setDate
actions: {
  setDate: function(dateString) {
    this.set('appointment.date', Date.parse(dateString));
  }
}
```
- sendAction(actionName, arg1, arg2, ...)
- sendAction() sends 'action' with no args
- external action name is a string

---
# component events
- click, mouseUp, etc.
- full list defined [here](http://emberjs.com/api/classes/Ember.View.html#toc_event-names)
- access the event from the callback

---
# Exercise: Input validation

- Make an input component that validates email addresses
- Start with an existing input with label
- Invalid addresses should show an error

---
# component lifecycle events
- Enumerated fully [here](http://emberjs.com/guides/understanding-ember/the-view-layer/#toc_lifecycle-hooks)

Most frequently used:

- didInsertElement
- willDestroyElement

---
# didInsertElement

```
MyComponent = Ember.Component.extend({
  setupTooltips: function() {
    this.$().tooltip();

    self = this;
    this.$().on('click', 'li', function(e) {
      self.itemClicked();
    });
  }.on('didInsertElement')

  itemClicked: function() {
    this.sendAction('itemSelected');
  }
});
```

^
- After the element is in the DOM
- use this.$() or this.get('element')

---
# willDestroyElement

Tear down what you set up.
- Custom key event listeners
- Jquery plugins
- Animations

---
# places where you can't use components
- render() and friends
- support for top-level components coming soon

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
- calender-item renders itself independently
- `calender-item` can be used in many different places, even different apps

---
# Waiting to save a Contact

- Dont want new contacts to show up before they're saved (DEMO)
- Make a copy?
- Temp variables?

---
# Using ember cli addons

- `ember-buffered-proxy`
- `npm install ember-buffered-proxy`
- `import BufferedProxy from 'ember-buffered-proxy/proxy';`
