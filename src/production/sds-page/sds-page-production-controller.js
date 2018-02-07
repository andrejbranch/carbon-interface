angular.module('production.sdsPage.sdsPageProductionCtrl', [])

    .controller('sdsPageProductionCtrl', ['$scope', 'sdsPageProductionGrid', 'sdsPageProductionFormFactory',

        function ($scope, sdsPageProductionGrid, sdsPageProductionFormFactory) {

            $scope.sdsPageProductionGrid = sdsPageProductionGrid;

            $scope.create = function () {

                sdsPageProductionFormFactory.openFormModal()

            };

        }

    ])
;
