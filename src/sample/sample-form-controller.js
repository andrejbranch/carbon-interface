angular.module('sample.sampleFormCtrl', [])

    .controller('sampleFormCtrl', ['$scope', 'sample', '$cbResource', 'sampleTypes', 'storageContainers', 'linkedSampleGrids', 'StepsService', 'divisionGrid', 'projectGrids', '$cbForm',

        function ($scope, sample, $cbResource, sampleTypes, storageContainers, linkedSampleGrids, StepsService, divisionGrid, projectGrids, $cbForm) {

            $scope.sample = sample ? angular.copy(sample) : {};
            $scope.sampleForm = {};
            $scope.sampleTypes = sampleTypes.data;
            $scope.storageContainers = storageContainers.data;
            $scope.statuses = ['Available', 'Depleted', 'Destroyed', 'Shipped'];
            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.linkedSampleGrids = linkedSampleGrids;
            $scope.currentStep = {name: 'sampleDetails'};
            $scope.divisionGrid = divisionGrid;
            $scope.projectGrids = projectGrids;
            $scope.showLocation = false;

            $scope.cbForm = $cbForm.create()
                .setType('Sample')
                .setObject($scope.sample)
                .setUrl('/storage/sample')
                .setObjectClass('Carbon\\ApiBundle\\Entity\\Sample')
            ;

            $scope.setDefaultConcentrationUnits = function () {

                if ($scope.sample.concentrationUnits === undefined) {

                    $scope.sample.concentrationUnits = $scope.concentrationUnits[0];
                }

            };


            $scope.selectDivision = function (isValid) {

                $scope.sampleForm.$submitted = true;
                $scope.$broadcast('form:submit');

                if (!isValid) {
                    return;
                }

                $scope.sampleForm.$submitted = false;

                var url = '/storage/division/match/' + $scope.sample.sampleType.id + '/' + $scope.sample.storageContainer.id;
                $scope.divisionGrid.setResourceUrl(url)

                $scope.showLocation = true;

                $cbResource.get(url, {}).then(function (response) {

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

                    StepsService.steps('sampleFormFlow').goTo(1);

                    if (response.unpaginatedTotal === 0) {
                        // alert here?
                        alert('no matched divisions');
                        return;
                    }


                    $scope.onDivisionChange(response.data[0], true)

                });

            };

            $scope.onDivisionChange = function (division, isInit) {

                $scope.divisionGrid.selectedItem = division;
                $scope.sample.division = $scope.divisionGrid.selectedItem;

                $cbResource.get('/storage/division/' + division.id + '/available-cells' ).then(function (response) {
                    var rowIndex = 0, columnIndex = 0;
                    $scope.rowColumnMap = {};
                    $scope.rows = [];

                    angular.forEach(response, function (rowValue, rowKey) {

                        $scope.rows.push(rowKey);
                        $scope.rowColumnMap[rowKey] = {'columns': []};

                        if ($scope.sample.divisionRow === undefined && rowIndex === 0) {
                            $scope.sample.divisionRow = rowKey;
                        }

                        angular.forEach(rowValue, function (cellValue, cellKey) {

                            $scope.rowColumnMap[rowKey].columns.push(cellKey);

                            if ($scope.sample.divisionColumn === undefined && columnIndex === 0) {
                                $scope.sample.divisionColumn = cellKey;
                            }

                            columnIndex++;

                        });

                        rowIndex++;

                    });

                    if (isInit === undefined) {
                        $scope.sample.divisionRow = null;
                        $scope.sample.divisionColumn = null;
                    }

                });

            };

            $scope.close = function () {
                $scope.cbForm.close($scope.sampleForm, $scope);
            };

            $scope.save = function () {

                $scope.cbForm.save($scope.sampleForm, $scope);

            };

        }

    ])
;
