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
                        views: {
                            content: {
                                templateUrl: 'storage/views/storage-index-tpl.html',
                                controller: 'storageIndexCtrl',
                                data: {
                                    pageTitle: 'Storage',
                                    permissions: {
                                        except: ['anonymous'],
                                        redirectTo: 'login'
                                    },
                                },
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
                        data: {
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            }
                        },
                        views: {
                            'content': {
                                templateUrl: 'storage/views/storage-division-index-tpl.html',
                                controller: 'storageDivisionCtrl',
                                resolve: {

                                    division: function (storageFactory, $stateParams) {

                                        this.data.pageTitle = 'Storage Division ' + $stateParams.id;

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
