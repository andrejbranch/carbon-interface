angular.module('project.projectIndexCtrl', [])
    .controller('projectIndexCtrl', ['$scope', 'projectResponse',

        function ($scope, projectResponse) {

            $scope.projectResponse = projectResponse;

            $scope.projects = projectResponse.data;

        }

    ])
;
