angular.module('sample.sampleFormCtrl', [])
    .controller('sampleFormCtrl', ['$scope', '$modalInstance', 'sample', 'sampleFactory', 'toastr', 'callback', 'sampleTypes', 'storageContainers',

        function ($scope, $modalInstance, sample, sampleFactory, toastr, callback, sampleTypes, storageContainers) {

            $scope.sample = sample ? angular.copy(sample) : {};
            $scope.errors = [];
            $scope.sampleForm = {};
            $scope.sampleTypes = sampleTypes;
            $scope.storageContainers = storageContainers;
            $scope.statuses = ['Available', 'Depleted', 'Destroyed', 'Shipped'];
            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];

            $scope.selectSampleType = function (sampleType) {

                $scope.sample.sampleType = sampleType;

            };

            $scope.selectStorageContainer = function (storageContainer) {

                $scope.sample.storageContainer = storageContainer;

            };

            $scope.selectStatus = function (status) {

                $scope.sample.status = status;

            };

            $scope.selectConcentrationUnits = function (concentrationUnits) {

                $scope.sample.concentrationUnits = concentrationUnits;

            };

            $scope.setDefaultConcentrationUnits = function () {

                if ($scope.sample.concentrationUnits === undefined) {

                    $scope.sample.concentrationUnits = $scope.concentrationUnits[0];
                }

            };

            $scope.close = function () {

                $modalInstance.close();

            };

            $scope.submit = function (isValid) {

                console.log($scope.sample);
                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                if ($scope.sample.id !== undefined) {

                    sampleFactory.updateSample($scope.sample).then(

                        function (response) {

                            toastr.info('Sample updated successfully');
                            callback();
                            $scope.close();

                        },

                        function (response) {

                            $scope.errors = response.data;

                        }

                    );

                }
                // adminFactory.createUser($scope.user).then(

                //     function (response) {

                //         toastr.info('User created successfully');

                //         $state.go('admin.index');

                //     },

                //     function (response) {

                //         $scope.errors = response.data;

                //     }
                // );

            }

        }

    ])
;
