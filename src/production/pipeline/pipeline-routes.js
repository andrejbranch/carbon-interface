angular.module('production.pipeline.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/pipeline',
                name: 'production_pipeline',
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
                        pageTitle: 'Production Pipeline',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/pipeline/views/production-pipeline-index-tpl.html',
                                controller: 'pipelineIndexCtrl',
                                resolve: {

                                    grid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('pipelineGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/create',
                        name: 'create',
                        pageTitle: 'Production Pipeline Creation',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/pipeline/views/production-pipeline-create-tpl.html',
                                controller: 'pipelineCreateCtrl',
                                resolve: {

                                    requests: function ($cbResource) {

                                        return $cbResource.get('/production/pipeline-request');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Pipeline {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/pipeline/views/pipeline-detail-tpl.html',
                                controller: 'pipelineDetailCtrl',
                                resolve: {

                                    pipeline: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/production/pipeline?id[EQ]=' + $stateParams.id);

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
