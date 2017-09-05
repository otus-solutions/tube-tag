(function() {
    'use strict';
    angular
      .module('tubeTagGenerator')
      .service('LoadingScreenService', Service);
    Service.$inject = [];

    function Service() {
      var self = this;
      var MESSAGE = 'Por favor, aguarde o carregamento.';

      /* Lifecycle hooks */
      self.$onInit = onInit;

      /* Public methods */
      self.start = start;
      self.finish = finish;
      self.changeMessage = changeMessage;

      /* Lifecycle methods */
      function onInit() {
        self.loading_screen = null;
        self.message = MESSAGE;
        // changeMessage();
      }

      function start() {
        if (!self.loading_screen)
          _constructor();
      }

      function finish() {
        if (self.loading_screen) {
          self.loading_screen.finish();
          self.loading_screen = null;
        }
      }

      function changeMessage(message) {
        self.message = message !== undefined ? message : MESSAGE;
      }

      function _constructor() {
        self.loading_screen = pleaseWait({
            logo: "app/static-resource/image/freecode.jpg",
            backgroundColor: '#8EC0F5',
            loadingHtml: "<p class='loading-message' style='color:#000;'>Por favor, aguarde o carregamento.</p>" +
              "<div class = 'sk-spinner sk-spinner-wave' >" +
              "<div class = 'sk-rect1' > </div>" +
              "<div class = 'sk-rect2' > </div>" +
              "<div class = 'sk-rect3' > </div>" +
              "<div class = 'sk-rect4' > </div>" +
              "<div class = 'sk-rect5' > </div>" +
              "</div>"
          });
        }
      }
      }());
