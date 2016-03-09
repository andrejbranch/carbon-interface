angular.module('sample.sampleIndexCtrl', [])
    .controller('sampleIndexCtrl', ['$scope', 'sampleResponse', '$modal', '$state', '$stateParams', 'sampleTypes', 'storageContainers',

        function ($scope, sampleResponse, $modal, $state, $stateParams, sampleTypes, storageContainers) {

            $scope.sampleResponse = sampleResponse;
            $scope.samples = sampleResponse.data;
            $scope.storageContainers;

            var sampleCallback = function () {

                $state.go($state.current, $stateParams, {reload:true});

            };

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

                            return sampleTypes.data;

                        },

                        storageContainers: function () {

                            return storageContainers.data;

                        },

                        callback: function () {

                            return sampleCallback;

                        }

                    }

                });
            };
        }

    ])
;
