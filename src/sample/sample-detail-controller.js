angular.module('sample.sampleDetailCtrl', [])

    .controller('sampleDetailCtrl', ['$scope', 'sample', 'linkedSamplesGrid', 'sampleFormFactory', 'projectGrid',

        function ($scope, sample, linkedSamplesGrid, sampleFormFactory, projectGrid) {

            $scope.sample = sample;
            $scope.linkedSamplesGrid = linkedSamplesGrid;
            $scope.edit = sampleFormFactory.openSampleFormModal;
            $scope.projectGrid = projectGrid;

            $scope.statusLabelMapping = {
                'Available': 'primary',
                'Depleted': 'warning',
                'Destroyed': 'danger',
                'Shipped': 'default'
            };

            $scope.sampleTypeIconMapping = {
                'DNA': 'dna.png',
                'Chemical Compound': 'chemical_compound_2.png',
                'Mammalian Cells': 'mammalian_cells.png',
                'Protein': 'protein.png',
                'Sera': 'sera.png',
                'Solution': 'solution.png',
                'Yeast Cells': 'yeast_cells_2.png',
                'Bacterial Cells': 'bacterial_cells_2.png',
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.sample.status];
            $scope.iconFile = $scope.sampleTypeIconMapping[$scope.sample.sampleType.name];

        }

    ])
;
