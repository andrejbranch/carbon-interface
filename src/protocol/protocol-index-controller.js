angular.module('protocol.protocolIndexCtrl', [])

    .controller('protocolIndexCtrl', ['$scope', 'grid', 'protocolFormFactory',

        function ($scope, grid, protocolFormFactory) {

            $scope.grid = grid;
            $scope.create = protocolFormFactory.openFormModal;

        }

    ])
;
