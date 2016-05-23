angular.module('sample.sampleIndexCtrl', [])

    .controller('sampleIndexCtrl', ['$scope', 'grid',

        function ($scope, grid) {

            $scope.grid = grid;

        }

    ])
;
