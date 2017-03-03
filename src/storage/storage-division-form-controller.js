angular.module('storage.storageDivisionFormCtrl', [])

    .controller('storageDivisionFormCtrl', ['$scope', 'division', 'sampleTypeSelectGrid', 'storageContainerSelectGrid', 'divisionSampleTypeGrid', 'divisionStorageContainerGrid', '$uibModalInstance', '$cbResource', 'toastr', 'callback',

        function ($scope, division, sampleTypeSelectGrid, storageContainerSelectGrid, divisionSampleTypeGrid, divisionStorageContainerGrid, $modalInstance, $cbResource, toastr, callback) {

            $scope.errors = [];
            $scope.divisionForm = {};
            $scope.division = division ? angular.copy(division) : { hasDimension: true };

            $scope.sampleTypeSelectGrid = sampleTypeSelectGrid;
            $scope.storageContainerSelectGrid = storageContainerSelectGrid;
            $scope.divisionSampleTypeGrid = divisionSampleTypeGrid;
            $scope.divisionStorageContainerGrid = divisionStorageContainerGrid;

            $scope.acceptedHeights = [];
            for (var i = 1; i <= 20; i++) {
                $scope.acceptedHeights.push(i);
            }

            $scope.acceptedWidths = [];
            for (var i = 1; i <= 20; i++) {
                $scope.acceptedWidths.push(i);
            }

            $scope.close = function () {

                if ($scope.divisionForm.$pristine === false) {
                    console.log('not pristine');
                }

                $modalInstance.close();

            };

            $scope.submit = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                var method = $scope.division.id !== undefined ? 'update' : 'create';
                var url = method === 'update'
                    ? '/storage/division?id[EQ]=' + $scope.division.id
                    : '/storage/division'
                ;

                $cbResource[method](url, $scope.division).then(

                    function (response) {

                        toastr.info('Division ' + method + 'd successfully');
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
