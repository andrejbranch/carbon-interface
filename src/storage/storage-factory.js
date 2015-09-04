angular.module('storage.storageFactory', [])
    .factory('storageFactory', ['$http', 'API',

        function ($http, API) {

            var storageFactory = {

                getParentDivisions: function () {

                    var url = API.url + '/division?parentId=null';

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                },

                getDivision: function (divisionId) {

                    var url = API.url + '/division?id=' + divisionId;

                    var promise = $http.get(url).then(function (response) {
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
