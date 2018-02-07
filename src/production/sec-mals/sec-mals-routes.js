angular.module('production.secMals.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/analysis/sec-mals',
                name: 'production_sec_mals',
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
                        pageTitle: 'SEC MALS Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/sec-mals/views/sec-mals-production-index-tpl.html',
                                controller: 'secMalsProductionCtrl',
                                resolve: {

                                    secMalsProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('secMalsProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'SEC MALS Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/sec-mals/views/sec-mals-production-detail-tpl.html',
                                controller: 'secMalsProductionDetailCtrl',
                                resolve: {

                                    secMalsRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/sec-mals-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, secMalsRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/sec-mals-request-project/sec-mals-request/', 'projectGridFactory', secMalsRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, secMalsRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/sec-mals-request-input-sample/sec-mals-request/', 'sampleGridFactory', secMalsRequest, false
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
                                templateUrl: 'production/sec-mals/views/sec-mals-production-complete-tpl.html',
                                controller: 'secMalsProductionCompleteCtrl',
                                resolve: {

                                    secMalsRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/sec-mals-request?id[EQ]=' + $stateParams.id);

                                    },

                                    secMalsSampleType: function ($cbResource) {

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
