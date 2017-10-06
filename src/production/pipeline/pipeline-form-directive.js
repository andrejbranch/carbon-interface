angular.module('production.pipeline.pipelineFormDirective', [])

    .directive('pipelineForm', ['pipelineRequestFactory', 'pipelineRequestFormMapping', '$injector',

        function (pipelineRequestFactory, pipelineRequestFormMapping, $injector) {

            return {
                restrict: 'E',
                templateUrl: 'production/pipeline/partials/pipeline-form-tpl.html',
                scope: {},
                controller: function ($scope) {

                    this.scope = $scope;

                    $scope.steps = [{requests:[]}];
                    $scope.requestCount = 0;

                    $scope.requests = [
                        {
                            name: 'DNA'
                        },
                        {
                            name: 'Protein'
                        },
                    ];

                    this.initiateLink = function (fromRequest) {

                        fromRequest.activateLinking();
                        $scope.linkingRequest = fromRequest;

                        angular.element('body').on('click', $scope.onClickCallback);
                    }

                    $scope.onClickCallback = function (e) {

                        toRequest = angular.element(e.target).scope().request;

                        if (toRequest !== undefined && toRequest !== $scope.linkingRequest) {
                            $scope.linkRequest($scope.linkingRequest, toRequest);
                            $scope.linkingRequest.deactivateLinking();
                            angular.element('body').off('click', $scope.onClickCallback);
                            $scope.$apply();
                        }

                    }

                    this.removeRequest = function (request) {
                        request.clearPaths();
                        $scope.steps[request.stepIndex].requests.splice(
                            $scope.steps[request.stepIndex].requests.indexOf(request), 1
                        );
                    }


                },
                link: function ($scope, element, attrs, ctrls) {

                    $scope.addRequest = function (request, stepIndex) {

                        var modal = $injector.get(pipelineRequestFormMapping[request.name].formFactory).openFormModal(null, true, stepIndex);

                        modal.result.then(

                            function(response) {

                                console.log(response);

                                if (!response) {
                                    return;
                                }

                                var pipelineRequest = pipelineRequestFactory.create()
                                    .setRequest(response)
                                    .setName(request.name)
                                    .setType('acceptAll')
                                    .setStepIndex(stepIndex)
                                ;

                                $scope.steps[stepIndex].requests.push(pipelineRequest);
                                $scope.requestCount++;

                                if ($scope.steps[stepIndex].requests[0]) {
                                    if ($scope.steps[stepIndex].requests.length == 1) {
                                        $scope.steps.push({requests:[]});
                                    }
                                }

                                console.log($scope.steps);

                            }
                        );





                    };
                    // $scope.addRequest = function (stepIndex) {

                    //     var request = pipelineRequestFactory.create()
                    //         .setName('r' + $scope.requestCount)
                    //         .setType('acceptAll')
                    //         .setStepIndex(stepIndex)
                    //     ;

                    //     $scope.steps[stepIndex].requests.push(request);
                    //     $scope.requestCount++;

                    //     if ($scope.steps[stepIndex].requests[0]) {
                    //         if ($scope.steps[stepIndex].requests.length == 1) {
                    //             $scope.steps.push({requests:[]});
                    //         }
                    //     }

                    // };

                    var svg = d3.select('.pipeline-form-container')
                        .append("svg")
                        .attr('width', '100%')
                        .attr('height', 500)
                    ;

                    $scope.linkRequest = function (fromRequest, toRequest) {

                        var firstElToLink = fromRequest.element;
                        var rightElToLink = toRequest.element;

                        var from = {x: firstElToLink.offset().left + firstElToLink[0].offsetWidth - 42, y: firstElToLink.position().top + 25};
                        var to = {x:rightElToLink.offset().left - 42, y: rightElToLink.position().top + 25};

                        var data = [from, to];

                        var lineFunction = d3.line()
                        .x(function (data) {
                            return data.x;
                        })
                        .y(function (data) {
                            return data.y;
                        });

                        var path = svg.append("path")
                            .attr('d', lineFunction(data))
                        ;

                        fromRequest.addPathLink(path);

                    };


                }
            }

        }

    ])
;
