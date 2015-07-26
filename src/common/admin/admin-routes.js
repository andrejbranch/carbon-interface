angular.module('admin.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/administrator',
                name: 'admin',
                templateUrl: 'common/layout/carbon-layout.html',
                children: [
                    {
                        url: '/index',
                        name: 'index',
                        templateUrl: 'common/admin/admin-tpl.html',
                        controller: 'adminCtrl',
                        data: {
                            pageTitle: 'Administrator',
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            },
                        },
                        resolve: {

                            users: function (adminFactory) {

                                return adminFactory.getUsers();

                            }

                        }
                    }
                ]
            })
        ;

    })

;
