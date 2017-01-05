(function() {
    'use strict';

    angular
        .module('contactDemo')
        .controller('ContactListController', ContactListController);

    /** @ngInject */
    function ContactListController(Restangular, $uibModal, $log, storage) {
        var vm = this;

        vm.contacts = [];

        vm.clearLocalStorage = function() {
            var results = storage.remove('contacts');
            $log.log("Local Storage Cleared:" + results);
            vm.loadContacts();
            return results;
        }

        vm.delete = function(row) {
            var index = vm.contacts.indexOf(row);
            if (angular.isDefined(index)) {
                vm.contacts.splice(index, 1)
            }
        }

        vm.edit = function(row) {
            var contact = {};
            var isNew = false;

            if (angular.isUndefined(row)) {
                isNew = true;
            } else {
                contact = vm.getContactFromRow(row);
            }

            var modalInstance = $uibModal.open({
                animation: true,
                controller: 'ContactEditController',
                controllerAs: "editContact",
                templateUrl: 'app/contact/contactEditModal.html',
                resolve: {
                    contact: function() {
                        return angular.copy(contact);
                    },
                    isNew: function() {
                        return isNew;
                    }
                }
            });

            modalInstance.result.then(function(editedItem) {

                if (isNew) {
                    vm.contacts.push(editedItem);
                } else {
                    angular.copy(editedItem, contact);
                }

                storage.set('contacts', vm.contacts);
            });
        };

        vm.getContactFromRow = function(row) {
            var index = vm.contacts.indexOf(row);
            if (index !== -1) {
                return vm.contacts[index];
            } else {
                $log.error("Row not found in master array");
            }

        }

        vm.activate = function() {
            vm.loadContacts();
        }

        vm.loadContacts = function() {
            var localContacts = storage.get('contacts');
            if (localContacts === null) {
                Restangular.one("assets/mock/contacts.json").getList().then(
                    function(results) {
                        vm.contacts = results.plain();
                        storage.set('contacts', vm.contacts);
                    },
                    function() {
                        alert("Unable to retrieve contacts");
                    }
                )
            } else {
                vm.contacts = localContacts;
            }
        }

        vm.activate();

    }
})();
