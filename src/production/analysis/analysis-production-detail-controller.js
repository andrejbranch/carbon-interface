angular.module('production.analysis.analysisProductionDetailCtrl', [])

    .controller('analysisProductionDetailCtrl', ['$scope', 'analysisRequest', 'inputSampleGrid', 'outputSampleGrid', 'analysisProductionFormFactory', 'projectGrid',

        function ($scope, analysisRequest, inputSampleGrid, outputSampleGrid, analysisProductionFormFactory, projectGrid) {

            $scope.analysisRequest = analysisRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.outputSampleGrid = outputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = analysisProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.analysisRequest.status];

        }

    ])
;
