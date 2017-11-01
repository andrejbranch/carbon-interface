angular.module('production.protein.proteinProductionDetailCtrl', [])

    .controller('proteinProductionDetailCtrl', ['$scope', 'proteinRequest', 'inputSampleGrid', 'outputSampleGrid', 'dnaProductionFormFactory', 'projectGrid',

        function ($scope, proteinRequest, inputSampleGrid, outputSampleGrid, dnaProductionFormFactory, projectGrid) {

            $scope.proteinRequest = proteinRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.outputSampleGrid = outputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = dnaProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.proteinRequest.status];

        }

    ])
;
