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

                    $scope.refresh = function () {

                        if ($scope.grid.data) {

                            $scope.grid.turnPage();

                            return;

                        }

                        $http.get(API.url + $scope.grid.getRequestPath()).then(function (response) {

                            $scope.grid
                                .setResults(response.data.data)
                                .setPaginationFromResponse(response.data)
                            ;

                        });

                    };

                    $scope.removeItem = function (item) {

                        $scope.grid.removeItem(item);

                    };

                    $scope.removeAddingItem = function (item) {

                        $scope.grid.removeAddingItem(item);

                    };

                    $scope.isRemoving = function (item) {
                        return $scope.grid.removingItemIds.indexOf(item.id) !== -1;
                    };

                    $scope.restoreRemovedItem = function (item) {

                        $scope.grid.restoreRemovedItem(item);

                    };

                }


            };

        }

    ])
;
