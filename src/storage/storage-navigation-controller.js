angular.module('storage.storageNavigationCtrl', [])

    .controller('storageNavigationCtrl', ['$scope', 'divisions', 'division', '$state', 'storageFormFactory',

        function ($scope, divisions, division, $state, storageFormFactory) {

            $scope.divisions = divisions;
            $scope.selected = angular.copy(division);
            $scope.tests = [{}];

            $scope.expandedDivisions = [];
            var parent = division.parent;
            while (parent) {
                $scope.expandedDivisions.push(parent);
                parent = parent.parent !== undefined ? parent.parent : false;
            }

            $scope.treeOptions = {

                accept: function(sourceNodeScope, destNodesScope, destIndex) {

                    var division = destNodesScope.item;
                    var sourceDivision = sourceNodeScope.item;

                    if (division === undefined) {
                        return true;
                    }

                    if (!division) {
                        return false;
                    }

                    if (!division.hasDimension) {
                        return true;
                    }

                    return false;
                },

                dropped: function (event) {
                    var destNodesScope = event.dest.nodesScope;
                    event.source.nodeScope.collapse();

                    // console.log(event)
                    // console.log(destNodesScope.$treeScope);
                }

            };

            $scope.goToDivision = function (division) {
                $state.go('storage.division', {id:division.id});
            }   ;

            $scope.opts = {
                equality: function (node1, node2) {
                    return node1.id === node2.id;
                }
            };

            $scope.edit = function (division) {
                storageFormFactory.openDivisionFormModal(division);
            };

            $scope.addDivision = function (parentDivision) {

                storageFormFactory.openDivisionFormModal({parent: {id: parentDivision.id}});

            };

            $scope.createParentDivision = function () {

                storageFormFactory.openDivisionFormModal();

            };

        }

    ])
;
