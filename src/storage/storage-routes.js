angular.module('storage.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/storage',
                name: 'storage',
                views: {
                    content: {
                        templateUrl: 'common/layout/carbon-layout.html',
                    }
                },
                children: [
                    {
                        url: '/index',
                        name: 'index',
                        pageTitle: 'Storage Divisions',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'storage/views/storage-index-tpl.html',
                                controller: 'storageIndexCtrl',
                                resolve: {

                                    divisionResponse: function (storageFactory) {

                                        return storageFactory.getParentDivisions();

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/division/:id',
                        name: 'division',
                        pageTitle: 'Storage Division {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            'content': {
                                templateUrl: 'storage/views/storage-division-index-tpl.html',
                                controller: 'storageDivisionCtrl',
                                resolve: {

                                    division: function (storageFactory, $stateParams) {

                                        return storageFactory.getDivision($stateParams.id).then(

                                            function(response) {

                                                return response.data[0];
                                            }

                                        );

                                    },

                                    childrenResponse: function (storageFactory, $stateParams) {

                                        return storageFactory.getDivisionChildren($stateParams.id);

                                    }

                                }
                            },
                            'division-details@storage.division': {

                                templateUrl: 'storage/views/storage-division-details-tpl.html',
                                controller: 'storageDivisionDetailsCtrl',
                                resolve: {

                                    division: function (storageFactory, $stateParams) {

                                        return storageFactory.getDivision($stateParams.id).then(

                                            function(response) {

                                                return response.data[0];
                                            }

                                        );

                                    }

                                }

                            },
                            'navigation@storage.division': {

                                templateUrl: 'storage/views/storage-navigation-tpl.html',
                                controller: 'storageNavigationCtrl',
                                resolve: {

                                    divisionResponse: function (storageFactory) {

                                        return storageFactory.getParentDivisions();

                                    },

                                    division: function (storageFactory, $stateParams) {

                                        return storageFactory.getDivision($stateParams.id).then(

                                            function(response) {

                                                return response.data[0];
                                            }

                                        );

                                    }

                                }

                            },
                            'division@storage.division': {

                                templateUrl: 'storage/views/storage-division-tpl.html',

                            }
                        }

                    }
                ]
            })
        ;

    })

;
