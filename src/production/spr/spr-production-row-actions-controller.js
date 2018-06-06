angular.module('production.spr.sprProductionRowActionsCtrl', [])

    .controller('sprProductionRowActionsCtrl', ['$scope', 'sprProductionFormFactory',

        function ($scope, sprProductionFormFactory) {

            $scope.edit = sprProductionFormFactory.openFormModal;
            $scope.delete = sprProductionFormFactory.openDeleteForm;
            $scope.restore = sprProductionFormFactory.openRestoreForm;
            $scope.purge = sprProductionFormFactory.openPurgeForm;

        }

    ])
;
