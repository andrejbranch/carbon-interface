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

                                return $cbGridBuilder.buildMTMGrids('/storage/division-sample-type/division/', 'sampleTypeGridFactory', division, true)

                            },

                            storageContainerGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/division-storage-container/division/', 'storageContainerGridFactory', division, true)

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
