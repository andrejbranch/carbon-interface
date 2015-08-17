angular.module('grid.gridPaginationDirective', [])
    .directive('gridPagination', [

        function () {

            return {

                require: '^grid',
                restrict: 'E',
                transclude: true,
                template: '<ng-transclude></ng-transclude>',
                link: function (scope, element, attrs, gridCtrl) {


                    var init = function () {

                        scope.pagination = gridCtrl.pagination;
                        scope.perPage = scope.pagination.perPage;
                        scope.page = scope.pagination.page;
                        scope.hasNextPage = scope.pagination.hasNextPage;
                        scope.paginatedTotal = scope.pagination.paginatedTotal;
                        scope.unpaginatedTotal = scope.pagination.unpaginatedTotal;

                        scope.startIndex = scope.perPage * scope.page - scope.perPage + 1;
                        scope.stopIndex = scope.perPage * scope.page - scope.perPage + scope.paginatedTotal;

                        scope.model =  {
                            page: scope.page
                        };

                        // set the current page
                        gridCtrl.setPage(scope.model.page);

                    };

                    scope.$on('grid.refresh', function () {

                        init();

                    });

                    scope.onPageChange = function () {

                        // update the page
                        gridCtrl.setPage(scope.model.page);

                        // now refresh the grid
                        gridCtrl.refresh();

                    };

                    init();

                }

            };

        }

    ])
;
