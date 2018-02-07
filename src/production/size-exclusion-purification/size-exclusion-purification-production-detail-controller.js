angular.module('production.sizeExclusionPurification.sizeExclusionPurificationProductionDetailCtrl', [])

    .controller('sizeExclusionPurificationProductionDetailCtrl', ['$scope', 'sizeExclusionPurificationRequest', 'inputSampleGrid', 'outputSampleGrid', 'sizeExclusionPurificationProductionFormFactory', 'projectGrid',

        function ($scope, sizeExclusionPurificationRequest, inputSampleGrid, outputSampleGrid, sizeExclusionPurificationProductionFormFactory, projectGrid) {

            $scope.sizeExclusionPurificationRequest = sizeExclusionPurificationRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.outputSampleGrid = outputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = sizeExclusionPurificationProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.sizeExclusionPurificationRequest.status];

        }

    ])
;
