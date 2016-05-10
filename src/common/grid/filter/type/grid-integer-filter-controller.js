angular.module('grid.gridIntegerFilterCtrl', [])

    .controller('gridIntegerFilterCtrl', ['$scope',

        function ($scope) {

            $scope.refresh = function () {

                $scope.filter.refresh();
                $scope.update();

            };

            $scope.update = function () {

                $scope.$emit('grid.refresh');

            };

            $scope.toggleFilter = function (e) {
                e.stopPropagation();
                $scope.filter.isVisible = false;
                $scope.$emit('grid.filterToggle');
            };

        }

    ])
;
