angular.module('tag.tagIndexCtrl', [])

    .controller('tagIndexCtrl', ['$scope', 'grid', 'tagFormFactory',

        function ($scope, grid, tagFormFactory) {

            $scope.grid = grid;
            $scope.create = tagFormFactory.openFormModal

        }

    ])
;
