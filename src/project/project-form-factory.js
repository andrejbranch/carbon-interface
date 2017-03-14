angular.module('project.projectFormFactory', [])

    .factory('projectFormFactory', ['$uibModal', '$state', '$stateParams', '$cbGridBuilder',

        function ($modal, $state, $stateParams, $cbGridBuilder) {

            var projectFormFactory = {

                openFormModal: function (project) {

                    $modal.open({
                        templateUrl: 'project/partials/project-form-tpl.html',
                        controller: 'projectFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            project: function () {

                                return project;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/project-sample/project/', 'sampleGridFactory', project, true)

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                }

            };

            return projectFormFactory;
        }

    ])
;
