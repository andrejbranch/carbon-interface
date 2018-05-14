angular.module('tag.tagFormFactory', [])

    .factory('tagFormFactory', ['$uibModal', '$state', '$stateParams', '$cbResource', 'tagGridFactory', '$cbGridBuilder', 'toastr', 'cbFormHelper',

        function ($uibModal, $state, $stateParams, $cbResource, tagGridFactory, $cbGridBuilder, toastr, $cbFormHelper) {

            var tagFormFactory = {

                openFormModal: function (tag) {

                    $uibModal.open({
                        templateUrl: 'tag/partials/tag-form-modal-tpl.html',
                        controller: 'tagFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            tag: function () {

                                return tag;

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                },

                openDeleteForm: function (tag, returnState) {

                    $cbFormHelper.openForm("delete", "tag", tag.id, '/storage/tag', returnState);

                },

                openRestoreForm: function (tag, returnState) {

                    $cbFormHelper.openForm("restore", "tag", tag.id, '/storage/tag', returnState);

                },

                openPurgeForm: function (tag, returnState) {

                    $cbFormHelper.openForm("purge", "tag", tag.id, '/storage/tag', returnState);

                }

            };

            return tagFormFactory;
        }

    ])
;
