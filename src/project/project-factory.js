angular.module('project.projectFactory', [])
    .factory('projectFactory', ['$http', 'API',

        function ($http, API) {

            var projectFactory = {

                getProjects: function () {

                    var url = API.url + '/project?cPerPage=10';

                    var promise = $http.get(url).then(function (response) {
                        return response.data;
                    });

                    return promise;
                }

            }

            return projectFactory;
        }

    ])
;
