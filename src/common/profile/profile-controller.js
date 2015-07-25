angular.module('profile.profileCtrl', [])
    .controller('profileCtrl', ['$scope', '$localStorage', '$modal', 'user', 'API',

        function ($scope, $localStorage, $modal, user, API) {

            $scope.user = user;

            $scope.hasAvatar = function () {
                return typeof $scope.user.avatar_attachment !== 'undefined';
            }

            $scope.avatarSrc = $scope.hasAvatar()
                ? API.url + '/attachment/' + $scope.user.avatar_attachment.id + '/download'
                : null
            ;

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
