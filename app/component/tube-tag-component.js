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
    'LoadingScreenService',
    'UploadService'
  ]

  function Controller($q, $scope, LoadingScreenService, UploadService) {
    var self = this;
    self.$onInit = onInit;

    self.isValid = isValid;
    self.build = build;
    self.range = [];
    self.fields = [];
    $scope.valid = false;
    self.teste = teste;

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

    function isValid() {
      self.begin = Number($scope.begin);
      self.end = Number($scope.end);
      if (self.begin <= self.end) {
        $scope.valid = true;
        return true;
      } else {
        $scope.valid = false;
        return false;
      }
    }

    function teste() {
      console.log(UploadService.getFile());
    }
    function build() {
      LoadingScreenService.start();
      self.building = true;
      self.resolving = "As etiquetas estão sendo geradas...";
      var deferred = $q.defer();


      self.fields = [];
      var count = 0;
      setTimeout(function() {
        if (self.isValid()) {

          for (var i = self.begin; i <= self.end; i++) {
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
