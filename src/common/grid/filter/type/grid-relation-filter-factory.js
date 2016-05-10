angular.module('grid.gridRelationFilterFactory', [])

    .factory('gridRelationFilterFactory', [

        function () {

            var GridRelationFilter = function (defaults) {

                this.results = [];

                this.selectedItems = [];

                this.filterProperty = null;

                this.title = null;

                this.selectedItemsString = 'Any';

                this.bindTo = null;

                this.controllerName = 'gridRelationFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-relation-filter-tpl.html';

                this.isVisible = true;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridRelationFilter.prototype = {

                setResults: function (results) {
                    this.results = results;
                },

                selectItem: function (item) {

                    this.selectedItems.push(item);

                    this.results.splice(this.results.indexOf(item), 1);

                    this.updateSelectedItemsString();

                },

                removeItem: function (item) {

                    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);

                    this.updateSelectedItemsString();

                },

                updateSelectedItemsString: function () {

                    if (this.selectedItems.length === 0) {

                        this.selectedItemsString = 'Any';

                        return;
                    }

                    var that = this;

                    this.selectedItemsString = this.selectedItems.map(function(item) {
                        return item[that.bindTo];
                    }).join(', ');

                },

                getParams: function () {

                    var params = [];

                    var that = this;
                    this.selectedItems.map(function (item) {
                        params.push(that.filterProperty + '[]=' + item[that.accessProperty]);
                    });

                    return params;

                }

            };

            GridRelationFilter.create = function (defaults) {
                return new GridRelationFilter(defaults);
            };

            return GridRelationFilter;

        }

    ])
;
