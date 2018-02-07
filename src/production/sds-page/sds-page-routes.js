angular.module('production.sdsPage.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/analysis/sds-page',
                name: 'production_sds_page',
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
                        pageTitle: 'SDS Page Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/sds-page/views/sds-page-production-index-tpl.html',
                                controller: 'sdsPageProductionCtrl',
                                resolve: {

                                    sdsPageProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('sdsPageProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'SDS Page Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/sds-page/views/sds-page-production-detail-tpl.html',
                                controller: 'sdsPageProductionDetailCtrl',
                                resolve: {

                                    sdsPageRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/sds-page-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, sdsPageRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/sds-page-request-project/sds-page-request/', 'projectGridFactory', sdsPageRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, sdsPageRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/sds-page-request-input-sample/sds-page-request/', 'sampleGridFactory', sdsPageRequest, false
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
                                templateUrl: 'production/sds-page/views/sds-page-production-complete-tpl.html',
                                controller: 'sdsPageProductionCompleteCtrl',
                                resolve: {

                                    sdsPageRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/sds-page-request?id[EQ]=' + $stateParams.id);

                                    },

                                    sdsPageSampleType: function ($cbResource) {

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
