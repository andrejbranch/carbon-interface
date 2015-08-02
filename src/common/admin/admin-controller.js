angular.module('admin.adminCtrl', [])
    .controller('adminCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', 'API', '$compile', 'users',

        function ($scope, DTOptionsBuilder, DTColumnBuilder, API, $compile, users) {

            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('ajax', {
                    url: API.url + '/user/grid',
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
                    .withOption('iDeferLoading', 10)
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

        }
    ])
;
