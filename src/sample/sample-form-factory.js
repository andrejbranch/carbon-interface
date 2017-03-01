angular.module('sample.formFactory', [])

    .factory('sampleFormFactory', ['$uibModal', 'sampleGridFactory', '$state', '$stateParams', '$cbResource', 'storageGridFactory',

        function ($modal, sampleGridFactory, $state, $stateParams, $cbResource, storageGridFactory) {

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

                            linkedSamplesGrid: function () {

                                return sampleGridFactory.getOneToManyGrid(sample ? sample.id : null, true);

                            },

                            sampleSelectGrid: function () {

                                return sampleGridFactory.getSelectGrid();

                            },

                            divisionGrid: function () {

                                return storageGridFactory.getDivisionGrid();

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
