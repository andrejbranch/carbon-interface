angular.module('profile.profileCtrl', ['ngFileUpload', 'angular-flot'])
    .controller('profileCtrl', ['$scope', '$localStorage',

        function ($scope, $localStorage) {

            $scope.user = $localStorage.User;

        }

    ])
;
