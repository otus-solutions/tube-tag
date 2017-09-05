(function() {
  'use strict';
  angular
    .module('tubeTagGenerator')
    .directive('ngCsvImport', function() {
      return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
          content: '=?',
          header: '=?',
          headerVisible: '=?',
          separator: '=?',
          separatorVisible: '=?',
          result: '=?',
          encoding: '=?',
          encodingVisible: '=?'
        },
        templateUrl: 'app/component/file-upload-template.html',
        link: function(scope, element) {
          scope.separatorVisible = scope.separatorVisible || false;
          scope.headerVisible = scope.headerVisible || false;
          var input = $(element[0].querySelector('#fileInput'));
          var button = $(element[0].querySelector('#uploadButton'));
          var textInput = $(element[0].querySelector('#textInput'));

          if (input.length && button.length && textInput.length) {
            button.click(function(e) {
              input.click();
            });
            textInput.click(function(e) {
              input.click();
            });
          }

          input.on('change', function(e) {
            var files = e.target.files;
            if (files[0]) {
              scope.fileName = files[0].name;
            } else {
              scope.fileName = null;
            }
            scope.$apply();
          });

          angular.element(element[0].querySelector('.separator-input')).on('keyup', function(e) {
            if (scope.content != null) {
              var content = {
                csv: scope.content,
                header: scope.header,
                separator: e.target.value,
                encoding: scope.encoding
              };
              scope.result = csvToJSON(content);
              scope.$apply();
            }
          });

          element.on('change', function(onChangeEvent) {
            var reader = new FileReader();
            scope.filename = onChangeEvent.target.files[0].name;
            reader.onload = function(onLoadEvent) {
              scope.$apply(function() {
                var content = {
                  csv: onLoadEvent.target.result.replace(/\r\n|\r/g, '\n'),
                  header: scope.header,
                  separator: scope.separator
                };
                scope.content = content.csv;
                scope.result = csvToJSON(content);
                scope.result.filename = scope.filename;
              });
            };

            if ((onChangeEvent.target.type === "file") && (onChangeEvent.target.files != null || onChangeEvent.srcElement.files != null)) {
              reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0], scope.encoding);
            } else {
              if (scope.content != null) {
                var content = {
                  csv: scope.content,
                  header: !scope.header,
                  separator: scope.separator
                };
                scope.result = csvToJSON(content);
              }
            }
          });

          var csvToJSON = function(content) {
            var lines = content.csv.split('\n');
            var result = [];
            var start = 0;
            var columnCount = lines[0].split(content.separator).length;

            var headers = [];
            if (content.header) {
              headers = lines[0].split(content.separator);
              start = 1;
            }

            for (var i = start; i < lines.length; i++) {
              var obj = {};
              var currentline = lines[i].split(new RegExp(content.separator + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
              if (currentline.length === columnCount) {
                if (content.header) {
                  for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                  }
                } else {
                  for (var k = 0; k < currentline.length; k++) {
                    obj[k] = currentline[k];
                  }
                }
                result.push(obj);
              }
            }
            return result;
          };
        }
      };
    });
}());
