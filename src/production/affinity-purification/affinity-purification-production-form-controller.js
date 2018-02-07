angular.module('production.affinityPurification.affinityPurificationProductionFormCtrl', [])

    .controller('affinityPurificationProductionFormCtrl', ['$scope', 'affinityPurificationProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, affinityPurificationProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.affinityPurificationProduction = affinityPurificationProduction ? angular.copy(affinityPurificationProduction) : {status:'Pending', concentrationUnits: 'mg/mL', volumeUnits: 'mL'};
            $scope.affinityPurificationProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;
            $scope.isPipeline = isPipeline;
            $scope.pipelineStepIndex = pipelineStepIndex;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('Purification Production')
                .setObject($scope.affinityPurificationProduction)
                .setUrl('/production/purification/affinity-purification-request')
                .setObjectClass('AppBundle\\Entity\\Production\\Purification\\AffinityPurificationRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.affinityPurificationProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.affinityPurificationProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.affinityPurificationProduction);
                    return;
                }

                $scope.cbForm.save($scope.affinityPurificationProductionForm, $scope);

            };

        }

    ])
;
