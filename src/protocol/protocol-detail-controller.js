angular.module('protocol.protocolDetailCtrl', [])

    .controller('protocolDetailCtrl', ['$scope', 'protocol', 'protocolFormFactory',

        function ($scope, protocol, protocolFormFactory) {

            $scope.protocol = protocol;
            $scope.edit = protocolFormFactory.openFormModal;

        }

    ])
;
