angular.module('production.affinityPurification.affinityPurificationProductionCtrl', [])

    .controller('affinityPurificationProductionCtrl', ['$scope', 'affinityPurificationProductionGrid', 'affinityPurificationProductionFormFactory',

        function ($scope, affinityPurificationProductionGrid, affinityPurificationProductionFormFactory) {

            $scope.affinityPurificationProductionGrid = affinityPurificationProductionGrid;

            $scope.create = function () {

                affinityPurificationProductionFormFactory.openFormModal()

            };

        }

    ])
;
