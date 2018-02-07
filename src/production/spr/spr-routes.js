angular.module('production.spr.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/analysis/spr',
                name: 'production_spr',
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
                        pageTitle: 'SPR Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/spr/views/spr-production-index-tpl.html',
                                controller: 'sprProductionCtrl',
                                resolve: {

                                    sprProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('sprProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'SPR Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/spr/views/spr-production-detail-tpl.html',
                                controller: 'sprProductionDetailCtrl',
                                resolve: {

                                    sprRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/spr-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, sprRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/spr-request-project/spr-request/', 'projectGridFactory', sprRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, sprRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/spr-request-input-sample/spr-request/', 'sampleGridFactory', sprRequest, false
                                        );

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id/complete',
                        name: 'complete',
                        pageTitle: 'Gel Production {id} Complete',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/spr/views/spr-production-complete-tpl.html',
                                controller: 'sprProductionCompleteCtrl',
                                resolve: {

                                    sprRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/spr-request?id[EQ]=' + $stateParams.id);

                                    },

                                    sprSampleType: function ($cbResource) {

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
