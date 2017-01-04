(function () {
  'use strict';

  angular
    .module('contactDemo')
    .controller('ContactEditController', ContactEditController);

  /** @ngInject */
  function ContactEditController($uibModalInstance, contact) {

    var vm = this;
    vm.contact = contact;

    vm.save = function () {
      $uibModalInstance.close(vm.contact);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss({ $value: 'cancel' });
    };

  }
})();