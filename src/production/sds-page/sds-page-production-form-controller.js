angular.module('production.sdsPage.sdsPageProductionFormCtrl', [])

    .controller('sdsPageProductionFormCtrl', ['$scope', 'sdsPageProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, sdsPageProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.sdsPageProduction = sdsPageProduction ? angular.copy(sdsPageProduction) : {status:'Pending', type: 'SDS-PAGE'};
            $scope.sdsPageProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;
            $scope.isPipeline = isPipeline;
            $scope.pipelineStepIndex = pipelineStepIndex;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('Gel Production')
                .setObject($scope.sdsPageProduction)
                .setUrl('/production/analysis/sds-page-request')
                .setObjectClass('AppBundle\\Entity\\Production\\Analysis\\NativeGelRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.sdsPageProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.sdsPageProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.sdsPageProduction);
                    return;
                }

                $scope.cbForm.save($scope.sdsPageProductionForm, $scope);

            };

        }

    ])
;
