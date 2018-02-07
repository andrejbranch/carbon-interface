angular.module('production.westernGel.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/analysis/western-gel',
                name: 'production_western_gel',
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
                        pageTitle: 'Western Gel Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/western-gel/views/western-gel-production-index-tpl.html',
                                controller: 'westernGelProductionCtrl',
                                resolve: {

                                    westernGelProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('westernGelProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Western Gel Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/western-gel/views/western-gel-production-detail-tpl.html',
                                controller: 'westernGelProductionDetailCtrl',
                                resolve: {

                                    westernGelRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/western-gel-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, westernGelRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/western-gel-request-project/western-gel-request/', 'projectGridFactory', westernGelRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, westernGelRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/western-gel-request-input-sample/western-gel-request/', 'sampleGridFactory', westernGelRequest, false
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
                                templateUrl: 'production/western-gel/views/western-gel-production-complete-tpl.html',
                                controller: 'westernGelProductionCompleteCtrl',
                                resolve: {

                                    westernGelRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/western-gel-request?id[EQ]=' + $stateParams.id);

                                    },

                                    westernGelSampleType: function ($cbResource) {

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
