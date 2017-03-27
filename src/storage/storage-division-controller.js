angular.module('storage.storageDivisionCtrl', [])
    .controller('storageDivisionCtrl', ['$scope', 'division', 'childrenResponse', '$window', '$timeout', 'storageFormFactory', 'storageDivisionManager',

        function ($scope, division, childrenResponse, $window, $timeout, storageFormFactory, storageDivisionManager) {

            $scope.children = childrenResponse.data;
            $scope.division = division;

            $scope.samples = {};
            $scope.sdm = storageDivisionManager;
            $scope.sdm.initialize();
            $scope.sdm.division = $scope.division;
            $scope.editSelectedSample = $scope.sdm.editSelectedSample;

            $scope.zoom = {
                percentage: 100
            };

            $scope.currentView = $scope.division.hasDimension ? 'grid' : 'list';
            $scope.changeView = function (view) {
                $scope.currentView = view;
            };

            $scope.radioModel = "Left";

            angular.forEach($scope.division.samples, function (sample) {

                var divisionRow = sample.divisionRow;
                var divisionColumn = sample.divisionColumn;

                if ($scope.samples[divisionRow] === undefined) {
                    $scope.samples[divisionRow] = {};
                }

                $scope.samples[divisionRow][divisionColumn] = sample;

            });

            $scope.zoomIn = function () {
                if ($scope.zoom.percentage === 150) {
                    return;
                }
                $scope.zoom.percentage = $scope.zoom.percentage + 25;
            };

            $scope.zoomOut = function () {
                if ($scope.zoom.percentage === 25) {
                    return;
                }
                $scope.zoom.percentage = $scope.zoom.percentage - 25;
            };

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

                $scope.$broadcast('storage_box.resize', {percentage: $scope.zoom.percentage});

            };

            angular.element($window).on('resize', onWindowResize);

            $scope.$on('$destroy', function () {

                angular.element($window).off('resize', onWindowResize);

            });

            $scope.$on('storage_box.well_selected', function (event, data) {

                $scope.$broadcast('storage_box.details.well_selected', data);

            });

            if ($scope.division.samples.length !== 0) {
                var selectedSample = $scope.division.samples[0];
            }

            $scope.editDivision = storageFormFactory.openDivisionFormModal;

            $scope.addDivision = function () {

                storageFormFactory.openDivisionFormModal({parent: {id: $scope.division.id}});

            }

            $scope.breadcrumbs = [];
            var whileScope = $scope.division.parent;
            while (whileScope) {
                try {
                    $scope.breadcrumbs.push(whileScope);
                    whileScope = whileScope.parent;
                } catch (err) {
                    whileScope = false;
                }
            }
            $scope.breadcrumbs.reverse();

            // $scope.breadcrumbs.splice(0, 1);

            // $timeout(function () {
            //     $scope.$broadcast('storage_box.details.well_selected', {
            //         sample: selectedSample,
            //         column: selectedSample.divisionColumn,
            //         row: selectedSample.divisionRow
            //     });
            // });
        }

    ])
;
