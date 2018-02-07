angular.module('production.sdsPage.sdsPageProductionDetailCtrl', [])

    .controller('sdsPageProductionDetailCtrl', ['$scope', 'sdsPageRequest', 'inputSampleGrid', 'dnaProductionFormFactory', 'projectGrid',

        function ($scope, sdsPageRequest, inputSampleGrid, dnaProductionFormFactory, projectGrid) {

            $scope.sdsPageRequest = sdsPageRequest;
            $scope.inputSampleGrid = inputSampleGrid;
            $scope.projectGrid = projectGrid;
            $scope.edit = dnaProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.sdsPageRequest.status];

        }

    ])
;
