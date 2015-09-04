angular.module('storage.storageDivisionCtrl', [])
    .controller('storageDivisionCtrl', ['$scope', 'division', 'childrenResponse',

        function ($scope, division, childrenResponse) {

            $scope.children = childrenResponse.data;
            $scope.division = division;

        }

    ])
;
