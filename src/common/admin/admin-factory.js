angular.module('admin.adminFactory', [])
    .factory('adminFactory', ['$http', 'API',

        function ($http, API) {

            var adminFactory = {

                getUsers: function () {

                    var url = API.url + '/user';

                    var promise = $http.get(url).then(function (response) {
                        return response.data.data;
                    });

                    return promise;
                },

                createUser: function (user) {

                    var url = API.url + '/user';

                    var promise = $http.post(url, user).then(function (response) {
                        return response.data.data;
                    });

                    return promise;

                },

                getRoles: function () {

                    var url = API.url + '/role';

                    var promise = $http.get(url).then(function (response) {
                        return response.data.data;
                    });

                    return promise;
                },

            };

            return adminFactory;
        }

    ])
;
