angular.module('carbonApp', [
    'ui.router',
    'ui.bootstrap',
    'templates',
    'mainCtrl',
    'login',
]);

angular.module('carbonApp').run(
    function($rootScope, $state) {
        $rootScope.$state = $state;
    }
);
