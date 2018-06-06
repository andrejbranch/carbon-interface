angular.module('production.spr.sprProductionDetailCtrl', [])

    .controller('sprProductionDetailCtrl', ['$scope', 'sprRequest', 'sprProductionFormFactory', 'projectGrid', 'bindingPartnerGrid',

        function ($scope, sprRequest, sprProductionFormFactory, projectGrid, bindingPartnerGrid) {

            $scope.sprRequest = sprRequest;
            $scope.projectGrid = projectGrid;
            $scope.bindingPartnerGrid = bindingPartnerGrid;
            $scope.edit = sprProductionFormFactory.openFormModal;

            $scope.statusLabelMapping = {
                'Pending': 'warning',
                'Completed': 'success',
                'Processing': 'primary',
                'Aborted': 'danger'
            };

            $scope.labelClass = $scope.statusLabelMapping[$scope.sprRequest.status];

        }

    ])
;
