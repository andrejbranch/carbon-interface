angular.module('admin.adminCtrl', [])
    .controller('adminCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'API', '$compile', 'userRequest', 'roleRequest',

        function ($scope, DTOptionsBuilder, DTColumnBuilder, API, $compile, userRequest, roleRequest) {

            var users = userRequest.data;
            var userUnpaginatedTotal = userRequest.unpaginatedTotal;

            var roles = roleRequest.data;
            var roleUnpaginatedTotal = roleRequest.unpaginatedTotal;

            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('ajax', {
                    url: API.url + '/user',
                    type: 'GET'
                })
                .withOption('createdRow', function(row, data, dataIndex) {
                    // Recompiling so we can bind Angular directive to the DT
                    $compile(angular.element(row).contents())($scope);
                })
                .withDataProp('data')
                    .withOption('processing', true)
                    .withOption('serverSide', true)
                    .withOption('searchDelay', 600)
                    .withOption('iDeferLoading', userUnpaginatedTotal)
                    .withOption('aaData', users)
                    .withPaginationType('full_numbers')
            ;

            $scope.dtColumns = [
                DTColumnBuilder.newColumn('id').withTitle('Id').renderWith(
                    function (data, type, full, meta) {
                        return '<a ui-sref="profile.index">' + data + '</a>';
                    }
                ),
                DTColumnBuilder.newColumn('firstName').withTitle('First Name'),
                DTColumnBuilder.newColumn('lastName').withTitle('Last Name'),
                DTColumnBuilder.newColumn('email').withTitle('Email'),
                DTColumnBuilder.newColumn('username').withTitle('Username')
            ];

            $scope.dtRoleOptions = DTOptionsBuilder.newOptions()
                .withOption('ajax', {
                    url: API.url + '/role',
                    type: 'GET'
                })
                // .withOption('createdRow', function(row, data, dataIndex) {
                //     // Recompiling so we can bind Angular directive to the DT
                //     $compile(angular.element(row).contents())($scope);
                // })
                .withDataProp('data')
                    .withOption('processing', true)
                    .withOption('serverSide', true)
                    .withOption('searchDelay', 600)
                    .withOption('iDeferLoading', roleUnpaginatedTotal)
                    .withOption('aaData', roles)
                    .withOption('responsive', true)
                    .withPaginationType('full_numbers')
            ;

            $scope.dtRoleColumns = [
                DTColumnBuilder.newColumn('id').withTitle('Id'),
                DTColumnBuilder.newColumn('role').withTitle('Role')
            ];

            $scope.dtInstanceCallback = function (dtInstance) {

                new jQuery.fn.dataTable.Responsive(dtInstance.dataTable, {
                    details: {
                        type: 'column',
                        target: 'tr'
                    }
                });

            };
        }
    ])
;
