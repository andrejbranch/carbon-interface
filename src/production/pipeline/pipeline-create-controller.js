angular.module('production.pipeline.pipelineCreateCtrl', [])

    .controller('pipelineCreateCtrl', ['$scope',

        function ($scope) {

            $scope.steps = [
                {
                    requests:[null]
                }
            ];

            // $scope.requests = [
            //     {name:'DNA'},
            //     {name:'Protein'},
            //     {name:'Purification'},
            //     {name:'Analysis'},
            // ];

            // $scope.form = {
            //     request: null
            // };

            // $scope.selectRequest = function (request, stepIndex) {
            //     if ($scope.steps[stepIndex].requests[0]) {
            //         if ($scope.steps[stepIndex].requests.length == 1) {
            //             $scope.steps.push({requests:[null]});
            //         }
            //         if (stepIndex !== 0) {
            //             $scope.steps[stepIndex].requests.push(null);
            //         }
            //     }
            // };

        }

    ])
;
