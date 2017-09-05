(function() {
  'use strict';

  angular
    .module('tubeTagGenerator')
    .service('UploadService', UploadService);

  function UploadService() {
    var self = this;
    self.csvReaded;
    self.getFile = getFile;
    self.upload = upload;

    function upload(fileSurveyTemplate) {
      var reader = new FileReader();
      reader.readAsText(fileSurveyTemplate);
      reader.onload = function() {
        self.csvReaded = reader.result;
      };
    }

    function getFile() {
      return self.csvReaded;
    }
  }
  
})();
