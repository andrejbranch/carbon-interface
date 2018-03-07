angular.module('production.protein.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/protein',
                name: 'production_protein',
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
                        pageTitle: 'Protein Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/protein/views/protein-production-index-tpl.html',
                                controller: 'proteinProductionCtrl',
                                resolve: {

                                    proteinProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('proteinProductionGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Protein Production Request {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/protein/views/protein-production-detail-tpl.html',
                                controller: 'proteinProductionDetailCtrl',
                                resolve: {

                                    proteinRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/protein-request?id[EQ]=' + $stateParams.id);

                                    },

                                    projectGrid: function ($cbGridBuilder, proteinRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/protein-request-project/protein-request/', 'projectGridFactory', proteinRequest, false
                                        );

                                    },

                                    inputSampleGrid: function ($cbGridBuilder, proteinRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/protein-request-input-sample/protein-request/', 'sampleGridFactory', proteinRequest, false
                                        );

                                    },

                                    outputSampleGrid: function ($cbGridBuilder, proteinRequest) {

                                        return $cbGridBuilder.buildOTM(
                                            '/production/protein-request-output-sample/protein-request/', 'sampleGridFactory', proteinRequest, false
                                        );

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id/complete',
                        name: 'complete',
                        pageTitle: 'Protein Production {id} Complete',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/protein/views/protein-production-complete-tpl.html',
                                controller: 'proteinProductionCompleteCtrl',
                                resolve: {

                                    proteinRequest: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/protein-request?id[EQ]=' + $stateParams.id);

                                    },

                                    proteinSampleType: function ($cbResource) {

                                        return $cbResource.getOne('/storage/sample-type?id[EQ]=2');

                                    },

                                    dnaSampleType: function ($cbResource) {

                                        return $cbResource.getOne('/storage/sample-type?id[EQ]=1');

                                    },

                                    catalogData: function ($cbResource, proteinRequest) {

                                        var data = {
                                            id: proteinRequest.id,
                                            entity: "AppBundle\\Entity\\Production\\ProteinRequest"
                                        };

                                        return $cbResource.create('/production/catalog-name-decide', data);

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
