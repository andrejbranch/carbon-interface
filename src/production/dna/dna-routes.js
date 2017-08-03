angular.module('production.dna.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/production/dna',
                name: 'production_dna',
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
                        pageTitle: 'DNA Production Requests',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'production/dna/views/dna-production-index-tpl.html',
                                controller: 'dnaProductionCtrl',
                                resolve: {

                                    dnaProductionGrid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('dnaProductionGridFactory');

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
