angular.module('production.analysis.analysisProductionFormCtrl', [])

    .controller('analysisProductionFormCtrl', ['$scope', 'analysisProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, analysisProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.analysisProduction = analysisProduction ? angular.copy(analysisProduction) : {status:'Pending', concentrationUnits: 'mg/mL', volumeUnits: 'mL'};
            $scope.analysisProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;
            $scope.isPipeline = isPipeline;
            $scope.pipelineStepIndex = pipelineStepIndex;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('Analysis Production')
                .setObject($scope.analysisProduction)
                .setUrl('/production/analysis-request')
                .setObjectClass('AppBundle\\Entity\\Production\\AnalysisRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.analysisProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.analysisProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.analysisProduction);
                    return;
                }

                $scope.cbForm.save($scope.analysisProductionForm, $scope);

            };

        }

    ])
;
