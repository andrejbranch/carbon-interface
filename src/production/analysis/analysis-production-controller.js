angular.module('production.analysis.analysisProductionCtrl', [])

    .controller('analysisProductionCtrl', ['$scope', 'analysisProductionGrid', 'analysisProductionFormFactory',

        function ($scope, analysisProductionGrid, analysisProductionFormFactory) {

            $scope.analysisProductionGrid = analysisProductionGrid;

            $scope.create = function () {

                analysisProductionFormFactory.openFormModal()

            };

        }

    ])
;
