angular.module('grid.gridColumnDirective', [])
    .directive('gridColumn', [

        function () {

            return {

                restrict: 'A',
                transclude: true,
                template: '<td ng-transclude></td>',
                scope: {
                    name: '@'
                },
                link: function ($scope, element, attrs) {

                }

            };

        }

    ])
;
