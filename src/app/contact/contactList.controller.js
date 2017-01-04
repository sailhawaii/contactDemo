(function () {
  'use strict';

  angular
    .module('contactDemo')
    .controller('ContactListController', ContactListController);

  /** @ngInject */
  function ContactListController(Restangular, $uibModal, $log) {
    var vm = this;

    vm.contacts = [];

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
      });
    };


    function activate() {
      loadContacts();
    }

    activate();

    function loadContacts() {

      Restangular.one("assets/mock/contacts.json").getList().then(
        function (results) {
          vm.contacts = results.plain();
        },
        function () {
          alert("Unable to retrieve contacts");
        }
      )


    }


  }
})();
