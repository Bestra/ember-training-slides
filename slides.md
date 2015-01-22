# Ember.js Jumpstart

* One day workshop
* 50/50 lecture and coding
* Hands-on 

---

# Prerequisites

* You should be pretty comfortable in javascript.  
* You need a computer that can run node.js

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

# Our Project

We're going to make a contact list application.  It won't be too flashy but it will give us a chance
to show off the key strengths and weaknesses of Ember.

---

# Hello Ember!

```
npm install -g bower
npm install -g ember-cli@0.1.7
ember new contact-manager
cd contact-manager
npm install && bower install
```

cd into your new app and run it with `ember serve`
