angular.module('project.projectDetailCtrl', [])

    .controller('projectDetailCtrl', ['$scope', 'project', 'projectFormFactory', 'sampleGrid',

        function ($scope, project, projectFormFactory, sampleGrid) {

            $scope.project = project;
            $scope.edit = projectFormFactory.openFormModal;
            $scope.sampleGrid = sampleGrid;

            $scope.statusLabelMapping = {
                'Ongoing': 'info',
                'Completed': 'success',
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.project.status];

        }

    ])
;
