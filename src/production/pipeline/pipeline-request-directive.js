angular.module('production.pipeline.pipelineRequestDirective', [])

    .directive('pipelineRequest', [

        function () {

            return {
                require: '^pipelineForm',
                restrict: 'E',
                templateUrl: 'production/pipeline/partials/pipeline-request-tpl.html',
                scope: {request: '='},
                controller: function ($scope) {
                },
                link: function ($scope, element, attrs, pipelineForm) {

                    $scope.request.setElement(element);

                    $scope.link = function () {
                        pipelineForm.initiateLink($scope.request);
                    }

                    $scope.clear = function () {
                        $scope.request.clearPaths();
                    }

                    $scope.delete = function () {
                        pipelineForm.removeRequest($scope.request);
                    }

                }
            }

        }
    ])
;
