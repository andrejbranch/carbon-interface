angular.module('storage.storageFactory', [])
    .factory('storageFactory', ['$http', 'API',

        function ($http, API) {

            var storageFactory = {

                getParentDivisions: function () {

                    var req = {
                        method: 'GET',
                        url: API.url + '/division?parentId=null',
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
                        url: API.url + '/division?id=' + divisionId,
                        headers: {
                            'X-CARBON-SERIALIZATION-GROUPS': 'parent'
                        }

                    };

                    var promise = $http(req).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                getDivisionChildren: function (parentId) {

                    var url = API.url + '/division?parentId=' + parentId;

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
