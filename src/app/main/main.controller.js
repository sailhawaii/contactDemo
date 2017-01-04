(function() {
  'use strict';

  angular
    .module('contactDemo')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(Restangular) {
    var vm = this;

    vm.contacts = [];
  
    activate();

    function activate() {
     
Restangular.one("assets/mock/contacts.json").getList().then(
  function(results){
    vm.contacts = results;
  },
  function(){
    alert("Unable to retrieve contancts");
  }
)


    }

  
  }
})();
