angular.module('sample.sampleFormCtrl', [])

    .controller('sampleFormCtrl', ['$scope', '$uibModalInstance', 'sample', '$cbResource', 'toastr', 'callback', 'sampleTypes', 'storageContainers', 'linkedSamplesGrid', 'StepsService', 'divisionGrid', 'storageFactory', 'sampleSelectGrid',

        function ($scope, $modalInstance, sample, $cbResource, toastr, callback, sampleTypes, storageContainers, linkedSamplesGrid, StepsService, divisionGrid, storageFactory, sampleSelectGrid) {

            $scope.sample = sample ? angular.copy(sample) : {};
            $scope.errors = [];
            $scope.sampleForm = {};
            $scope.sampleTypes = sampleTypes.data;
            $scope.storageContainers = storageContainers.data;
            $scope.statuses = ['Available', 'Depleted', 'Destroyed', 'Shipped'];
            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.sampleOneToManyGrid = linkedSamplesGrid;
            $scope.currentStep = {name: 'sampleDetails'};
            $scope.divisionGrid = divisionGrid;
            $scope.sampleSelectGrid = sampleSelectGrid;

            $scope.setDefaultConcentrationUnits = function () {

                if ($scope.sample.concentrationUnits === undefined) {

                    $scope.sample.concentrationUnits = $scope.concentrationUnits[0];
                }

            };

            $scope.close = function () {

                if ($scope.sampleForm.$pristine === false) {
                    console.log('not pristine');

                }

                $modalInstance.close();

            };

            $scope.selectDivision = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    console.log($scope.sampleForm);
                    return;
                }

                StepsService.steps('sampleFormFlow').goTo(1);

                if ($scope.sample.id === undefined) {

                    $cbResource.get('/sample/location-match/' + $scope.sample.sampleType.id + '/' + $scope.sample.storageContainer.id).then(function (response) {

                        $scope.divisionGrid.selectedItem = response.division;
                        $scope.sample.division = response.division;
                        $scope.sample.divisionRow = response.divisionRow;
                        $scope.sample.divisionColumn = response.divisionColumn;

                        $scope.onDivisionChange(response.division);

                    });

                }

            };

            $scope.previousDivisionId = $scope.sample.division ? $scope.sample.division.id : null;

            $scope.onDivisionChange = function (division) {

                if (!division) {

                    return;

                }

                storageFactory.getDivision(division.id).then(function (response) {

                    $scope.selectedDivision = response.data[0];

                    if ($scope.previousDivisionId !== $scope.selectedDivision.id) {

                        $scope.previousDivisionId = $scope.selectedDivision.id;
                        $scope.sample.divisionRow = null;
                        $scope.sample.divisionColumn = null;

                    }

                    if (!$scope.selectedDivision.hasDimension) {

                        return;

                    }

                    $scope.rows = [];
                    $scope.columns = [];
                    $scope.rowColumnMap = {};

                    var sampleMap = {};

                    angular.forEach($scope.selectedDivision.samples, function (sample) {

                        var divisionRow = sample.divisionRow;
                        var divisionColumn = sample.divisionColumn;

                        if (sampleMap[divisionRow] === undefined) {
                            sampleMap[divisionRow] = {};
                        }

                        sampleMap[divisionRow][divisionColumn] = sample;

                    });

                    for (var rowKey = 65; rowKey < $scope.selectedDivision.height + 65; rowKey++) {

                        var rowKeyString = String.fromCharCode(rowKey);
                        var columns = [];

                        for (var columnKey = 1; columnKey <= $scope.selectedDivision.width; columnKey++) {
                            if (sampleMap[rowKeyString] === undefined || sampleMap[rowKeyString][columnKey] === undefined) {
                                columns.push(columnKey);
                            }
                        }

                        if (columns.length > 0) {

                            $scope.rows.push(rowKeyString);

                            $scope.rowColumnMap[rowKeyString] = {columns: columns};

                        }

                    }


                });

            };

            $scope.divisionGrid.setSelectItemCallback($scope.onDivisionChange);

            $scope.submit = function (isValid) {

                var method = $scope.sample.id !== undefined ? 'update' : 'create';
                var url = method === 'update'
                    ? '/sample?id[EQ]=' + $scope.sample.id
                    : '/sample'
                ;

                $cbResource[method](url, $scope.sample).then(

                    function (response) {

                        toastr.info('Sample ' + method + 'd successfully');
                        $scope.close();
                        callback();

                    },

                    function (response) {

                        $scope.errors = response.data;

                    }

                );

            }

        }

    ])
;
