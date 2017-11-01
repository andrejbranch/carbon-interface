angular.module('production.purification.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/purification',
                name: 'production_purification',
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
                        pageTitle: 'Purification Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/purification/views/purification-production-index-tpl.html',
                                controller: 'purificationProductionCtrl',
                                resolve: {

                                    purificationProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('purificationProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    // {
                    //     url: '/:id',
                    //     name: 'detail',
                    //     pageTitle: 'DNA Production Request {id}',
                    //     security: {
                    //         roles: ['ROLE_USER']
                    //     },
                    //     views: {
                    //         content: {
                    //             templateUrl: 'production/dna/views/dna-production-detail-tpl.html',
                    //             controller: 'dnaProductionDetailCtrl',
                    //             resolve: {

                    //                 dnaRequest: function ($cbResource, $stateParams) {

                    //                     return $cbResource.getOne('/production/dna?id[EQ]=' + $stateParams.id);

                    //                 },

                    //                 projectGrid: function ($cbGridBuilder, dnaRequest) {

                    //                     return $cbGridBuilder.buildOTM(
                    //                         '/production/dna-request-project/dna-request/', 'projectGridFactory', dnaRequest, false
                    //                     );

                    //                 },

                    //                 inputSampleGrid: function ($cbGridBuilder, dnaRequest) {

                    //                     return $cbGridBuilder.buildOTM(
                    //                         '/production/dna-request-sample/dna-request/', 'sampleGridFactory', dnaRequest, false
                    //                     );

                    //                 },

                    //                 outputSampleGrid: function ($cbGridBuilder, dnaRequest) {

                    //                     return $cbGridBuilder.buildOTM(
                    //                         '/production/dna-output-sample/dna-request/', 'sampleGridFactory', dnaRequest, false
                    //                     );

                    //                 }

                    //             }
                    //         }
                    //     }
                    // },
                    {
                        url: '/:id/complete',
                        name: 'complete',
                        pageTitle: 'Purification Production {id} Complete',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/purification/views/purification-production-complete-tpl.html',
                                controller: 'purificationProductionCompleteCtrl',
                                resolve: {

                                    purificationRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/purification-request?id[EQ]=' + $stateParams.id);

                                    },

                                    purificationSampleType: function ($cbResource, purificationRequest) {

                                        return $cbResource.get('/production/purification-request-input-sample/purification-request/' + purificationRequest.id).then(function (response) {
                                            return response.data[0].sampleType;
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
