angular.module('storage.storageBoxCellDirective', [])
    .directive('storageBoxCell', [

        function () {

            return {

                restrict: 'A',
                require: '^storageBox',
                scope: {
                    sample: '=',
                    column: '=',
                    row: '='
                },
                link: function ($scope, element, attrs, storageBoxCtrl) {

                    // responsive calculations
                    var resizeCell = function () {

                        var boxOuterWidth = storageBoxCtrl.scope.element.outerWidth() - ((storageBoxCtrl.division.width + 2) * 4);

                        var widthPercentage = 98 / storageBoxCtrl.division.width / 100;

                        var floor = Math.floor(widthPercentage * boxOuterWidth);

                        var flooredPercentage = floor / boxOuterWidth;

                        element.css('width', flooredPercentage * 100 + '%');

                        element.css('padding-bottom', floor + 'px');

                    };

                    // events
                    element.on('click', function () {

                        $scope.$emit('storage_box.well_selected', {
                            sample: $scope.sample,
                            row: $scope.row,
                            column: $scope.column
                        });

                    });

                    resizeCell();

                    $scope.$on('storage_box.resize', resizeCell);

                    $scope.$on('storage_box.details.well_selected', function (event, data) {

                        if (data.column !== $scope.column || data.row !== $scope.row) {

                            element.removeClass('selected');

                        } else {

                            element.addClass('selected');

                        }

                    });


                }

            };

        }

    ])
;
