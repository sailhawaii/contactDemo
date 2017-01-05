describe('ContactList Controller', function () {
  var vm;

  beforeEach(angular.mock.module('contactDemo'));
  beforeEach(angular.mock.inject(function ($controller) {

    vm = $controller('ContactListController', { });
  }));

  it('should return true when clearing local storage', function () {
    expect(vm.clearLocalStorage()).toBe(true);
  });

  it('should cal loadContacts when activate is called', function () {
    spyOn(vm, 'loadContacts');
    vm.activate();
    expect(vm.loadContacts).toHaveBeenCalled();
  });

  it('should remove contact from contact array when delete is called', function () {
    vm.activate();
    var c = { name: "test", title: "test" };
    var row = angular.copy(c); //simulates the display copy used by smart tables
    vm.contacts.push(c);
    var lengthBeforeDelete = vm.contacts.length;
    vm.delete(row);
    expect(vm.contacts.length + 1 === lengthBeforeDelete).toBeTruthy();
  });

}); 