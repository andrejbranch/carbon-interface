angular.module('storage.storageSampleRemoveCtrl', [])

    .controller('storageSampleRemoveCtrl', ['$scope', 'samplesToRemove', 'storageFactory', 'toastr', 'callback',

        function ($scope, samplesToRemove, storageFactory, toastr, callback) {
            $scope.samplesToRemove = samplesToRemove;
            $scope.statuses = ['Depleted', 'Destroyed', 'Shipped'];
            $scope.form = {status: $scope.statuses[0]};

            $scope.confirm = function () {

                storageFactory.removeStorageSamples($scope.samplesToRemove, $scope.form.status).then(
                    function () {
                        toastr.success(samplesToRemove.length + ' samples removed successfully');
                        $scope.$close();
                        callback();
                    },
                    function () {
                        toastr.danger('An error occured making your request, please try again later');
                        $scope.$dismiss();
                    }
                );

            };

        }

    ])
;
