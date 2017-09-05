(function() {
    'use strict';

    angular
        .module('tubeTagGenerator')
        .service('UploadService', UploadService);

    UploadService.$inject = [
        '$mdToast'
    ];

    function UploadService($mdToast) {
        var self = this;
        var jsonReaded;

        self.upload = upload;

        function upload(fileSurveyTemplate) {
            var reader = new FileReader();
            reader.readAsText(fileSurveyTemplate);

            reader.onload = function() {
                jsonReaded = reader.result;
                console.log(jsonReaded);
              

                // promise.then(function(value) {
                //     if (value) {
                //         $mdToast.show($mdToast.simple().textContent('Upload realizado com sucesso!'));
                //     }
                // }, function(error) {
                //     $mdToast.show($mdToast.simple().textContent(_getErrorMessage(error)));
                // });

            };
        }

        function _getErrorMessage(error) {
            var message;
            switch (error) {
                case 'Key already exists in the object store.':
                    message = 'Esse template já existe.';
                    break;
                default:
                    message = 'Ocorreu um erro ao realizar o upload';
            }
            return message;
        }
    }

})();
