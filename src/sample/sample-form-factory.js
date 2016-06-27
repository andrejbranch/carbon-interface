angular.module('sample.formFactory', [])

    .factory('sampleFormFactory', ['$modal', 'sampleFactory', 'sampleGridFactory', '$state', '$stateParams',

        function ($modal, sampleFactory, sampleGridFactory, $state, $stateParams) {

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

                                return sampleFactory.getSampleTypes();

                            },

                            storageContainers: function () {

                                return sampleFactory.getStorageContainers();

                            },

                            linkedSamplesGrid: function () {

                                if (!sample) {

                                    return sampleGridFactory.getOneToManyGrid();

                                }

                                return sampleFactory.getLinkedSamples(sample).then(function (response) {

                                    var grid = sampleGridFactory.getOneToManyGrid(sample.id);

                                    grid.setPaginationFromResponse(response.data);
                                    grid.setResults(response.data.data);

                                    return grid;

                                });

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
