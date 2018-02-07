angular.module('production.nativeGel.nativeGelProductionFormCtrl', [])

    .controller('nativeGelProductionFormCtrl', ['$scope', 'nativeGelProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, nativeGelProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.nativeGelProduction = nativeGelProduction ? angular.copy(nativeGelProduction) : {status:'Pending', type: 'SDS-PAGE'};
            $scope.nativeGelProductionForm = {};
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
                .setObject($scope.nativeGelProduction)
                .setUrl('/production/analysis/native-gel-request')
                .setObjectClass('AppBundle\\Entity\\Production\\Analysis\\NativeGelRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.nativeGelProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.nativeGelProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.nativeGelProduction);
                    return;
                }

                $scope.cbForm.save($scope.nativeGelProductionForm, $scope);

            };

        }

    ])
;
