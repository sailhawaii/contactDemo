(function () {
  'use strict';

  angular
    .module('contactDemo')
    .controller('ContactEditController', ContactEditController);

  /** @ngInject */
  function ContactEditController($uibModalInstance, contact, isNew) {

    var vm = this;
    vm.contact = contact;
    vm.isNew = isNew;

    vm.save = function () {
      $uibModalInstance.close(vm.contact);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss({ $value: 'cancel' });
    };

  }
})();