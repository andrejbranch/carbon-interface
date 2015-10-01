angular.module('sample.sampleFormCtrl', [])
    .controller('sampleFormCtrl', ['$scope', '$modalInstance', 'sample', 'sampleFactory', 'toastr', 'callback', 'sampleTypes',

        function ($scope, $modalInstance, sample, sampleFactory, toastr, callback, sampleTypes) {

            $scope.sample = sample ? angular.copy(sample) : {};
            $scope.errors = [];
            $scope.sampleForm = {};
            $scope.sampleTypes = sampleTypes;

            $scope.selectSampleType = function (sampleType) {

                $scope.sample.sampleType = sampleType;

            };

            $scope.close = function () {

                $modalInstance.close();

            };

            $scope.submit = function (isValid) {

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
