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
    self.setFile = setFile;

    function onInit() {
      self.range = [];
      self.fields = [];
      self.valid = false;
      self.flag = false;
      _fakeLabeGenerator();
    }

    function _fakeLabeGenerator() {
      for (let i = 0; i < 11; i++) {
        self.fields.push({
          "title": "Título",
          "customOne": "Campo 1",
          "customTwo": "Campo 2",
          "customThree": "Campo 3",
          "number": 123456789 + i
        });
      }
    }

    function isValid() {
      _populateRange();
      if (self.begin <= self.end) {
        self.valid = true;
      } else {
        self.valid = false;
      }
    }

    function _populateRange() {
      self.begin = Number($scope.begin);
      if (self.flag) {
        if (self.begin) {
          self.end = self.begin + self.fieldsArray.length - 1;
        } else {
          self.end = '';
        }
      } else {
        self.end = Number($scope.end);
      }
    }

    function setFile() {
      if (!self.flag) {
        var deferred = $q.defer();
        setTimeout(function() {
          self.file = UploadService.getFile();
          _csvToArray();
        }, 100);
        self.flag = true;
      }
      return self.flag;
    }

    function build() {
      self.fields.splice(0, self.fields.length);
      LoadingScreenService.start();
      _generateLabelFields().then(function(response) {
        LoadingScreenService.finish();
      }, function(reason) {
        alert('Failed: ' + reason);
        LoadingScreenService.finish();
      });
    }

    function _generateLabelFields() {
      var deferred = $q.defer();
      self.fields.splice(0, self.fields.length);
      setTimeout(function() {
        if (self.valid) {
          if (self.flag) {
            console.log(self.fieldsArray);
          //  self.fieldsArray.forEach(function(line) {
              var index = 0;
              for (var i = self.begin; i <= self.end; i++) {
                self.fields.push({
                  "title": i,
                  "customOne": self.fieldsArray[index][0],
                  "customTwo": self.fieldsArray[index][1],
                  "customThree": self.fieldsArray[index][2],
                  "number": i
                });
                index++;
              }
            //});
          } else {
            for (var i = self.begin; i <= self.end; i++) {
              self.fields.push({
                "title": i,
                "customOne": $scope.customOne,
                "customTwo": $scope.customTwo,
                "customThree": $scope.customThree,
                "number": i
              });
            }
          }
        }
        deferred.resolve();
      }, 1000);

      return deferred.promise;
    }

    function _csvToArray() {
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
