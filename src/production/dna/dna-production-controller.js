angular.module('production.dna.dnaProductionCtrl', [])

    .controller('dnaProductionCtrl', ['$scope', 'dnaProductionGrid', 'dnaProductionFormFactory',

        function ($scope, dnaProductionGrid, dnaProductionFormFactory) {

            $scope.dnaProductionGrid = dnaProductionGrid;

            $scope.create = function () {

                dnaProductionFormFactory.openFormModal()

            };

        }

    ])
;
