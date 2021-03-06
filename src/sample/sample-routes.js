angular.module('sample.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/storage/sample',
                name: 'sample',
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
                        pageTitle: 'Samples',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-index-tpl.html',
                                controller: 'sampleIndexCtrl',
                                resolve: {

                                    grid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('sampleGridFactory');

                                    },

                                    sampleTypes: function ($cbResource) {

                                        return $cbResource.get('/storage/sample-type');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/import',
                        name: 'import',
                        pageTitle: 'Sample Import',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-import-tpl.html',
                                controller: 'sampleImportCtrl',
                                resolve: {

                                    sampleTypes: function ($stateParams, $cbResource) {

                                        return $cbResource.get('/storage/sample-type', {cPerPage:1000});

                                    },

                                    sampleTypeHelpGrid: function (sampleTypeGridFactory) {

                                        return sampleTypeGridFactory.getHelpGrid();

                                    }

                                }

                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Sample {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-detail-tpl.html',
                                controller: 'sampleDetailCtrl',
                                resolve: {

                                    sample: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/storage/sample?id[EQ]=' + $stateParams.id);

                                    },

                                    linkedSamplesGrid: function ($cbGridBuilder, sample) {

                                        return $cbGridBuilder.buildOTM(
                                            '/storage/sample-linked-sample/', 'sampleGridFactory', sample, false
                                        );

                                    },

                                    tags: function ($cbGridBuilder, sample) {

                                        return $cbGridBuilder.buildOTM(
                                            '/storage/sample-tag/sample/', 'tagGridFactory', sample, false
                                        );

                                    },

                                    projectGrid: function ($cbGridBuilder, sample) {

                                        return $cbGridBuilder.buildOTM(
                                            '/storage/project-sample/sample/', 'projectGridFactory', sample, false
                                        )

                                    }

                                }
                            }
                        }
                    },
                ]
            })
        ;

    })

;
