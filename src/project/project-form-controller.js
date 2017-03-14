angular.module('project.projectFormCtrl', [])

    .controller('projectFormCtrl', ['$scope', '$uibModalInstance', '$cbResource', 'callback', 'toastr', 'project', 'sampleGrids',

        function ($scope, $modalInstance, $cbResource, callback, toastr, project, sampleGrids) {

            $scope.project = project ? angular.copy(project) : {};
            $scope.errors = [];
            $scope.projectForm = {};
            $scope.statuses = ['Ongoing', 'Completed'];
            $scope.sampleGrids = sampleGrids;

            $scope.close = function () {

                // @TODO
                if ($scope.projectForm.$pristine === false) {
                    // console.log('not pristine');

                }
                console.log

                $modalInstance.close();

            };

            $scope.submit = function (isValid) {

                $scope.$broadcast('form:submit');

                $scope.submitted = true;

                if (!isValid) {
                    return;
                }

                var method = $scope.project.id !== undefined ? 'update' : 'create';
                var url = method === 'update'
                    ? '/project?id[EQ]=' + $scope.project.id
                    : '/project'
                ;

                $cbResource[method](url, $scope.project).then(

                    function (response) {

                        toastr.info('Project ' + method + 'd successfully');
                        $scope.close();
                        callback();

                    },

                    function (response) {

                        $scope.errors = response.data;

                    }

                );

            }

        }

    ])
;
