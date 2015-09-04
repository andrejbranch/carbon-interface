angular.module('storage.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/storage',
                name: 'storage',
                templateUrl: 'common/layout/carbon-layout.html',
                children: [
                    {
                        url: '/index',
                        name: 'index',
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
                    },
                    {
                        url: '/division/:id',
                        name: 'division',
                        templateUrl: 'storage/views/storage-division-tpl.html',
                        controller: 'storageDivisionCtrl',
                        data: {
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            }
                        },
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
                    }
                ]
            })
        ;

    })

;
