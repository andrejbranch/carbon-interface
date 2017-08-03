angular.module('production.dna.dnaProductionRowActionsCtrl', [])

    .controller('dnaProductionRowActionsCtrl', ['$scope', 'dnaProductionFormFactory',

        function ($scope, dnaProductionFormFactory) {

            $scope.edit = function (sample) {

                dnaProductionFormFactory.openFormModal(sample);

            };

        }

    ])
;
