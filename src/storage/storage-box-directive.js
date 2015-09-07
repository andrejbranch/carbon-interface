angular.module('storage.storageBoxDirective', [])
    .directive('storageBox', ['$window',

        function ($window) {

            return {

                restrict: 'A',
                link: function ($scope, element, attrs) {

                    element.css('height', element.outerWidth());

                    angular.element($window).on('resize', function () {

                        element.css('height', element.outerWidth());

                    });

                    $scope.$on('storage_box.resize', function (event, data) {

                        element.css('width', data.percentage + '%');
                        element.css('height', element.outerWidth());
                        angular.element($window).trigger('resize');

                    });

                }

            };

        }

    ])
;
