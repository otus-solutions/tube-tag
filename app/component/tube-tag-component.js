(function() {
  'use strict';
  angular
    .module('tubeTagGenerator')
    .component('tubeTag', {
      templateUrl: 'app/component/tube-tag-template.html',
      controller: Controller
    });
  Controller.$inject = [
    '$scope'
  ]

  function Controller($scope) {
    var self = this;
    self.$onInit = onInit;

    self.isValid = isValid;
    self.build = build;


    function onInit() {


    }

    function isValid() {
      var inicio = $scope.inicio;
      var fim = $scope.fim;
      console.log(fim);

      if (inicio < fim) {
        return true;
      } else {
        return false;
      }

    }

    function build() {
      var status = self.isValid();
      console.log(status);
    }



  }

}());
