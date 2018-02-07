angular.module('production.nativeGel.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/analysis/native-gel',
                name: 'production_native_gel',
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
                        pageTitle: 'Native Gel Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/native-gel/views/native-gel-production-index-tpl.html',
                                controller: 'nativeGelProductionCtrl',
                                resolve: {

                                    nativeGelProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('nativeGelProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Native Gel Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/native-gel/views/native-gel-production-detail-tpl.html',
                                controller: 'nativeGelProductionDetailCtrl',
                                resolve: {

                                    nativeGelRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/native-gel-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, nativeGelRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/native-gel-request-project/native-gel-request/', 'projectGridFactory', nativeGelRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, nativeGelRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/analysis/native-gel-request-input-sample/native-gel-request/', 'sampleGridFactory', nativeGelRequest, false
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
                                templateUrl: 'production/native-gel/views/native-gel-production-complete-tpl.html',
                                controller: 'nativeGelProductionCompleteCtrl',
                                resolve: {

                                    nativeGelRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/analysis/native-gel-request?id[EQ]=' + $stateParams.id);

                                    },

                                    nativeGelSampleType: function ($cbResource) {

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
