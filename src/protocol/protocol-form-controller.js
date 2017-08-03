angular.module('protocol.protocolFormCtrl', [])

    .controller('protocolFormCtrl', ['$scope', 'protocol', '$cbForm',

        function ($scope, protocol, $cbForm) {

            $scope.protocol = protocol ? angular.copy(protocol) : {};
            $scope.protocolForm = {};

            $scope.cbForm = $cbForm.create()
                .setType('protocol')
                .setObject($scope.protocol)
                .setUrl('/protocol')
                .setObjectClass('AppBundle\\Entity\\Storage\\protocol')
            ;

            $scope.close = function () {
                $scope.cbForm.close($scope.protocolForm, $scope);
            };

            $scope.save = function () {

                $scope.cbForm.save($scope.protocolForm, $scope);

            };

        }

    ])
;
