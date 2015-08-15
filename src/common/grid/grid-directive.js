angular.module('grid.gridDirective', [])
    .directive('grid', ['DTOptionsBuilder', 'DTColumnBuilder', 'API', '$timeout',

        function (DTOptionsBuilder, DTColumnBuilder, API, $timeout) {

            return {

                restrict: 'E',
                templateUrl: 'common/grid/views/grid-directive-tpl.html',
                transclude: true,
                scope: {
                    initResponse: '=',
                    requestUrl: '@',
                },
                controller: function ($scope, $compile) {

                    $scope.options = DTOptionsBuilder.newOptions()
                        .withOption('ajax', {
                            url: API.url + $scope.requestUrl,
                            type: 'GET'
                        })
                        .withOption('createdRow', function(row, data, dataIndex) {

                            // Recompiling so we can bind Angular directive to the DT
                            (function () {

                                var newScope = $scope.$new();

                                newScope.data = data;

                                $compile(angular.element(row).contents())(newScope);

                                $timeout(function () {

                                    newScope.$apply();

                                });

                            })();

                        })
                        .withDataProp('data')
                            .withOption('processing', true)
                            .withOption('serverSide', true)
                            .withOption('searchDelay', 600)
                            .withOption('iDeferLoading', $scope.initResponse.unpaginatedTotal)
                            .withOption('aaData', $scope.initResponse.data)
                            .withPaginationType('full_numbers')
                    ;

                    $scope.columns = this.columns = [];

                    $scope.dtInstanceCallback = function (dtInstance) {

                        new jQuery.fn.dataTable.Responsive(dtInstance.dataTable, {
                            details: {
                                type: 'column',
                                target: 'tr'
                            }
                        });

                    };

                }

            };

        }

    ])
;
