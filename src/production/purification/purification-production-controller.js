angular.module('production.purification.purificationProductionCtrl', [])

    .controller('purificationProductionCtrl', ['$scope', 'purificationProductionGrid', 'purificationProductionFormFactory',

        function ($scope, purificationProductionGrid, purificationProductionFormFactory) {

            $scope.purificationProductionGrid = purificationProductionGrid;

            $scope.create = function () {

                purificationProductionFormFactory.openFormModal()

            };

        }

    ])
;
