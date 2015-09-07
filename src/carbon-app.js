var carbonApp = angular.module('carbonApp', [
    'ui.router',
    'ui.bootstrap',
    'templates',
    'common',
    'carbonAppDirectives',
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
    'treeControl',
    'ui-rangeSlider'
]);

angular.module('carbonApp').run(
    function($rootScope, $state) {
        $rootScope.$state = $state;
    }
);
