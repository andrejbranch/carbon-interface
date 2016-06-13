angular.module('sample.sampleDetailCtrl', [])

    .controller('sampleDetailCtrl', ['$scope', 'sample', 'linkedSamplesGrid',

        function ($scope, sample, linkedSamplesGrid) {

            $scope.sample = sample;
            $scope.linkedSamplesGrid = linkedSamplesGrid;

        }

    ])
;
