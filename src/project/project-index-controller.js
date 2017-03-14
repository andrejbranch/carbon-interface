angular.module('project.projectIndexCtrl', [])

    .controller('projectIndexCtrl', ['$scope', 'grid', 'projectFormFactory',

        function ($scope, grid, projectFormFactory) {

            $scope.grid = grid;
            $scope.create = projectFormFactory.openFormModal;

        }

    ])
;
