angular.module('production.affinityPurification.affinityPurificationProductionDetailCtrl', [])

    .controller('affinityPurificationProductionDetailCtrl', ['$scope', 'affinityPurificationRequest', 'inputSampleGrid', 'outputSampleGrid', 'affinityPurificationProductionFormFactory', 'projectGrid',

        function ($scope, affinityPurificationRequest, inputSampleGrid, outputSampleGrid, affinityPurificationProductionFormFactory, projectGrid) {

            $scope.affinityPurificationRequest = affinityPurificationRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.outputSampleGrid = outputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = affinityPurificationProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.affinityPurificationRequest.status];

        }

    ])
;
