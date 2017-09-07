angular.module('production.protein.proteinProductionCtrl', [])

    .controller('proteinProductionCtrl', ['$scope', 'proteinProductionGrid', 'proteinProductionFormFactory',

        function ($scope, proteinProductionGrid, proteinProductionFormFactory) {

            $scope.proteinProductionGrid = proteinProductionGrid;

            $scope.create = function () {

                proteinProductionFormFactory.openFormModal()

            };

        }

    ])
;
