# Ember.js Jumpstart

* One day workshop
* 50/50 lecture and coding
* Hands-on

---
# Prerequisites

* You should be pretty comfortable in javascript.
* You need a computer that can run node.js

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
# Routing

* URL -> data -> page
* Mapping URLs to pages is an [explicit goal](http://www.confreaks.com/videos/2960-jsconfeu2013-stop-breaking-the-web)
* Ember can manage the URL with hash or the history api.
* Query parameters are also supported (more later)

---
# defining routes

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

---
# Routes are run sequentially

```
URL                  Routes Run

/                    application -> index
/contacts            application -> contacts -> contacts.index
/contacts/edit       application -> contacts -> contacts.edit
```
---
#Dynamic Segments

```
this.route("show", { path: "/:id });
```
The `id` parameter will be available to the `show` route in the example above.

Dynamic segments are underscored.
```
this.route("show", { path: "/:long_param" });
```
---
# The Ember Inspector

* Browser extension for Chrome and Firefox

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
# Templates
* Handlebars syntax + ember-specific helpers
* No arbitrary interpolation

---
# Template Nesting

* Child routes render into their parent via {{outlet}}
* The Application route is the root

---
# Contacts Template

```
<h1>My Contact List</h1>
```

Open it up...

