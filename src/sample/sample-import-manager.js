angular.module('sample.sampleImportManager', [])

    .service('sampleImportManager', ['$cbResource',

        function ($cbResource) {

            var sampleImportManager = {

                importData: null,

                selectedCells: null,

                setImportData: function (importData) {

                    this.importData = importData;

                    this.setSelectedCells();

                    return this;

                },

                setSelectedCells: function () {

                    var selectedCells = [];
                    angular.forEach(this.importData, function (data) {

                        if (data.division && selectedCells[data.division.id] === undefined) {
                            selectedCells[data.division.id] = {}
                        }

                        if (data.divisionRow && selectedCells[data.division.id][data.divisionRow] === undefined) {

                            selectedCells[data.division.id][data.divisionRow] = [];

                        }


                        if (data.division && data.divisionRow && data.divisionColumn) {
                            selectedCells[data.division.id][data.divisionRow][data.divisionColumn] = true;
                        }

                    });

                    this.selectedCells = selectedCells;

                },

                getAvailableCells: function (division, sample) {

                    return $cbResource.get('/storage/division/' + division.id + '/available-cells' ).then(function (response) {

                        var rowIndex = 0, columnIndex = 0, rowColumnMap = {}, rows = [];

                        angular.forEach(response, function (rowValue, rowKey) {

                            rows.push(rowKey);
                            rowColumnMap[rowKey] = {'columns': []};

                            if (sample.divisionRow === undefined && rowIndex === 0) {
                                sample.divisionRow = rowKey;
                            }

                            angular.forEach(rowValue, function (cellValue, cellKey) {

                                if (sampleImportManager.selectedCells[division.id] && sampleImportManager.selectedCells[division.id][rowKey] && sampleImportManager.selectedCells[division.id][rowKey][cellKey]) {

                                    if (division.id == sample.division.id && rowKey == sample.divisionRow && cellKey == sample.divisionColumn) {

                                        rowColumnMap[rowKey].columns.push(cellKey);

                                    }

                                } else {

                                    rowColumnMap[rowKey].columns.push(cellKey);

                                }

                                if (sample.divisionColumn === undefined && columnIndex === 0) {
                                    sample.divisionColumn = cellKey;
                                }

                                columnIndex++;

                            });

                            rowIndex++;

                        });

                        angular.forEach(rowColumnMap, function (row, rowKey) {
                            if (row.columns.length == 0) {
                                rows.splice(rows.indexOf(rowKey), 1);
                            }
                        });

                        return [rows, rowColumnMap];

                    });

                }

            };

            return sampleImportManager;

        }

    ])
;
