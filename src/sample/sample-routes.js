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

                                    sampleResponse: function (sampleFactory) {

                                        return sampleFactory.getSamples({perPage:25});

                                    },

                                    grid: function (sampleResponse, sampleGridFactory) {

                                        return sampleGridFactory.getIndexGrid(sampleResponse);

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

                                    sample: function (sampleFactory, $stateParams) {

                                        return sampleFactory.getSample({id:$stateParams.id});

                                    },

                                    linkedSamplesGrid: function (sampleFactory, sampleGridFactory, sample) {

                                        return sampleFactory.getLinkedSamples(sample).then(function (response) {

                                            var grid = sampleGridFactory.getIndexGrid(response);

                                            grid
                                                .setResourceUrl('/sample-linked-sample/' + sample.id)
                                                .setPaginationFromResponse(response.data)
                                                .setResults(response.data.data)
                                                .setActionTemplate(null)
                                                .setNoResultString('No linked samples found')
                                                .disallowEdit()
                                            ;

                                            return grid;

                                        });

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
