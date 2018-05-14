angular.module('sample.formFactory', [])

    .factory('sampleFormFactory', ['$uibModal', 'sampleGridFactory', '$state', '$stateParams', '$cbResource', 'storageGridFactory', '$cbGridBuilder',

        function ($modal, sampleGridFactory, $state, $stateParams, $cbResource, storageGridFactory, $cbGridBuilder) {

            var sampleFormFactory = {

                openSampleFormModal: function (sample) {

                    $modal.open({
                        templateUrl: 'sample/views/partials/sample-form-modal-tpl.html',
                        controller: 'sampleFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            sample: function () {

                                return sample;

                            },

                            sampleTypes: function () {

                                return $cbResource.get('/storage/sample-type');

                            },

                            storageContainers: function () {

                                return $cbResource.get('/storage/storage-container');

                            },

                            linkedSampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids(
                                    '/storage/sample-linked-sample/', 'sampleGridFactory', sample, true
                                );

                            },

                            catalogGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('catalogGridFactory');

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/project-sample/sample/', 'projectGridFactory', sample, true)

                            },

                            divisionGrid: function () {

                                var sampleTypeId = sample ? sample.sampleTypeId : null;
                                var storageContainerId = sample ? sample.storageContainer.id : null;

                                return storageGridFactory.getDivisionMatchGrid(sampleTypeId, storageContainerId);

                            },

                            tagGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/storage/sample-tag/sample/', 'tagGridFactory', sample, true)

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                },

                openSampleChangeLocationFormModal: function (sample) {

                    $modal.open({
                        templateUrl: 'sample/partials/sample-import-change-location-tpl.html',
                        controller: 'sampleImportChangeLocationCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            sample: function () {

                                return sample;

                            },

                            divisionGrid: function () {

                                var sampleTypeId = sample ? sample.sampleType.id : null;
                                var storageContainerId = sample ? sample.storageContainer.id : null;

                                return storageGridFactory.getDivisionMatchGrid(sampleTypeId, storageContainerId);

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

            return sampleFormFactory;
        }

    ])
;
