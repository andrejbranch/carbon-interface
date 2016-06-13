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
    'sample',
    'treeControl',
    'ui-rangeSlider',
    'fiestah.money',
    'ui.bootstrap.typeahead',
    'ui.bootstrap.tabs'
]);

angular.module('carbonApp').run(
    function($rootScope, $state) {
        $rootScope.$state = $state;
    }
);
