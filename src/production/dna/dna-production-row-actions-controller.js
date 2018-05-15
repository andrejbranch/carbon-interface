angular.module('production.dna.dnaProductionRowActionsCtrl', [])

    .controller('dnaProductionRowActionsCtrl', ['$scope', 'dnaProductionFormFactory',

        function ($scope, dnaProductionFormFactory) {

            $scope.edit = dnaProductionFormFactory.openFormModal;
            $scope.delete = dnaProductionFormFactory.openDeleteForm;
            $scope.restore = dnaProductionFormFactory.openRestoreForm;
            $scope.purge = dnaProductionFormFactory.openPurgeForm;

        }

    ])
;
