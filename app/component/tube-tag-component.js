(function() {
  'use strict';
  angular
    .module('tubeTagGenerator')
    .component('tubeTag', {
      templateUrl: 'app/component/tube-tag-template.html',
      controller: Controller
    });
  Controller.$inject = [
    '$q',
    '$scope',
    'LoadingScreenService'
  ]

  function Controller($q, $scope, LoadingScreenService) {
    var self = this;
    self.$onInit = onInit;

    self.isValid = isValid;
    self.build = build;
    self.range = [];
    self.fields = [];

    function onInit() {
      self.fields = [{
        "title": "Título",
        "customOne": "Campo 1",
        "customTwo": "Campo 2",
        "customThree": "Campo 3",
        "number": 123456789
      },{
        "title": "Título",
        "customOne": "Campo 1",
        "customTwo": "Campo 2",
        "customThree": "Campo 3",
        "number": 123456789
      },{
        "title": "Título",
        "customOne": "Campo 1",
        "customTwo": "Campo 2",
        "customThree": "Campo 3",
        "number": 123456789
      },{
        "title": "Título",
        "customOne": "Campo 1",
        "customTwo": "Campo 2",
        "customThree": "Campo 3",
        "number": 123456789
      }];
      //self.range = [];


    }

    function isValid(begin, end) {
      if (begin <= end) {
        return true;
      } else {
        return false;
      }
    }

    function build() {
      LoadingScreenService.start();
      self.building = true;
      self.resolving = "As etiquetas estão sendo geradas...";
      var deferred = $q.defer();
      var begin = Number($scope.begin);
      var end = Number($scope.end);

      self.fields = [];
      var count = 0;
      setTimeout(function() {
        if (self.isValid(begin, end)) {

          for (var i = begin; i <= end; i++) {
            self.fields.push({
              "title": $scope.title,
              "customOne": $scope.customOne,
              "customTwo": $scope.customTwo,
              "customThree": $scope.customThree,
              "number": i
            });
          }
        }
        deferred.resolve();

      }, 500);
      deferred.promise.then(function(response) {
        LoadingScreenService.finish();

        self.building = false;
        self.resolving = "";
      }, function(reason) {
        alert('Failed: ' + reason);
      });

    }



  }

}());
