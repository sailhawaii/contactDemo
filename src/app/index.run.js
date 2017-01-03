(function() {
  'use strict';

  angular
    .module('contactDemo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
