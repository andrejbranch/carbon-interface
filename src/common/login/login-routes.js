angular.module('login.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                url: '/login',
                name: 'login',
                templateUrl: 'common/login/login-tpl.html',
                controller: 'loginCtrl',
                data: { pageTitle: 'Login', specialClass: 'gray-bg' }
            })
        ;

    })

;
