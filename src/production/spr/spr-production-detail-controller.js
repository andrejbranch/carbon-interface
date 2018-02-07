angular.module('production.spr.sprProductionDetailCtrl', [])

    .controller('sprProductionDetailCtrl', ['$scope', 'sprRequest', 'inputSampleGrid', 'dnaProductionFormFactory', 'projectGrid',

        function ($scope, sprRequest, inputSampleGrid, dnaProductionFormFactory, projectGrid) {

            $scope.sprRequest = sprRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = dnaProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.sprRequest.status];

        }

    ])
;
