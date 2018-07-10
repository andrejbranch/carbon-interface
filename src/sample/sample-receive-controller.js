angular.module('sample.sampleReceiveController', [])

    .controller('sampleReceiveController', ['$scope', 'sample', 'divisionGrid', '$cbResource', '$cbForm',

        function ($scope, sample, divisionGrid, $cbResource, $cbForm) {

            $scope.sample = angular.copy(sample);
            $scope.sample.status = 'Available';
            $scope.divisionGrid = divisionGrid;
            $scope.sampleReceiveForm = {};

            $scope.cbForm = $cbForm.create()
                .setType('Sample')
                .setObject($scope.sample)
                .setUrl('/storage/sample')
                .setObjectClass('AppBundle\\Entity\\Storage\\Sample')
            ;

            $scope.selectDivision = function () {

                var url = '/storage/division/match/' + $scope.sample.sampleType.id + '/' + $scope.sample.storageContainer.id;
                $scope.divisionGrid.setResourceUrl(url)

                $scope.showLocation = true;

                $cbResource.get(url, {}).then(function (response) {

                    if (response.data.length == 0) {

                        swal({
                            title: "Insufficient Storage Space",
                            text: "There is no available storage for your sample. Check that any storage owned by you supports the sample type and storage container, or speak with your inventory admin about getting more space.",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonText: "Ok",
                            closeOnConfirm: true
                        }, function() {});

                        $scope.sampleForm.$pristine = true;
                        $scope.close();

                    }

                    $scope.divisionGrid.columns[0].sortDirection = 'None';

                    $scope.divisionGrid
                        .setResults(response.data)
                        .setPaginationFromResponse(response)
                        .disableHyperlinks()
                        .disableHover()
                        .setPerPage(3)
                        .disableToggleColumns()
                        .setInitResultCount(response.unpaginatedTotal)
                        .setSelectItemCallback($scope.onDivisionChange)
                    ;

                    if (response.unpaginatedTotal === 0) {

                        return;

                    }

                    if (!$scope.sample.division) {
                        $scope.onDivisionChange(response.data[0], true)
                    } else {
                        $scope.onDivisionChange($scope.sample.division, true)
                    }

                });

            };

            $scope.onDivisionChange = function (division, isInit) {

                $scope.divisionGrid.selectedItem = division;
                $scope.sample.division = $scope.divisionGrid.selectedItem;

                if (!division || !division.hasDimension) {
                    $scope.rowColumnMap = {};
                    $scope.rows = [];
                    $scope.sample.divisionRow = null;
                    $scope.sample.divisionColumn = null;
                    return;
                }

                $cbResource.get('/storage/division/' + division.id + '/available-cells' ).then(function (response) {
                    var rowIndex = 0, columnIndex = 0;
                    $scope.rowColumnMap = {};
                    $scope.rows = [];

                    angular.forEach(response, function (rowValue, rowKey) {

                        $scope.rows.push(rowKey);
                        $scope.rowColumnMap[rowKey] = {'columns': []};

                        if (!$scope.sample.divisionRow && rowIndex === 0) {
                            $scope.sample.divisionRow = rowKey;
                        }

                        angular.forEach(rowValue, function (cellValue, cellKey) {

                            $scope.rowColumnMap[rowKey].columns.push(cellKey);

                            if (!$scope.sample.divisionColumn && columnIndex === 0) {
                                $scope.sample.divisionColumn = cellKey;
                            }

                            columnIndex++;

                        });

                        rowIndex++;

                    });

                });

            };

            $scope.submit = function () {

                $scope.cbForm.save($scope.sampleReceiveForm, $scope);

            };

            $scope.cancel = function () {

                $scope.cbForm.close($scope.sampleReceiveForm, $scope);

            };


            $scope.selectDivision();
        }

    ])
;
