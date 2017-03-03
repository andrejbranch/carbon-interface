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

                            sampleTypeSelectGrid: function () {

                                return $cbGridBuilder.buildSelect('/storage/sample-type', 'sampleTypeGridFactory')

                            },

                            divisionSampleTypeGrid: function () {

                                return $cbGridBuilder.buildOTM(
                                    '/storage/division-sample-type/division/', 'sampleTypeGridFactory', division, true
                                )

                            },

                            storageContainerSelectGrid: function () {

                                return $cbGridBuilder.buildSelect('/storage/storage-container', 'storageContainerGridFactory')

                            },

                            divisionStorageContainerGrid: function () {

                                return $cbGridBuilder.buildOTM(
                                    '/storage/division-storage-container/division/', 'storageContainerGridFactory', division, true
                                )

                            },

                            callback: function ($state) {

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
