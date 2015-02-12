---
# Route events

- 'activate' and 'deactivate'

---
# EXERCISE
<!-- jsbin, manipulating a simple contacts list -->
[manipulating contacts list jsbin](http://emberjs.jsbin.com/xiguhu/2/edit?html,css,js,output)

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
# activate and deactivate events

---
<!-- TODO: jsbin -->
# EXAMPLE render loading templates

---
<!-- TODO: jsbin -->
# EXAMPLE a spinner with loading and didTransition

