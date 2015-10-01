module.exports = function(fn, delay) {
  var timer = null;
  var firstRun = true;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}