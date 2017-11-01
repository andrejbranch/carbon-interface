angular.module('production.pipeline.pipelineIndexCtrl', [])

    .controller('pipelineIndexCtrl', ['$scope', 'grid',

        function ($scope, grid) {

            $scope.pipelineGrid = grid;

        }

    ])
;
