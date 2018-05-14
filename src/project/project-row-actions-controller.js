angular.module('project.projectRowActionsCtrl', [])

    .controller('projectRowActionsCtrl', ['$scope', 'projectFormFactory',

        function ($scope, projectFormFactory) {

            $scope.edit = projectFormFactory.openFormModal;
            $scope.delete = projectFormFactory.openDeleteForm
            $scope.restore = projectFormFactory.openRestoreForm
            $scope.purge = projectFormFactory.openPurgeForm

        }

    ])
;
