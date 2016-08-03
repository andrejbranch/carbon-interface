angular.module('sample.sampleIndexCtrl', [])

    .controller('sampleIndexCtrl', ['$scope', 'grid', 'sampleFormFactory', 'sampleTypes', '$state',

        function ($scope, grid, sampleFormFactory, sampleTypes, $state) {

            $scope.grid = grid;
            $scope.sampleTypes = sampleTypes.data;

            $scope.create = function () {

                sampleFormFactory.openSampleFormModal()

            };

            $scope.importSamples = function (sampleType) {

                $state.go('sample.import', {sampleTypeId:sampleType.id});

            }

        }

    ])
;
