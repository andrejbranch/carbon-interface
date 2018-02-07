angular.module('production.spr.sprProductionFormCtrl', [])

    .controller('sprProductionFormCtrl', ['$scope', 'sprProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, sprProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.sprProduction = sprProduction ? angular.copy(sprProduction) : {status:'Pending', type: 'SDS-PAGE'};
            $scope.sprProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;
            $scope.isPipeline = isPipeline;
            $scope.pipelineStepIndex = pipelineStepIndex;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('SPR Request')
                .setObject($scope.sprProduction)
                .setUrl('/production/analysis/spr-request')
                .setObjectClass('AppBundle\\Entity\\Production\\Analysis\\SprRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.sprProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.sprProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.sprProduction);
                    return;
                }

                $scope.cbForm.save($scope.sprProductionForm, $scope);

            };

        }

    ])
;
