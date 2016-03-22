angular.module('grid.gridFactory', [])

    .factory('gridFactory', ['gridColumnFactory', 'gridFilterFactory',

        function (gridColumnFactory, gridFilterFactory) {

            var Grid = function () {

                this.results = null;

                this.columns = [];

                this.filters = [];

                this.actionTemplate = null;

                this.resourceUrl = null;

                this.sortingColumn = null;

                this.sortDirection = null;

                this.pagination = {};

                this.search = '';

            };

            Grid.prototype = {

                perPageOptions: [10, 25, 50, 100],

                create: function () {

                    return new Grid();

                },

                setResults: function (results) {

                    this.results = results;

                    return this;

                },

                setPage: function (page) {

                    this.pagination.page = page;

                    return this;

                },

                setPerPage: function (perPage) {

                    this.pagination.perPage = perPage;

                    return this;
                },

                addColumns: function (columns) {

                    var that = this;
                    columns.map(function (column) {
                        that.addColumn(column);
                    });

                    return this;

                },

                addColumn: function (column) {

                    this.columns.push(gridColumnFactory.create(column));

                    return this;

                },

                addFilters: function (filters) {

                    var that = this;
                    filters.map(function (filter) {
                        that.addFilter(filter);
                    });

                    return this;

                },

                addFilter: function (filter) {

                    this.filters.push(gridFilterFactory.create(filter));

                    return this;

                },

                setActionTemplate: function (actionTemplate) {

                    this.actionTemplate = actionTemplate;

                    return this;

                },

                setPaginationFromResponse: function (response) {

                    this.pagination = {
                        hasNextPage: response.hasNextPage,
                        page: response.page,
                        paginatedTotal: response.paginatedTotal,
                        perPage: response.perPage,
                        unpaginatedTotal: response.unpaginatedTotal,
                    };

                    this.pagination.startIndex = this.getStartIndex();
                    this.pagination.stopIndex = this.getStopIndex();

                    return this;

                },

                getStartIndex: function () {

                    return this.pagination.perPage * this.pagination.page - this.pagination.perPage + 1;

                },

                getStopIndex: function () {

                    return this.pagination.perPage * this.pagination.page - this.pagination.perPage + this.pagination.paginatedTotal;

                },

                sortColumn: function (sortColumn, direction) {

                    var that = this;
                    this.columns.map(function (column) {

                        if (column === sortColumn) {

                            column.sortDirection = direction;

                            that.sortingColumn = column;
                            that.sortDirection = direction;

                        }
                        else {

                            column.sortDirection = column.sort.NONE;

                        }


                    });

                    return this;

                },

                setResourceUrl: function (resourceUrl) {

                    this.resourceUrl = resourceUrl;

                    return this;

                },

                getRequestPath: function () {

                    var path = this.resourceUrl + '?';

                    var params = [];

                    if (this.sortingColumn) {
                        params.push('cOrderBy=' + this.sortingColumn.name);
                    }

                    if (this.sortDirection) {
                        params.push('cOrderByDirection=' + this.sortDirection);
                    }

                    if (this.search != '') {
                        params.push('cSearch=' + this.search);
                    }

                    this.filters.map(function (filter) {
                        params = params.concat(filter.getParams());
                    });

                    params.push('cPerPage=' + this.pagination.perPage);
                    params.push('cPage=' + this.pagination.page);

                    return path + params.join('&');

                }

            }

            Grid.create = function () {

                return new Grid();

            };

            return Grid;

        }

    ])
;
