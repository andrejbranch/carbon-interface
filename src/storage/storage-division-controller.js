angular.module('storage.storageDivisionCtrl', [])
    .controller('storageDivisionCtrl', ['$scope', 'division', 'childrenResponse', '$window',

        function ($scope, division, childrenResponse, $window) {

            $scope.children = childrenResponse.data;
            $scope.division = division;

            $scope.samples = {};

            $scope.zoom = {
                percentage: 100
            };

            angular.forEach($scope.division.samples, function (sample) {

                var divisionRow = sample.divisionRow;
                var divisionColumn = sample.divisionColumn;

                if ($scope.samples[divisionRow] === undefined) {
                    $scope.samples[divisionRow] = {};
                }

                $scope.samples[divisionRow][divisionColumn] = sample;

            });

            $scope.$watch('zoom.percentage', function (v) {

                $scope.$broadcast('storage_box.resize', {percentage: v});

            });

            $scope.rows = [];
            $scope.columns = [];

            for (var i = 1; i <= division.width; i++) {
                $scope.columns.push(i);
            }

            for (var i = 65; i < division.height + 65; i++) {
                $scope.rows.push(String.fromCharCode(i));
            }

            var onWindowResize = function () {

                $scope.$broadcast('storage_box.resize');

            };

            angular.element($window).on('resize', onWindowResize);

            $scope.$on('$destroy', function () {

                angular.element($window).off('resize', onWindowResize);

            });

        }

    ])
;
