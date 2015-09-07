angular.module('storage.storageDivisionCtrl', [])
    .controller('storageDivisionCtrl', ['$scope', 'division', 'childrenResponse',

        function ($scope, division, childrenResponse) {

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

                $scope.$broadcast('storage_box.resize', {
                    percentage: v
                });

            });

        }

    ])
;
