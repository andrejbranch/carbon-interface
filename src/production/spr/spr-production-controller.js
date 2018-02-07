angular.module('production.spr.sprProductionCtrl', [])

    .controller('sprProductionCtrl', ['$scope', 'sprProductionGrid', 'sprProductionFormFactory',

        function ($scope, sprProductionGrid, sprProductionFormFactory) {

            $scope.sprProductionGrid = sprProductionGrid;

            $scope.create = function () {

                sprProductionFormFactory.openFormModal()

            };

        }

    ])
;
