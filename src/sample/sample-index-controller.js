angular.module('sample.sampleIndexCtrl', [])
    .controller('sampleIndexCtrl', ['$scope', 'sampleResponse',

        function ($scope, sampleResponse) {

            $scope.sampleResponse = sampleResponse;
            $scope.samples = sampleResponse.data;
            console.log($scope.samples);

        }

    ])
;
