angular.module('sampleType.sampleTypeFactory', [])

    .factory('sampleTypeFactory', ['API', '$http',

        function (API, $http) {

            var sampleTypeFactory = {

                get: function () {

                    var url = API.url + '/sample-type';

                    var promise = $http.get(url).then(function (response) {

                        return response.data;

                    });

                    return promise;

                }

            };

            return sampleTypeFactory;

        }

    ])
