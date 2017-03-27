angular.module('storage.storageDivisionFormCtrl', [])

    .controller('storageDivisionFormCtrl', ['$scope', 'division', 'sampleTypeGrids', 'storageContainerGrids', '$uibModalInstance', '$cbResource', 'toastr', 'callback', 'divisionEditorGrids', '$state',

        function ($scope, division, sampleTypeGrids, storageContainerGrids, $modalInstance, $cbResource, toastr, callback, divisionEditorGrids, $state) {

            $scope.errors = [];
            $scope.divisionForm = {};
            $scope.division = division ? angular.copy(division) : { hasDimension: true, parent:{id:1}};
            $scope.sampleTypeGrids = sampleTypeGrids;
            $scope.storageContainerGrids = storageContainerGrids;
            $scope.divisionEditorGrids = divisionEditorGrids;

            if ($scope.division.parentId) {
                $scope.division.parent = {id: $scope.division.parentId};
            }

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
