angular.module('storage.storageNavigationCtrl', [])

    .controller('storageNavigationCtrl', ['$scope', 'divisions', 'division', '$state', 'storageFormFactory', '$uibModal', '$cbResource', 'sessionFactory', '$q',

        function ($scope, divisions, division, $state, storageFormFactory, $uibModal, $cbResource, sessionFactory, $q) {

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
                        return false;
                    }

                    if (!division) {
                        return false;
                    }

                    if (!division.hasDimension) {
                        return true;
                    }

                    return false;
                },

                beforeDrop: function (event) {

                    return $scope.handleDropEvent(event);

                },

                beforeDrag: function (event) {

                    return event.$modelValue.canEdit;

                }

            };

            $scope.handleDropEvent = function (event) {

                var destNodesScope = event.dest.nodesScope;
                var sourceNodesScope = event.source.nodesScope;
                var sourceScope = event.source.nodeScope;

                // not really moving anywhere
                if (destNodesScope.$id === sourceNodesScope.$id && event.dest.index === event.source.index) {
                    return;
                }

                if (!event.dest.nodesScope.$parent.$modelValue.canEdit) {

                    swal({
                        title: "Sorry,",
                        text: "You do not have permission to edit " + event.dest.nodesScope.$parent.$modelValue.title,
                        type: "warning",
                        showCancelButton: false,
                        // confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    }, function() {});

                    return $q.reject();

                }

                return $uibModal.open({
                    templateUrl: 'storage/partials/division-move-confirm-tpl.html',
                    controller: 'storageDivisionMoveConfirmCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'md',
                    resolve: {

                        dropEvent: function () {

                            return event;

                        }

                    }

                }).result;

            };

            $scope.goToDivision = function (division) {
                $state.go('storage.division', {id:division.id});
            };

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

            $scope.toggleItem = function (division) {
                $cbResource.get('/storage/divisions')

            };

            $scope.isInventoryAdmin = sessionFactory.hasRole('ROLE_INVENTORY_ADMIN');
        }

    ])
;
