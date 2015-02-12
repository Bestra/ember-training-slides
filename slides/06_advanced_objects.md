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
- Console Demo

^
- Person will be the prototype for any instance
- Easy to accidentally mutate someone else's array
- Mainly a problem with superclasses and mixins

---
## setProperties

```
foo.setProperties({
  name: 'Dave',
  occupation: 'Plumber',
  age: 25
});
```
## incrementProperty
```
donny.get('age'); // 25
donny.incrementProperty('age');
donny.get('age'); // 26
```

