angular.module('carbonConfig', ['toastr'])

    .constant('API', {
        url: 'http://andre.dev.carbon.com',
        apiKeyParam: 'apikey'
    })

    // override toastr configs
    .config(['toastrConfig', function (toastrConfig) {

        angular.extend(toastrConfig, {
            closeButton: true,
            extendedTimeOut: 1000,
            maxOpened: 0,
            positionClass: 'toast-top-right',
            progressBar: true,
            timeOut: 3000,
        });

    }])

    .config(['$urlRouterProvider', function($urlRouterProvider) {

        $urlRouterProvider.otherwise('/profile/index');

    }])

    // .config(['$locationProvider', function($locationProvider) {

    //     $locationProvider.html5Mode({
    //         enabled: true,
    //         requireBase: false
    //     });

    // }])

    .run(['$rootScope', '$location', function ($rootScope, $location) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
            if (fromState.name !== "") {
                $location.url($location.path());
            }
        });

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

    }])
;
