angular.module('grid.gridFilterDirective', [])

    .directive('gridFilter', ['$http', 'API',

        function ($http, API) {

            return {

                restrict: 'E',
                templateUrl: 'common/grid/filter/partials/grid-filter-tpl.html',
                link: function ($scope, element, attrs, gridCtrl) {

                    if (attrs.filter === undefined) {
                        throw new Error('Filter Directive: filter attribute must be defined');
                    }

                    if ($scope[attrs.filter] === undefined) {
                        throw new Error('Filter Directive: variable ' + attrs.filter + ' not found on inherited scope');
                    }

                    $scope.filter = $scope[attrs.filter];

                    element.find('li').on('click', function (e) {
                        return false;
                    });

                    var init = function () {

                        var url = API.url + $scope.filter.resourceUrl + '?';

                        var params = [];
                        if ($scope.form.search !== '') {
                           params.push('cSearch=' + $scope.form.search);
                        }

                        params.push('cPerPage=5');


                        // if ($sc.filteredIds !== undefined) {
                        $scope.filter.selectedItems.map(function(item) {

                            params.push('cNot[id][]=' + item.id);

                        });

                        $http.get(url + params.join('&')).then(function (response) {

                            $scope.filter.setResults(response.data.data);

                        });

                    };

                    $scope.form = {
                        search: ''
                    };

                    $scope.search = function () {

                        init();

                    };

                    $scope.selectItem = function (item) {
                        $scope.filter.selectItem(item);
                        init();
                        $scope.refresh();
                    };

                    $scope.removeItem = function (item) {
                        $scope.filter.removeItem(item);
                        init();
                        $scope.refresh();
                    };


                    init();
                }
            };

        }

    ])
;
