angular.module('sample.sampleImportRowActionsCtrl', [])

    .controller('sampleImportRowActionsCtrl', ['$scope', 'sampleFormFactory',

        function ($scope, sampleFormFactory) {

            $scope.changeLocation = sampleFormFactory.openSampleChangeLocationFormModal;

        }

    ])
;
