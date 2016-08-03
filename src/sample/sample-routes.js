angular.module('sample.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/sample',
                name: 'sample',
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
                                templateUrl: 'sample/views/sample-index-tpl.html',
                                controller: 'sampleIndexCtrl',
                                data: {
                                    pageTitle: 'Samples',
                                },
                                resolve: {

                                    grid: function (sampleGridFactory) {

                                        return sampleGridFactory.getIndexGrid();

                                    },

                                    sampleTypes: function ($cbResource) {

                                        return $cbResource.get('/sample-type');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-detail-tpl.html',
                                controller: 'sampleDetailCtrl',
                                data: {
                                    pageTitle: 'Sample ',
                                },
                                resolve: {

                                    sample: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/sample?id[EQ]=' + $stateParams.id);

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
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-import-tpl.html',
                                controller: 'sampleImportCtrl',
                                data: {
                                    pageTitle: 'Sample Import',
                                },
                                resolve: {

                                    sampleType: function ($stateParams, $cbResource) {

                                        return $cbResource.getOne('/sample-type', {'id[EQ]': $stateParams.sampleTypeId});

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
