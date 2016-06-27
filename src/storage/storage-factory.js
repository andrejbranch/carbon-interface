angular.module('storage.storageFactory', [])
    .factory('storageFactory', ['$http', 'API',

        function ($http, API) {

            var storageFactory = {

                getParentDivisions: function () {

                    var req = {
                        method: 'GET',
                        url: API.url + '/division?parentId[NULL]=true',
                        headers: {
                            'X-CARBON-SERIALIZATION-GROUPS': 'children'
                        }

                    };

                    var promise = $http(req).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                getDivision: function (divisionId) {

                    var req = {
                        method: 'GET',
                        url: API.url + '/division?id[EQ]=' + divisionId,
                        headers: {
                            'X-CARBON-SERIALIZATION-GROUPS': 'parent,samples'
                        }

                    };

                    var promise = $http(req).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                getDivisionChildren: function (parentId) {

                    var url = API.url + '/division?parentId[EQ]=' + parentId;

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                getDivisionSamples: function (divisionId) {

                    var url = API.url + '/sample?divisionId[EQ]=' + divisionId;

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;

                }
            }

            return storageFactory;
        }

    ])
;
