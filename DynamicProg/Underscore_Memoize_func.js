/*
*
*   This code is illustrate the .memoize function provided by underscore.js.
*	Details about undercore API can be found here: http://underscorejs.org/#memoize
*	memoize_.memoize(function, [hashFunction]) 
*	Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations. 
*	If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based on the arguments to the original function. 
*	The default hashFunction just uses the first argument to the memoized function as the key
*
*	Implemented as below:
*		  _.memoize = function(func, hasher) {
*		    var memo = {};
*		    hasher || (hasher = _.identity);
*		    return function() {
*		      var key = hasher.apply(this, arguments);
*		      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
*		    };
*		  };
*
*	Zhe Zhang
*	Created on Sep 3, 2013
*   Latest updated on Sep 3, 2013
*
*/

var dynamicPrgm = dynamicPrgm || {};

dynamicPrgm.fibonacci = _.memoize(function(n) {
  return n < 2 ? n : dynamicPrgm.fibonacci(n - 1) + dynamicPrgm.fibonacci(n - 2);
});

dynamicPrgm.nonmemoize_fibonacci = function(n) {
  return n < 2 ? n : dynamicPrgm.nonmemoize_fibonacci(n - 1) + dynamicPrgm.nonmemoize_fibonacci(n - 2);
};

//console.log("dynamicPrgm.fibonacci(9) = " + dynamicPrgm.fibonacci(9));

//Measure how long a function or operation in your code takes to complete
console.time("Running  dynamicPrgm.fibonacci(99)");
console.log("dynamicPrgm.fibonacci(99) = " + dynamicPrgm.fibonacci(99));
console.timeEnd("Running  dynamicPrgm.fibonacci(99)");

console.time("Running  dynamicPrgm.nonmemoize_fibonacci(39)");
console.log("dynamicPrgm.nonmemoize_fibonacci(39) = " + dynamicPrgm.nonmemoize_fibonacci(39));
console.timeEnd("Running  dynamicPrgm.nonmemoize_fibonacci(39)");
