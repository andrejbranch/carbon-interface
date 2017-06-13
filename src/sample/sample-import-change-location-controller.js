angular.module('sample.sampleImportChangeLocationCtrl', [])

    .controller('sampleImportChangeLocationCtrl', ['$scope', 'sample', 'divisionGrid', '$cbResource', 'sampleImportManager',

        function ($scope, sample, divisionGrid, $cbResource, sampleImportManager) {

            $scope.sample = sample;
            $scope.sampleImportForm = {};
            $scope.oldDivision = $scope.sample.division;
            $scope.oldDivisionRow = $scope.sample.divisionRow;
            $scope.oldDivisionColumn = $scope.sample.divisionColumn;
            $scope.divisionGrid = divisionGrid;
            $scope.sampleImportManager = sampleImportManager;

            $scope.onDivisionChange = function (division, isInit) {

                if (division == null) {

                    $scope.rows = [];
                    $scope.rowColumnMap = {};
                    delete $scope.sampleImportManager.selectedCells[$scope.oldDivision.id][$scope.oldDivisionRow][$scope.oldDivisionColumn];

                    $scope.sample.divisionRow = null;
                    $scope.sample.divisionColumn = null;

                    return;

                }

                $scope.divisionGrid.selectedItem = division;
                $scope.sample.division = $scope.divisionGrid.selectedItem;

                $scope.sampleImportManager.getAvailableCells(division, $scope.sample).then(function (availableCellData) {

                    $scope.rows = availableCellData[0];
                    $scope.rowColumnMap = availableCellData[1];

                });

                if (isInit === undefined) {
                    $scope.sample.divisionRow = null;
                    $scope.sample.divisionColumn = null;
                }

            };

            $scope.divisionGrid.setSelectItemCallback($scope.onDivisionChange);
            $scope.onDivisionChange(sample.division, true)

            $scope.changeCount = 0;
            $scope.$watch('sample.divisionRow', function (v) {

                if ($scope.changeCount > 0) {
                    $scope.sample.divisionColumn = null;
                }

                $scope.changeCount++;
            });

            $scope.submit = function (isValid) {

                if (!isValid) {
                    return;
                }

                sampleImportManager.setSelectedCells();

                $scope.$close();

            };

            $scope.cancel = function (isValid) {

                $scope.sample.division = $scope.oldDivision;
                $scope.sample.divisionRow = $scope.oldDivisionRow;
                $scope.sample.divisionColumn = $scope.oldDivisionColumn;
                $scope.$close();

            };

        }

    ])
;
