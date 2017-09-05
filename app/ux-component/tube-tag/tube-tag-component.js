(function() {
  'use strict';
  angular
    .module('tubeTagGenerator')
    .component('tubeTag', {
      templateUrl: 'app/ux-component/tube-tag/tube-tag-template.html',
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
    self.valid = false;
    self.setFile = setFile;


    function onInit() {
      self.flag = false;
      self.fields = [{
        "title": "Título",
        "customOne": "Campo 1",
        "customTwo": "Campo 2",
        "customThree": "Campo 3",
        "number": 123456789
      }, {
        "title": "Título",
        "customOne": "Campo 1",
        "customTwo": "Campo 2",
        "customThree": "Campo 3",
        "number": 123456789
      }, {
        "title": "Título",
        "customOne": "Campo 1",
        "customTwo": "Campo 2",
        "customThree": "Campo 3",
        "number": 123456789
      }, {
        "title": "Título",
        "customOne": "Campo 1",
        "customTwo": "Campo 2",
        "customThree": "Campo 3",
        "number": 123456789
      }];
      console.log(self.fields);


    }

    function isValid() {
      self.end = '';
      self.begin = Number($scope.begin);
      if (self.flag) {
        if (self.begin) {
          self.end = self.begin + self.fieldsArray.length-1;
        }else{
          self.end = '';
        }
      } else {
        self.end = '';
        self.end = Number($scope.end);
      }

      if (self.begin <= self.end) {
        self.valid = true;
      } else {
        self.valid = false;
      }
    }

    function setFile() {
      if (!self.flag) {
        var deferred = $q.defer();
        setTimeout(function() {

          self.file = UploadService.getFile();
          _csvJSON();
          console.log(self.fieldsArray);
        }, 100);
        self.flag = true;
      }
      return self.flag;
    }

    function build() {
      LoadingScreenService.start();
      // self.begin = Number($scope.begin);
      // self.end = Number($scope.end);
      self.building = true;

      var deferred = $q.defer();

      self.fields = [];
      var count = 0;
      setTimeout(function() {
        if (self.valid) {
          console.log($scope.customOne);
          if(self.flag){
            for (var i = self.begin; i <= self.end; i++) {
              self.fields.push({
                "title": $scope.title,
                "customOne": String(self.fieldsArray[count][0]),
                "customTwo": String(self.fieldsArray[count][1]),
                "customThree": String(self.fieldsArray[count][2]),
                "number": i
              });
              count++;
            }
          } else {
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
          console.log(self.fields);
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

    function _csvJSON() {
      var lines = self.file.split("\n");
      lines.pop();
      var lineFields = [];
      self.fieldsArray = [];
      lines.forEach(function(line) {
        line = line.split(",");

        line.forEach(function(field) {
          lineFields.push(field);
        });
        self.fieldsArray.push(lineFields);
        lineFields = [];
      });
    }



  }

}());
