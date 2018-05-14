angular.module('project.projectFormCtrl', [])

    .controller('projectFormCtrl', ['$scope', 'project', 'sampleGrids', '$cbForm',

        function ($scope, project, sampleGrids, $cbForm) {

            $scope.project = project ? angular.copy(project) : {};
            $scope.projectForm = {};
            $scope.statuses = ['Ongoing', 'Completed'];
            $scope.sampleGrids = sampleGrids;

            $scope.cbForm = $cbForm.create()
                .setType('Project')
                .setObject($scope.project)
                .setUrl('/project')
                .setObjectClass('AppBundle\\Entity\\Project')
            ;

            $scope.close = function () {

                $scope.cbForm.close($scope.projectForm, $scope);

            };

            $scope.save = function () {

                $scope.cbForm.save($scope.projectForm, $scope);

            };

        }

    ])
;
