angular.module('production.sizeExclusionPurification.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/purification/size-exclusion-purification',
                name: 'production_size_exclusion_purification',
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
                        pageTitle: 'Size Exclusion Purification Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/size-exclusion-purification/views/size-exclusion-purification-production-index-tpl.html',
                                controller: 'sizeExclusionPurificationProductionCtrl',
                                resolve: {

                                    sizeExclusionPurificationProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('sizeExclusionPurificationProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Size Exclusion Purification Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/size-exclusion-purification/views/size-exclusion-purification-production-detail-tpl.html',
                                controller: 'sizeExclusionPurificationProductionDetailCtrl',
                                resolve: {

                                    sizeExclusionPurificationRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/purification/size-exclusion-purification-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, sizeExclusionPurificationRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/purification/size-exclusion-purification-request-project/size-exclusion-purification-request/', 'projectGridFactory', sizeExclusionPurificationRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, sizeExclusionPurificationRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/purification/size-exclusion-purification-request-input-sample/size-exclusion-purification-request/', 'sampleGridFactory', sizeExclusionPurificationRequest, false
                                        );

                                    },

                                    outputSampleGrid: function ($cbGridBuilder, sizeExclusionPurificationRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/purification/size-exclusion-purification-request-output-sample/size-exclusion-purification-request/', 'sampleGridFactory', sizeExclusionPurificationRequest, false
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
                                templateUrl: 'production/size-exclusion-purification/views/size-exclusion-purification-production-complete-tpl.html',
                                controller: 'purificationProductionCompleteCtrl',
                                resolve: {

                                    sizeExclusionPurificationRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/purification/size-exclusion-purification-request?id[EQ]=' + $stateParams.id);

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
