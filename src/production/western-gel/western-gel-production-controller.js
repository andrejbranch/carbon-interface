angular.module('production.westernGel.westernGelProductionCtrl', [])

    .controller('westernGelProductionCtrl', ['$scope', 'westernGelProductionGrid', 'westernGelProductionFormFactory',

        function ($scope, westernGelProductionGrid, westernGelProductionFormFactory) {

            $scope.westernGelProductionGrid = westernGelProductionGrid;

            $scope.create = function () {

                westernGelProductionFormFactory.openFormModal()

            };

        }

    ])
;
