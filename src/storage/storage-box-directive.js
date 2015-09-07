angular.module('storage.storageBoxDirective', [])
    .directive('storageBox', ['$window',

        function ($window) {

            return {

                restrict: 'A',
                scope: {
                    division: '='
                },
                controller: function ($scope) {
                    this.scope = $scope;
                    this.division = $scope.division;
                },
                link: function ($scope, element, attrs) {

                    $scope.element = element;

                    $scope.$on('storage_box.resize', function (event, data) {

                        element.css('width', data.percentage + '%');

                    });

                }

            };

        }

    ])
;
