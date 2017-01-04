(function() {
  'use strict';

  angular
    .module('contactDemo')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
       .state('contacts', {
        url: '/contacts',
        templateUrl: 'app/contact/contactList.html',
        controller: 'ContactListController',
        controllerAs: 'contacts'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
