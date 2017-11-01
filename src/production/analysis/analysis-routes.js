angular.module('production.analysis.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/analysis',
                name: 'production_analysis',
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
                        pageTitle: 'Analysis Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/analysis/views/analysis-production-index-tpl.html',
                                controller: 'analysisProductionCtrl',
                                resolve: {

                                    analysisProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('analysisProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Analysis Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/analysis/views/analysis-production-detail-tpl.html',
                                controller: 'analysisProductionDetailCtrl',
                                resolve: {

                                    analysisRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, analysisRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis-request-project/analysis-request/', 'projectGridFactory', analysisRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, analysisRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis-request-input-sample/analysis-request/', 'sampleGridFactory', analysisRequest, false
                                        );

                                    },

                                    outputSampleGrid: function ($cbGridBuilder, analysisRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis-request-output-sample/analysis-request/', 'sampleGridFactory', analysisRequest, false
                                        );

                                    }

                                }
                            }
                        }
                    }
                    // {
                    //     url: '/:id/complete',
                    //     name: 'complete',
                    //     pageTitle: 'DNA Production {id} Complete',
                    //     security: {
                    //         roles: ['ROLE_USER']
                    //     },
                    //     views: {
                    //         content: {
                    //             templateUrl: 'production/dna/views/dna-production-complete-tpl.html',
                    //             controller: 'dnaProductionCompleteCtrl',
                    //             resolve: {

                    //                 dnaRequest: function ($cbResource, $stateParams) {

                    //                     return $cbResource.getOne('/production/dna?id[EQ]=' + $stateParams.id);

                    //                 },

                    //                 dnaSampleType: function ($cbResource) {

                    //                     return $cbResource.getOne('/storage/sample-type?id[EQ]=1');

                    //                 }

                    //             }
                    //         }
                    //     }
                    // }
                ]
            })
        ;

    })

;
