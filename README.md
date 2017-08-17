# CSS Transition Helper

WIP

```js
var transition = new Transition(element, 'class-name', 'all .5s ease-in-out');

transition
  .start()
  .then(function(t) {
    return t.reverse();
  })
  .then(function(t) {
    t.element.innerHTML = ';)';
  });
```

OR

```js
Transition.start(element, 'class-name', 'all .5s ease-in-out')
  .then(function(t) {
    return t.reverse();
  })
  .then(function(t) {
    t.element.innerHTML = ';)';
  });
```
