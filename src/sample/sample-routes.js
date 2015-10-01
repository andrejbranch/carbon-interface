angular.module('sample.routes', [ 'ui.router', 'ui.router.stateHelper'])

    .config(function(stateHelperProvider) {

        stateHelperProvider
            .state({
                abstract: true,
                url: '/sample',
                name: 'sample',
                views: {
                    content: {
                        templateUrl: 'common/layout/carbon-layout.html',
                    }
                },
                children: [
                    {
                        url: '/index',
                        name: 'index',
                        views: {
                            content: {
                                templateUrl: 'sample/views/sample-index-tpl.html',
                                controller: 'sampleIndexCtrl',
                                data: {
                                    pageTitle: 'Samples',
                                },
                                resolve: {

                                    sampleResponse: function (sampleFactory) {

                                        return sampleFactory.getSamples();

                                    },

                                    sampleTypes: function (sampleFactory) {

                                        return sampleFactory.getSampleTypes();

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
