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

                            linkedSamplesGrid: function () {

                                return $cbGridBuilder.buildOTM(
                                    '/storage/sample-linked-sample/', 'sampleGridFactory', sample, true
                                )

                            },

                            sampleSelectGrid: function () {

                                return $cbGridBuilder.buildSelect('sampleGridFactory')

                            },

                            divisionGrid: function () {

                                return $cbGridBuilder.buildSelect('storageGridFactory', true);

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
