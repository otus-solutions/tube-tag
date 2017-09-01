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
    self.range = [];

    function onInit() {


    }

    function isValid(inicio,fim) {
      if (inicio < fim) {
        return true;
      } else {
        return false;
      }
    }

    function build() {
      self.range = [];
      var inicio = Number($scope.inicio);
      var fim = Number($scope.fim);
      var status = self.isValid(inicio,fim);
      if(status){
        for(var i = inicio; i <= fim; i++){

          self.range.push(i);
        }
        console.log(self.range);
      }
    }



  }

}());
