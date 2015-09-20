angular.module('grid.gridColumnDirective', [])
    .directive('gridColumn', [

        function () {

            return {

                restrict: 'A',
                scope: {
                    name: '@'
                },
                link: function ($scope, element, attrs) {

                }

            };

        }

    ])
;
