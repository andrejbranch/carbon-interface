angular.module('sample.sampleFactory', [])
    .factory('sampleFactory', ['$http', 'API',

        function ($http, API) {

            var sampleFactory = {

                getSampleTypes: function () {

                    var url = API.url + '/sample-type';

                    var promise = $http.get(url).then(function (response) {

                        return response.data;

                    });

                    return promise;
                },

                getSamples: function () {

                    var url = API.url + '/sample?cPerPage=10';

                    var promise = $http.get(url).then(function (response) {

                        return response.data;

                    });

                    return promise;
                },

                updateSample: function (sample) {

                    var url = API.url + '/sample?id=' + sample.id;

                    return $http.put(url, {
                        name: sample.name,
                        description: sample.description
                    });

                }

            }

            return sampleFactory;

        }

    ])
;
