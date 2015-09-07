angular.module('storage.storageBoxCellDirective', [])
    .directive('storageBoxCell', [

        function () {

            return {

                restrict: 'A',
                require: '^storageBox',
                link: function ($scope, element, attrs, storageBoxCtrl) {

                    var resizeCell = function () {

                        var boxOuterWidth = storageBoxCtrl.scope.element.outerWidth() - ((storageBoxCtrl.division.width + 2) * 4);

                        var widthPercentage = 98 / storageBoxCtrl.division.width / 100;

                        var floor = Math.floor(widthPercentage * boxOuterWidth);

                        var flooredPercentage = floor / boxOuterWidth;

                        element.css('width', flooredPercentage * 100 + '%');

                        element.css('padding-bottom', floor + 'px');

                    };

                    resizeCell();

                    $scope.$on('storage_box.resize', resizeCell);
                }

            };

        }

    ])
;
