angular.module('project.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/project',
                name: 'project',
                templateUrl: 'common/layout/carbon-layout.html',
                children: [
                    {
                        url: '/index',
                        name: 'index',
                        templateUrl: 'project/views/project-index-tpl.html',
                        controller: 'projectIndexCtrl',
                        data: {
                            pageTitle: 'Projects',
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            },
                        },
                        resolve: {

                            projectResponse: function (projectFactory) {

                                return projectFactory.getProjects();

                            },

                        }
                    }
                ]
            })
        ;

    })

;
