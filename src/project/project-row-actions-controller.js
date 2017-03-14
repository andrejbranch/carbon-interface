angular.module('project.projectRowActionsCtrl', [])

    .controller('projectRowActionsCtrl', ['$scope', 'projectFormFactory',

        function ($scope, projectFormFactory) {

            $scope.edit = function (project) {

                projectFormFactory.openFormModal(project);

            };

        }

    ])
;
