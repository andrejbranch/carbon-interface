angular.module('sample.sampleRowActionsCtrl', [])

    .controller('sampleRowActionsCtrl', ['$scope', 'sampleFormFactory',

        function ($scope, sampleFormFactory) {

            $scope.editSample = function (sample) {

                sampleFormFactory.openSampleFormModal(sample);

            };

        }

    ])
;
