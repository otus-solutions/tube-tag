(function() {
  'use strict';

  angular
    .module('tubeTagGenerator')
    .directive('fileUpload', FileUpload);

  FileUpload.$inject = ['UploadService'];

  function FileUpload(UploadService) {
    var ddo = {
      restrict: 'A',
      link: linkFunction
    };
    return ddo;

    function linkFunction($scope, $element, $attrs) {
      var fileUploadElement;

      $element.on('click', function() {
        fileUploadElement = _createInput();
        fileUploadElement.click();
        fileUploadElement.addEventListener('change', function() {
          var fileToUpload = this.files[0];
          var button = angular.element($element[0].querySelector('button#uploadButton'));
          var input = angular.element($element[0].querySelector('input#fileInput'));

          if (_comprova_extensao(fileToUpload.name)) {
            _uploadSurveyTemplate(fileToUpload);
            //input.click();
            //button.bind('click', function(e) {
              $scope.$apply(function() {
                var files = fileToUpload;
                if (files) {
                  $scope.fileName = fileToUpload.name;
                } else {
                  $scope.fileName = null;
                }
              });
            //});
          }



        });
      });

      function _uploadSurveyTemplate(fileToUpload) {
        UploadService.upload(fileToUpload);
      }

      function _comprova_extensao(arquivo) {
        var extensoes_permitidas = new Array(".csv");
        var extensao = (arquivo.substring(arquivo.lastIndexOf("."))).toLowerCase();
        var permitida = false;
        for (var i = 0; i < extensoes_permitidas.length; i++) {
          if (extensoes_permitidas[i] == extensao) {
            permitida = true;
            break;
          }
        }
        return permitida;
      }

      function _createInput() {
        fileUploadElement = document.createElement('input');
        fileUploadElement.setAttribute('type', 'file');
        fileUploadElement.setAttribute('accept', '.csv');
        return fileUploadElement;
      }


      function _chooseFile() {
          $scope.fileName = 'Selecione o arquivo utilizando o botão para realizar o upload';
          var button = angular.element(element[0].querySelector('button#uploadButton'));
          var input = angular.element(element[0].querySelector('input#fileInput'));

          if (input.length && button.length) {
            button.bind('click', function() {
              input[0].click();
            });
          }

          input.bind('change', function(e) {
            $scope.$apply(function() {
              var files = e.target.files;
              if (files[0]) {
                $scope.fileName = files[0].name;
              } else {
                $scope.fileName = null;
              }
            });
          });
        }

    }
  }

})();
