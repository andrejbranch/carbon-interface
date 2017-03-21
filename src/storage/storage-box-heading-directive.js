angular.module('storage.storageBoxHeading', [])
    .directive('storageBoxHeading', ['$window',

        function ($window) {

            return {

                restrict: 'A',
                require: '^storageBox',
                scope: {
                    row: '=',
                    column: '='
                },
                link: function ($scope, element, attrs, storageBoxCtrl) {

                    $scope.$on('storage_box.resize', function (event, data) {

                        var fontSize;

                        element.css('font-size', (data.percentage / 100) * 0.7 + 'vw');

                    });

                    element.on('click', function () {
                        if ($scope.column != undefined) {
                            storageBoxCtrl.selectColumn($scope.column);
                        }
                        if ($scope.row != undefined) {
                            storageBoxCtrl.selectRow($scope.row);
                        }
                    });

                }

            };

        }

    ])
;
