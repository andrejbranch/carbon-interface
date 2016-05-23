angular.module('grid.gridIntegerFilterFactory', [])

    .factory('gridIntegerFilterFactory', [

        function () {

            var GridIntegerFilter = function (defaults) {

                this.filterProperty = null;

                this.controllerName = 'gridIntegerFilterCtrl';

                this.templateUrl = 'common/grid/filter/type/partials/grid-integer-filter-tpl.html';

                this.selectedOperator = this.operators[0];

                this.selectedType = 'single';

                this.singleValue = '';

                this.betweenStart = '';

                this.endStart = '';

                this.selectionString = 'Any';

                this.isVisible = true;

                this.isFiltering = false;

                for (attr in defaults) {
                    this[attr] = defaults[attr];
                }

            };

            GridIntegerFilter.prototype = {

                operators: [
                    {
                        value: 'LTE',
                        name: '<='
                    },
                    {
                        value: 'GTE',
                        name: '>='
                    },
                    {
                        value: 'EQ',
                        name: '='
                    }
                ],

                refresh: function () {

                    this.selectedType = 'single';
                    this.singleValue = '';
                    this.selectedOperator = this.operators[0];
                    this.betweenStart = '';
                    this.endStart = '';
                    this.isFiltering = false;

                },

                updateSelectionString: function () {

                    if (this.selectedType === 'single' && !!this.singleValue) {

                        this.selectionString = this.selectedOperator.name + ' ' + this.singleValue;

                        this.isFiltering = true;

                        return;

                    }

                    if (this.selectedType === 'between' && !!this.betweenStart && !!this.endStart) {

                        this.selectionString = this.operators[1].name + ' ' + this.betweenStart + ' ' + this.operators[0].name + ' ' + this.endStart;

                        this.isFiltering = true;

                        return;

                    }

                    this.isFiltering = false;

                    this.selectionString = 'Any';

                },

                getParams: function () {

                    this.updateSelectionString();

                    if (this.selectedType === 'single' && !!this.singleValue) {

                        return this.filterProperty + '[' + this.selectedOperator.value + ']=' + this.singleValue;

                    }

                    if (this.selectedType === 'between' && !!this.betweenStart && !!this.endStart) {

                        var params = [];

                        params.push(this.filterProperty + '[' + this.operators[1].value + ']=' + this.betweenStart);

                        params.push(this.filterProperty + '[' + this.operators[0].value + ']=' + this.endStart);

                        return params.join('&');

                    }


                    return '';

                }

            };

            GridIntegerFilter.create = function (defaults) {
                return new GridIntegerFilter(defaults);
            };

            return GridIntegerFilter;

        }

    ])
;
