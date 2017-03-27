angular.module('storage.storageFormFactory', [])

    .factory('storageFormFactory', ['$uibModal', 'storageFactory', '$state', '$stateParams', '$cbGridBuilder',

        function ($modal, storageFactory, $state, $stateParams, $cbGridBuilder) {

            var storageFormFactory = {

                openDivisionFormModal: function (division) {

                    $modal.open({
                        templateUrl: 'storage/partials/storage-division-form-tpl.html',
                        controller: 'storageDivisionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            division: function () {
                                return division;
                            },

                            sampleTypeGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-sample-type/division/', 'sampleTypeGridFactory', division, true);

                            },

                            storageContainerGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-storage-container/division/', 'storageContainerGridFactory', division, true);

                            },

                            divisionEditorGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-editor/division/', 'userGridFactory', division, true);

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }
                    });

                },

                openSampleStorageRemoveModal: function (samplesToRemove) {

                    $modal.open({
                        templateUrl: 'storage/partials/storage-sample-remove-tpl.html',
                        controller: 'storageSampleRemoveCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'md',
                        resolve: {

                            samplesToRemove: function () {
                                return samplesToRemove;
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

            return storageFormFactory;

        }
    ])
;
