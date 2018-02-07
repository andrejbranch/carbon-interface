angular.module('production.secMals.secMalsProductionFormCtrl', [])

    .controller('secMalsProductionFormCtrl', ['$scope', 'secMalsProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, secMalsProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.secMalsProduction = secMalsProduction ? angular.copy(secMalsProduction) : {status:'Pending', type: 'SDS-PAGE'};
            $scope.secMalsProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;
            $scope.isPipeline = isPipeline;
            $scope.pipelineStepIndex = pipelineStepIndex;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('SEC MALS Request')
                .setObject($scope.secMalsProduction)
                .setUrl('/production/analysis/sec-mals-request')
                .setObjectClass('AppBundle\\Entity\\Production\\Analysis\\SecMalsRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.secMalsProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.secMalsProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.secMalsProduction);
                    return;
                }

                $scope.cbForm.save($scope.secMalsProductionForm, $scope);

            };

        }

    ])
;
