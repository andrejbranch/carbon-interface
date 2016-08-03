angular.module('storage.storageFormFactory', [])

    .factory('storageFormFactory', ['$uibModal', 'storageFactory', '$state', '$stateParams',

        function ($modal, storageFactory, $state, $stateParams) {

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

                            divisionSampleTypeGrid: function (storageGridFactory) {

                                return storageGridFactory.getDivisionSampleTypeGrid(division.id);

                            },

                            divisionStorageContainerGrid: function (storageGridFactory) {

                                return storageGridFactory.getDivisionStorageContainerGrid(division.id);

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
