angular.module('production.westernGel.westernGelProductionFormCtrl', [])

    .controller('westernGelProductionFormCtrl', ['$scope', 'westernGelProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid', 'isPipeline', '$uibModalInstance', 'pipelineStepIndex',

        function ($scope, westernGelProduction, $cbForm, sampleGrids, projectGrids, protocolGrid, isPipeline, $uibModalInstance, pipelineStepIndex) {

            $scope.westernGelProduction = westernGelProduction ? angular.copy(westernGelProduction) : {status:'Pending', type: 'SDS-PAGE'};
            $scope.westernGelProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;
            $scope.isPipeline = isPipeline;
            $scope.pipelineStepIndex = pipelineStepIndex;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('Western Gel Request')
                .setObject($scope.westernGelProduction)
                .setUrl('/production/analysis/western-gel-request')
                .setObjectClass('AppBundle\\Entity\\Production\\Analysis\\WesternGelRequest')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.westernGelProductionForm, $scope);
            };

            $scope.save = function () {

                if (isPipeline && $scope.westernGelProductionForm.$valid) {
                    $scope.$broadcast('form:submit');
                    $uibModalInstance.close($scope.westernGelProduction);
                    return;
                }

                $scope.cbForm.save($scope.westernGelProductionForm, $scope);

            };

        }

    ])
;
