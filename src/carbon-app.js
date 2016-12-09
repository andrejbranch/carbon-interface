var carbonApp = angular.module('carbonApp', [
    'ui.router',
    'ui.bootstrap',
    'cryoblock.common.templates',
    'templates',
    'common',
    'ngStorage',
    'carbonConfig',
    'toastr',
    'angular-loading-bar',
    'ngCookies',
    'form',
    'button',
    'ngImgCrop',
    'blueimp.fileupload',
    'datatables',
    'ngMessages',
    'project',
    'storage',
    'sample',
    'sampleType',
    'storageContainer',
    'treeControl',
    'ui-rangeSlider',
    'fiestah.money',
    'ui.bootstrap.typeahead',
    'ui.bootstrap.tabs',
    'comment'
]);

angular.module('carbonApp').run(
    function($rootScope, $state) {
        $rootScope.$state = $state;
    }
);
