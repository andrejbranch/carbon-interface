angular.module('sample.sampleIndexCtrl', [])

    .controller('sampleIndexCtrl', ['$scope', 'grid', 'sampleFormFactory',

        function ($scope, grid, sampleFormFactory) {

            $scope.grid = grid;

            $scope.create = function () {

                sampleFormFactory.openSampleFormModal()

            };

        }

    ])
;
