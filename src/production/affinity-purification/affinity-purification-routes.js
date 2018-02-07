angular.module('production.affinityPurification.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/purification/affinity-purification',
                name: 'production_affinity_purification',
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
                        pageTitle: 'Affinity Purification Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/affinity-purification/views/affinity-purification-production-index-tpl.html',
                                controller: 'affinityPurificationProductionCtrl',
                                resolve: {

                                    affinityPurificationProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('affinityPurificationProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Affinity Purification Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/affinity-purification/views/affinity-purification-production-detail-tpl.html',
                                controller: 'affinityPurificationProductionDetailCtrl',
                                resolve: {

                                    affinityPurificationRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/purification/affinity-purification-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, affinityPurificationRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/purification/affinity-purification-request-project/affinity-purification-request/', 'projectGridFactory', affinityPurificationRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, affinityPurificationRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/purification/affinity-purification-request-input-sample/affinity-purification-request/', 'sampleGridFactory', affinityPurificationRequest, false
                                        );

                                    },

                                    outputSampleGrid: function ($cbGridBuilder, affinityPurificationRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/purification/affinity-purification-request-output-sample/affinity-purification-request/', 'sampleGridFactory', affinityPurificationRequest, false
                                        );

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id/complete',
                        name: 'complete',
                        pageTitle: 'Purification Production {id} Complete',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/affinity-purification/views/affinity-purification-production-complete-tpl.html',
                                controller: 'purificationProductionCompleteCtrl',
                                resolve: {

                                    affinityPurificationRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/purification/affinity-purification-request?id[EQ]=' + $stateParams.id);

                                    },

                                    purificationSampleType: function ($cbResource) {

                                        return $cbResource.getOne('/storage/sample-type?id[EQ]=2');

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
