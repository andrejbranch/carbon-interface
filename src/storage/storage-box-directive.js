angular.module('storage.storageBoxDirective', [])
    .directive('storageBox', ['$window',

        function ($window) {

            return {

                restrict: 'A',
                scope: {
                    division: '='
                },
                controller: function ($scope, $rootScope) {
                    this.scope = $scope;
                    this.division = $scope.division;

                    this.selectColumn = function (column) {
                        $rootScope.$broadcast('storage_box.select_column', column);
                    }

                    this.selectRow = function (row) {
                        $rootScope.$broadcast('storage_box.select_row', row);
                    }
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
