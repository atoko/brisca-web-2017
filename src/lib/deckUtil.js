let range = function(n) {
  var range = [];
  for (var i = 0; i < n; i++) {
    range[i] = i;
  }
  return range;
};

let shuffle = function(array) {
  for (var c = array.length - 1; c > 1; c--) {
    var r = (Math.random() * c).toFixed(0);
    var one = array[r];
    var two = array[c];

    if (one !== null) {
      array[c] = one;
      array[r] = two;
    }
  }

  return array;
};

export { range, shuffle };
