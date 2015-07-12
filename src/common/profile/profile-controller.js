angular.module('profile.profileCtrl', ['ngFileUpload', 'angular-flot'])
    .controller('profileCtrl', ['$scope', '$localStorage', '$modal',

        function ($scope, $localStorage, $modal) {

            $scope.user = $localStorage.User;

            $scope.uploadPhoto = function () {
                $modal.open({
                    templateUrl: 'common/profile/profile-photo-upload-tpl.html',
                    controller: 'photoUploadCtrl',
                    windowClass: 'inmodal'
                });
            }
        }

    ])
;
