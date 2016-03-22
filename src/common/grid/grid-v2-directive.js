angular.module('grid.gridV2Directive', [])

    .directive('gridV2', ['$http', 'API',

        function ($http, API) {

            return {

                restrict: 'E',

                templateUrl: 'common/grid/views/grid-v2-directive-tpl.html',

                link: function ($scope, element, attrs) {

                    if (attrs.grid === undefined) {
                        throw new Error('Grid Directive: grid attribute must be defined');
                    }

                    if ($scope[attrs.grid] === undefined) {
                        throw new Error('Grid Directive: variable ' + attrs.grid + ' not found on inherited scope');
                    }

                    $scope.grid = $scope[attrs.grid];

                    $scope.sortColumn = function (column) {

                        if (false === column.isSortable) {
                            return;
                        }

                        var direction = column.sortDirection === column.sort.ASC ? column.sort.DESC : column.sort.ASC;

                        $scope.grid.sortColumn(column, direction);

                        $scope.refresh();

                    };

                    // $scope.updatePerPage = function () {

                    // };

                    // $scope.onPageChange = function () {

                    //     // update the page
                    //     $scope.grid.setPage($scope.model.page);

                    //     // now refresh the grid
                    //     $scope.refresh();

                    // };

                    $scope.refresh = function () {

                        $http.get(API.url + $scope.grid.getRequestPath()).then(function (response) {

                            $scope.grid
                                .setResults(response.data.data)
                                .setPaginationFromResponse(response.data)
                            ;

                        });

                    };

                }

            };

        }

    ])
;
