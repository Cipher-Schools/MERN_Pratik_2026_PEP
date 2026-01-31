function counter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  };
}
let c1 = counter();

// --------------------------------------------------
for (var i = 1; i <= 3; i++) {
  (function (x) {
    setTimeout(function () {
      console.log(x);
    }, x * 1000);
  })(i);
}

// ----------------------------------------------------------
// -Counter with Increment & Decrement
function counterApp() {
  let count = 0;
  return {
    inc: function () {
      count++;
      return count;
    },
    dec: function () {
      count--;
      return count;
    },
    value: function () {
      return count;
    }
  };
}
let c = counterApp();