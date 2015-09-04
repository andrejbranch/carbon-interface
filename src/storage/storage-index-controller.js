angular.module('storage.storageIndexCtrl', [])
    .controller('storageIndexCtrl', ['$scope', 'divisionResponse',

        function ($scope, divisionResponse) {

            $scope.divisions = divisionResponse.data;

        }

    ])
;
