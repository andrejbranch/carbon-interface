angular.module('storage.storageNavigationCtrl', [])
    .controller('storageNavigationCtrl', ['$scope', 'divisionResponse', 'division', '$state',

        function ($scope, divisionResponse, division, $state) {

            $scope.divisions = divisionResponse.data;
            $scope.selected = angular.copy(division);

            $scope.expandedDivisions = [];
            var parent = division.parent;
            while (parent) {
                $scope.expandedDivisions.push(parent);
                parent = parent.parent !== undefined ? parent.parent : false;
            }

            $scope.goToDivision = function (division) {
                $state.go('storage.division', {id:division.id});
            };

            $scope.opts = {
                equality: function (node1, node2) {
                    return node1.id === node2.id;
                }
            };

        }

    ])
;
