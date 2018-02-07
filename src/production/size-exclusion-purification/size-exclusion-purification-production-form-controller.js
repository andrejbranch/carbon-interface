angular.module('production.sizeExclusionPurification.sizeExclusionPurificationProductionFormCtrl', [])

    .controller('sizeExclusionPurificationProductionFormCtrl', ['$scope', 'sizeExclusionPurificationProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, sizeExclusionPurificationProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.sizeExclusionPurificationProduction = sizeExclusionPurificationProduction ? angular.copy(sizeExclusionPurificationProduction) : {status:'Pending', concentrationUnits: 'mg/mL', volumeUnits: 'mL'};
            $scope.sizeExclusionPurificationProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;
            $scope.isPipeline = isPipeline;
            $scope.pipelineStepIndex = pipelineStepIndex;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('Size Exclusion Purification Request')
                .setObject($scope.sizeExclusionPurificationProduction)
                .setUrl('/production/purification/size-exclusion-purification-request')
                .setObjectClass('AppBundle\\Entity\\Production\\Purification\\SizeExclusionPurificationRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.sizeExclusionPurificationProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.sizeExclusionPurificationProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.sizeExclusionPurificationProduction);
                    return;
                }

                $scope.cbForm.save($scope.sizeExclusionPurificationProductionForm, $scope);

            };

        }

    ])
;
