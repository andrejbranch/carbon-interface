angular.module('production.westernGel.westernGelProductionDetailCtrl', [])

    .controller('westernGelProductionDetailCtrl', ['$scope', 'westernGelRequest', 'inputSampleGrid', 'dnaProductionFormFactory', 'projectGrid',

        function ($scope, westernGelRequest, inputSampleGrid, dnaProductionFormFactory, projectGrid) {

            $scope.westernGelRequest = westernGelRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = dnaProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.westernGelRequest.status];

        }

    ])
;
