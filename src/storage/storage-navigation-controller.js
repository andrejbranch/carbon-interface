angular.module('storage.storageNavigationCtrl', [])
    .controller('storageNavigationCtrl', ['$scope', 'divisionResponse',

        function ($scope, divisionResponse) {

            $scope.divisions = divisionResponse.data;

        }

    ])
;
