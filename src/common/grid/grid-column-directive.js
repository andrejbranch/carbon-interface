angular.module('grid.gridColumnDirective', [])
    .directive('gridColumn', ['DTOptionsBuilder', 'DTColumnBuilder', 'API',

        function (DTOptionsBuilder, DTColumnBuilder, API) {

            return {

                require: '^grid',
                restrict: 'E',
                scope: {
                    column: '@',
                    title: '@',
                },
                controller: function ($scope) {

                    $scope.column = this.column = DTColumnBuilder.newColumn($scope.column).withTitle($scope.title);

                },
                link: function ($scope, element, attrs, gridCtrl) {

                    gridCtrl.columns.push($scope.column);

                }

            };

        }

    ])
;
