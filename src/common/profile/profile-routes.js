angular.module('profile.routes', [])
    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/profile',
                name: 'profile',
                templateUrl: 'common/layout/carbon-layout.html',
                children: [
                    {
                        templateUrl: 'common/profile/profile-tpl.html',
                        controller: 'profileCtrl',
                        url: '/index',
                        name: 'index',
                        data: {
                            pageTitle: 'Profile',
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            }
                        },
                    }
                ]
            })
        ;

    })
;