angular.module('production.sizeExclusionPurification.sizeExclusionPurificationProductionCtrl', [])

    .controller('sizeExclusionPurificationProductionCtrl', ['$scope', 'sizeExclusionPurificationProductionGrid', 'sizeExclusionPurificationProductionFormFactory',

        function ($scope, sizeExclusionPurificationProductionGrid, sizeExclusionPurificationProductionFormFactory) {

            $scope.sizeExclusionPurificationProductionGrid = sizeExclusionPurificationProductionGrid;

            $scope.create = function () {

                sizeExclusionPurificationProductionFormFactory.openFormModal()

            };

        }

    ])
;
