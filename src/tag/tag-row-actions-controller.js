angular.module('tag.tagRowActionsCtrl', [])

    .controller('tagRowActionsCtrl', ['$scope', 'tagFormFactory',

        function ($scope, tagFormFactory) {

            $scope.edit = tagFormFactory.openFormModal
            $scope.delete = tagFormFactory.openDeleteForm
            $scope.restore = tagFormFactory.openRestoreForm
            $scope.purge = tagFormFactory.openPurgeForm

        }
    ])
;
