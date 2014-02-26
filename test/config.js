/* global requirejs, require */
requirejs.config({  
  paths: {
    "utils": "../scripts/utils",
    "mocha": "../lib/mocha/mocha"
  }  
});

(function() {
  // test mode -- 'tdd', 'bdd-should', or 'bdd-expect'
  var mode = 'bdd-expect';

  if ( mode === 'tdd' ) {
    window.assert = chai.assert;
  }

  if ( mode === 'bdd-should' ) {
    window.should = chai.should();
  }

  if ( mode === 'bdd-expect' ) {
    window.expect = chai.expect;
  }

  mocha.setup('bdd');

  require( [ 'list_of_tests' ], function( lot ) {
    require( lot, function() {
      mocha.run();
    });
  });

}());