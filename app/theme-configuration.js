(function() {
  'use strict';

  angular
    .module('tubeTagGenerator')
    .config(Configuration);

  Configuration.$inject = [
    '$mdIconProvider'
  ];

  function Configuration($mdIconProvider) {

    /*Configuration icons*/
    /* 24 is the size default of icons */
    $mdIconProvider.defaultIconSet('app/static-resource/image/icons/mdi.svg', 24);
  }
}());
