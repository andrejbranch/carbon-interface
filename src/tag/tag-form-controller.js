angular.module('tag.tagFormCtrl', [])

    .controller('tagFormCtrl', ['$scope', '$uibModalInstance', 'tag', '$cbResource', 'toastr', 'callback', '$cbForm',

        function ($scope, $modalInstance, tag, $cbResource, toastr, callback, $cbForm) {

            $scope.tag = tag ? angular.copy(tag) : {};
            $scope.tagForm = {};

            $scope.cbForm = $cbForm.create()
                .setType('Tag')
                .setObject($scope.tag)
                .setUrl('/storage/tag')
                .setObjectClass('AppBundle\\Entity\\Storage\\Tag')
            ;

            $scope.close = function (){

                $scope.cbForm.close($scope.tagForm,$scope);
            };

            $scope.save = function () {

                $scope.cbForm.save($scope.tagForm, $scope);
            };
        }
    ])
;
