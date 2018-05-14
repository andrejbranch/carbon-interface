angular.module('tag.routes', ['ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/tag',
                name: 'tag',
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
                        pageTitle: 'Tags',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'tag/views/tag-index-tpl.html',
                                controller: 'tagIndexCtrl',
                                resolve: {

                                    grid: function ($cbGridBuilder)  {

                                        return $cbGridBuilder.buildIndex('tagGridFactory');

                                    }

                                }
                            }
                        }
                    },
                    {
                        url: '/:id',
                        name: 'detail',
                        pageTitle: 'Tag {id}',
                        security: {
                            roles: ['ROLE_USER']
                        },
                        views: {
                            content: {
                                templateUrl: 'tag/views/tag-detail-tpl.html',
                                controller: 'tagDetailCtrl',
                                resolve: {

                                    tag: function ($cbResource, $stateParams) {

                                        return $cbResource.getOne('/storage/tag?id[EQ]=' + $stateParams.id);

                                    },

                                    samples: function ($cbGridBuilder, tag) {

                                        return $cbGridBuilder.buildOTM(
                                            '/storage/sample-tag/tag/', 'sampleGridFactory', tag, false
                                        );

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
