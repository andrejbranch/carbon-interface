angular.module('storage.storageFactory', [])

    .factory('storageFactory', ['$http', 'API', '$cbResource',

        function ($http, API, $cbResource) {

            var storageFactory = {

                getParentDivisions: function () {

                    return $cbResource.get('/storage/division-tree');

                },

                getDivision: function (divisionId) {

                    var req = {
                        method: 'GET',
                        url: API.url + '/storage/division?id[EQ]=' + divisionId,
                        headers: {
                            'X-CARBON-SERIALIZATION-GROUPS': 'parent,samples'
                        }

                    };

                    var promise = $http(req).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                updateDivision: function (division) {

                    var url = API.url + '/storage/division?id=' + division.id;

                    return $http.put(url, division);

                },

                getDivisionChildren: function (parentId) {

                    var url = API.url + '/storage/division?parentId[EQ]=' + parentId;

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                getDivisionSampleTypes: function (divisionId) {

                    var url = API.url + '/storage/division-sample-type/division/' + divisionId;

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;

                },

                getDivisionStorageContainers: function (divisionId) {

                    var url = API.url + '/storage/division-storage-container/division/' + divisionId;

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
