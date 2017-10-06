angular.module('production.protein.proteinProductionFormCtrl', [])

    .controller('proteinProductionFormCtrl', ['$scope', 'proteinProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, proteinProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.proteinProduction = proteinProduction ? angular.copy(proteinProduction) : {status:'Pending', concentrationUnits: 'mg/mL', volumeUnits: 'mL'};
            $scope.proteinProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;
            $scope.isPipeline = isPipeline;
            $scope.pipelineStepIndex = pipelineStepIndex;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('Protein Production')
                .setObject($scope.proteinProduction)
                .setUrl('/production/protein-request')
                .setObjectClass('AppBundle\\Entity\\Production\\ProteinRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.proteinProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.proteinProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.proteinProduction);
                    return;
                }

                $scope.cbForm.save($scope.proteinProductionForm, $scope);

            };

        }

    ])
;
