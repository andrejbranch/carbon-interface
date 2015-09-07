angular.module('storage.storageBoxHeading', [])
    .directive('storageBoxHeading', ['$window',

        function ($window) {

            return {

                restrict: 'A',
                link: function ($scope, element, attrs) {

                    $scope.$on('storage_box.resize', function (event, data) {

                        var fontSize;

                        element.css('font-size', (data.percentage / 100) * 0.9 + 'vw');

                    });

                }

            };

        }

    ])
;
