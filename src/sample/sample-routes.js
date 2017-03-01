angular.module('sample.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/storage/sample',
                name: 'sample',
                views: {
                    navbar: {
                        templateUrl: 'navbar-tpl.html',
                    },
                    content: {
                        templateUrl: 'common/layout/carbon-layout.html',
                    }
                },
                children: [
                    {
                        url: '/index',
                        name: 'index',
                        pageTitle: 'Samples',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-index-tpl.html',
                                controller: 'sampleIndexCtrl',
                                resolve: {

                                    grid: function (sampleGridFactory) {

                                        return sampleGridFactory.getIndexGrid();

                                    },

                                    sampleTypes: function ($cbResource) {

                                        return $cbResource.get('/storage/sample-type');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Sample {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-detail-tpl.html',
                                controller: 'sampleDetailCtrl',
                                resolve: {

                                    sample: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/storage/sample?id[EQ]=' + $stateParams.id);

                                    },

                                    linkedSamplesGrid: function (sampleGridFactory, sample) {

                                        return sampleGridFactory.getOneToManyGrid(sample.id, false);

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/import/:sampleTypeId',
                        name: 'import',
                        pageTitle: 'Sample Import',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-import-tpl.html',
                                controller: 'sampleImportCtrl',
                                resolve: {

                                    sampleType: function ($stateParams, $cbResource) {

                                        return $cbResource.getOne('/storage/sample-type', {'id[EQ]': $stateParams.sampleTypeId});

                                    }

                                }

                            }
                        }
                    }
                ]
            })
        ;

    })

;
