angular.module('project.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/project',
                name: 'project',
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
                        pageTitle: 'Projects',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'project/views/project-index-tpl.html',
                                controller: 'projectIndexCtrl',
                                resolve: {

                                    grid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('projectGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Project {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'project/views/project-detail-tpl.html',
                                controller: 'projectDetailCtrl',
                                resolve: {

                                    project: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/project?id[EQ]=' + $stateParams.id);

                                    },

                                    sampleGrid: function ($cbGridBuilder, project) {

                                        return $cbGridBuilder.buildOTM(
                                            '/storage/project-sample/project/', 'sampleGridFactory', project, false
                                        )

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
