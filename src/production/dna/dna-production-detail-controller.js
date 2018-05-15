angular.module('production.dna.dnaProductionDetailCtrl', [])

    .controller('dnaProductionDetailCtrl', ['$scope', 'dnaRequest', 'inputSampleGrid', 'outputSampleGrid', 'dnaProductionFormFactory', 'projectGrid',

        function ($scope, dnaRequest, inputSampleGrid, outputSampleGrid, dnaProductionFormFactory, projectGrid) {

            $scope.dnaRequest = dnaRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.outputSampleGrid = outputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = dnaProductionFormFactory.openFormModal;
            $scope.delete = dnaProductionFormFactory.openDeleteForm;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.dnaRequest.status];

        }

    ])
;
