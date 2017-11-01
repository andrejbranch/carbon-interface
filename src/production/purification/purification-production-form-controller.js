angular.module('production.purification.purificationProductionFormCtrl', [])

    .controller('purificationProductionFormCtrl', ['$scope', 'purificationProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, purificationProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.purificationProduction = purificationProduction ? angular.copy(purificationProduction) : {status:'Pending', concentrationUnits: 'mg/mL', volumeUnits: 'mL'};
            $scope.purificationProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('Protein Production')
                .setObject($scope.purificationProduction)
                .setUrl('/production/purification-request')
                .setObjectClass('AppBundle\\Entity\\Production\\ProteinRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.purificationProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.purificationProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.purificationProduction);
                    return;
                }

                $scope.cbForm.save($scope.purificationProductionForm, $scope);

            };

        }

    ])
;
