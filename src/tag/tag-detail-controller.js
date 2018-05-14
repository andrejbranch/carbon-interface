angular.module('tag.tagDetailCtrl', [])

    .controller('tagDetailCtrl', ['$scope', 'tag', 'tagFormFactory', 'samples',

        function ($scope, tag, tagFormFactory, samples) {

            $scope.tag = tag;
            $scope.samples = samples;

            $scope.edit = tagFormFactory.openFormModal;
            $scope.delete = tagFormFactory.openDeleteForm

        }

    ])
;
