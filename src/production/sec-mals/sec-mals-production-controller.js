angular.module('production.secMals.secMalsProductionCtrl', [])

    .controller('secMalsProductionCtrl', ['$scope', 'secMalsProductionGrid', 'secMalsProductionFormFactory',

        function ($scope, secMalsProductionGrid, secMalsProductionFormFactory) {

            $scope.secMalsProductionGrid = secMalsProductionGrid;

            $scope.create = function () {

                secMalsProductionFormFactory.openFormModal()

            };

        }

    ])
;
