angular.module('sample.sampleFactory', [])
    .factory('sampleFactory', ['$http', 'API',

        function ($http, API) {

            var sampleFactory = {

                getSamples: function () {

                    var url = API.url + '/sample?cPerPage=10';

                    var promise = $http.get(url).then(function (response) {

                        return response.data;

                    });

                    return promise;
                },

            }

            return sampleFactory;

        }

    ])
;
