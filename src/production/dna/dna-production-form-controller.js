angular.module('production.dna.dnaProductionFormCtrl', [])

    .controller('dnaProductionFormCtrl', ['$scope', 'dnaProduction', '$cbForm', 'sampleGrids', 'projectGrids', 'protocolGrid',

        function ($scope, dnaProduction, $cbForm, sampleGrids, projectGrids, protocolGrid) {

            $scope.dnaProduction = dnaProduction ? angular.copy(dnaProduction) : {status:'Pending', concentrationUnits: 'mg/mL', volumeUnits: 'mL'};
            $scope.dnaProductionForm = {};
            $scope.statuses = ['Pending', 'Processing', 'Aborted', 'Completed'];
            $scope.sampleGrids = sampleGrids;
            $scope.projectGrids = projectGrids;
            $scope.protocolGrid = protocolGrid;

            $scope.concentrationUnits = ['mg/mL', 'ng/uL', 'Molar'];
            $scope.volumeUnits = ['uL', 'mL'];

            $scope.cbForm = $cbForm.create()
                .setType('DNA Production')
                .setObject($scope.dnaProduction)
                .setUrl('/production/dna')
                .setObjectClass('AppBundle\\Entity\\Production\\DNA')
            ;


            $scope.close = function () {
                $scope.cbForm.close($scope.dnaProductionForm, $scope);
            };

            $scope.save = function () {

                $scope.cbForm.save($scope.dnaProductionForm, $scope);

            };

        }

    ])
;
