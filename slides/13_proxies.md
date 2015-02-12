---
# Proxies

- Ember.ObjectProxy class
- Ember.ArrayProxy class

```javascript
var proxy = Ember.ObjectProxy.create();
proxy.set('content', {foo: "bar"});
proxy.get('foo');

proxy.set('whatever', "you want");
proxy.get('anything');
```

^
- The proxy delegates gets and sets to its content if they don't exist on the proxy
- Proxies blow up if an undefined prop gets set (one not defined on the prototype)
- Proxies also blow up when getting an undefined prop instead of just returning undefined
- Array proxies will delegate map, etc. to their content property
- Promise proxies will set their content property when their promise resolves (more later)

---
# Using PromiseProxy
---
# Controllers and .init

- if you use ObjectController or ArrayController
- both getting and setting undefined props will cause a `TypeError`

