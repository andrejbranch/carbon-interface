angular.module('project.projectFormFactory', [])

    .factory('projectFormFactory', ['$uibModal', '$state', '$stateParams', '$cbGridBuilder', 'cbFormHelper',

        function ($modal, $state, $stateParams, $cbGridBuilder, cbFormHelper) {

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

                },

                openDeleteForm: function (project, returnState) {

                    cbFormHelper.openForm("delete", "Project - " + project.name , project.id, '/project', returnState);

                },


                openRestoreForm: function (project, returnState) {

                    cbFormHelper.openForm("restore", "Project - " + project.name, project.id, '/project', returnState);

                },

                openPurgeForm: function (project, returnState) {

                    cbFormHelper.openForm("purge", "Project - " + project.name, project.id, '/project', returnState);

                }


            };

            return projectFormFactory;
        }

    ])
;
