angular.module('protocol.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/protocol',
                name: 'protocol',
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
                        pageTitle: 'Protocols',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'protocol/views/protocol-index-tpl.html',
                                controller: 'protocolIndexCtrl',
                                resolve: {

                                    grid: function ($cbGridBuilder) {

                                        return $cbGridBuilder.buildIndex('protocolGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Protocol {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'protocol/views/protocol-detail-tpl.html',
                                controller: 'protocolDetailCtrl',
                                resolve: {

                                    protocol: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/protocol?id[EQ]=' + $stateParams.id);

                                    },

                                }
                            }
                        }
                    }
                ]
            })
        ;

    })

;
