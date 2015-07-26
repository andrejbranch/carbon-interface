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
    'permission',
    'ngCookies',
    'form',
    'button',
    'ngImgCrop',
    'blueimp.fileupload',
    'datatables'
]);

angular.module('carbonApp').run(
    function($rootScope, $state) {
        $rootScope.$state = $state;
    }
);
