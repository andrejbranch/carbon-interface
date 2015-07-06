angular.module('dashboard.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/index',
                name: 'dashboard',
                templateUrl: 'common/layout/carbon-layout.html',
                children: [
                    {
                        url: '/main',
                        name: 'main',
                        templateUrl: 'common/dashboard/dashboard-tpl.html',
                        controller: 'dashboardCtrl',
                        data: {
                            pageTitle: 'Example view',
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            },
                        }
                    }
                ]
            })
        ;

    })

;
