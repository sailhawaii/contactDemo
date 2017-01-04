(function () {
  'use strict';

  angular
    .module('contactDemo')
    .controller('ContactListController', ContactListController);

  /** @ngInject */
  function ContactListController(Restangular, $uibModal, $log, storage) {
    var vm = this;

    vm.contacts = [];

    vm.clearLocalStorage = function(){
      storage.clearAll();
      $log.log("Local Storage Cleared");
      activate();
      
    }

    vm.openEditModal = function (row) {
      var contact = {};
      var index = vm.contacts.indexOf(row);
      if (index !== -1) {
        contact = vm.contacts[index];
      }else{
        $log.error("Row not found in master array");
      }

      var modalInstance = $uibModal.open({
        animation: true,
        controller: 'ContactEditController',
        controllerAs: "editContact",
        templateUrl: 'app/contact/contactEditModal.html',
        resolve: {
          contact: function () {
            return angular.copy(contact);
          }
        }
      });

      modalInstance.result.then(function (editedItem) {
        angular.copy(editedItem, contact);
        storage.set('contacts', vm.contacts);
      });
    };


    function activate() {

    vm.contacts = storage.get('contacts');
     if (vm.contacts === null){
        loadContacts();
     }

      
    }

    activate();

    function loadContacts() {

      Restangular.one("assets/mock/contacts.json").getList().then(
        function (results) {
          vm.contacts = results.plain();
          storage.set('contacts', vm.contacts);
        },
        function () {
          alert("Unable to retrieve contacts");
        }
      )


    }


  }
})();
