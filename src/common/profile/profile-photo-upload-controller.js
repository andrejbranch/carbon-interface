angular.module('profile.photoUploadCtrl', [])
    .controller('photoUploadCtrl', ['$scope', '$modalInstance',

        function ($scope, $modalInstance) {

            $scope.close = function () {
                $modalInstance.close();
            }

        }

    ])
;
