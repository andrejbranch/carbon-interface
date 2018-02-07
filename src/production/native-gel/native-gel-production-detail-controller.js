angular.module('production.nativeGel.nativeGelProductionDetailCtrl', [])

    .controller('nativeGelProductionDetailCtrl', ['$scope', 'nativeGelRequest', 'inputSampleGrid', 'dnaProductionFormFactory', 'projectGrid',

        function ($scope, nativeGelRequest, inputSampleGrid, dnaProductionFormFactory, projectGrid) {

            $scope.nativeGelRequest = nativeGelRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = dnaProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.nativeGelRequest.status];

        }

    ])
;
