(function() {
  'use strict';

  angular
    .module('contactDemo')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, Restangular) {
    var vm = this;

    vm.contacts = [];

vm.test="Hello";
  
    activate();

    function activate() {
     
Restangular.one("assets/mock/contacts.json").getList().then(
  function(results){
    vm.contacts = results;
    //console.dir(results);
  },
  function(){
    alert("Unable to retrieve contancts");
  }
)


    }

  
  }
})();
