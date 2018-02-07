angular.module('production.nativeGel.nativeGelProductionCtrl', [])

    .controller('nativeGelProductionCtrl', ['$scope', 'nativeGelProductionGrid', 'nativeGelProductionFormFactory',

        function ($scope, nativeGelProductionGrid, nativeGelProductionFormFactory) {

            $scope.nativeGelProductionGrid = nativeGelProductionGrid;

            $scope.create = function () {

                nativeGelProductionFormFactory.openFormModal()

            };

        }

    ])
;
