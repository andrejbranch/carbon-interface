angular.module('sample.sampleRowActionsCtrl', [])

    .controller('sampleRowActionsCtrl', ['$scope', '$modal', 'sampleFactory', '$state', '$stateParams', 'sampleGridFactory',

        function ($scope, $modal, sampleFactory, $state, $stateParams, sampleGridFactory) {

            $scope.editSample = function (sample) {

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
            };

        }

    ])
;
