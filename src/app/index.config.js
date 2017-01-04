(function() {
  'use strict';

  angular
    .module('contactDemo')
    .config(config);

  /** @ngInject */
  function config($logProvider, $qProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
   $qProvider.errorOnUnhandledRejections(false);

  }

})();
