angular.module('sample.sampleFormCtrl', [])
    .controller('sampleFormCtrl', ['$scope', '$modalInstance', 'sample', 'sampleFactory', 'toastr', 'callback', 'sampleTypes', 'storageContainers', 'linkedSamplesGrid',

        function ($scope, $modalInstance, sample, sampleFactory, toastr, callback, sampleTypes, storageContainers, linkedSamplesGrid) {

            $scope.sample = sample ? angular.copy(sample) : {};
            $scope.errors = [];
            $scope.sampleForm = {};
            $scope.sampleTypes = sampleTypes.data;
            $scope.storageContainers = storageContainers.data;
            $scope.statuses = ['Available', 'Depleted', 'Destroyed', 'Shipped'];
            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];

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

            $scope.submit = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                if ($scope.sample.id !== undefined) {

                    sampleFactory.updateSample($scope.sample).then(

                        function (response) {

                            toastr.info('Sample updated successfully');
                            $scope.close();
                            callback();

                        },

                        function (response) {

                            $scope.errors = response.data;

                        }

                    );

                }

                if ($scope.sample.id === undefined) {

                    sampleFactory.createSample($scope.sample).then(

                        function (response) {

                            toastr.info('Sample created successfully');
                            $scope.close();
                            callback();

                        },

                        function (response) {

                            $scope.errors = response.data;

                        }

                    );

                }

            }

            $scope.sampleOneToManyGrid = linkedSamplesGrid;

        }

    ])
;
