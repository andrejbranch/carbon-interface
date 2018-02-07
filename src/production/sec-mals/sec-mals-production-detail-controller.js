angular.module('production.secMals.secMalsProductionDetailCtrl', [])

    .controller('secMalsProductionDetailCtrl', ['$scope', 'secMalsRequest', 'inputSampleGrid', 'dnaProductionFormFactory', 'projectGrid',

        function ($scope, secMalsRequest, inputSampleGrid, dnaProductionFormFactory, projectGrid) {

            $scope.secMalsRequest = secMalsRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = dnaProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.secMalsRequest.status];

        }

    ])
;
