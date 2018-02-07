angular.module('production.pipeline.pipelineCreateCtrl', [])

    .controller('pipelineCreateCtrl', ['$scope', 'requests', '$cbForm',

        function ($scope, requests, $cbForm) {

            $scope.requests = requests.data;
            $scope.pipeline = {};
            $scope.pipelineForm = {};

            $scope.steps = [
                {
                    requests:[null]
                }
            ];

            $scope.cbForm = $cbForm.create()
                .setType('Production Pipeline')
                .setObject($scope.pipeline)
                .setUrl('/production/pipeline')
                .setObjectClass('AppBundle\\Entity\\Production\\Pipeline')
            ;

            $scope.save = function () {
                $scope.cbForm.save($scope.pipelineForm, $scope);
            }

        }

    ])
;
