(function() {
    'use strict';

    angular
      .module('tubeTagGenerator')
      .component('participantLabel', {
          transclude: true,
          templateUrl: 'app/participant-label/participant-label-template.html',
          controller: Controller,
          bindings: {
            base: '<'
          }
      });

      Controller.$inject = [
        '$scope',
        '$element',
        '$compile'
      ];

      function Controller($scope, $element, $compile) {
        var self = this;
        var BARCODE_SETTINGS = {
          format: 'CODE39',
          width: 1.1,
          height: 15,
          displayValue: true,
          font: "monospace",
          textAlign: "center",
          fontSize: 10,
          //   backgroundColor: "",
          //   lineColor: "#000"
        }
        self.renderBarcode = renderBarcode;
        self.BaseInfo = angular.copy(self.base);

        self.$onInit = function() {
          $compile($element.contents())($scope);
          renderBarcode();
        };

        function renderBarcode() {
          var barcodeContainer = $element.find('svg')[0];
          JsBarcode(barcodeContainer, self.base.recruitment_number, BARCODE_SETTINGS);
        }
      }
}());
