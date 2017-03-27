angular.module('storage.storageDivisionManager', [])

    .service('storageDivisionManager', ['sampleFormFactory', 'storageFormFactory',

        function (sampleFormFactory, storageFormFactory) {

            var storageDivisionManager = {

                division: null,

                cellScopes: {},

                selectedCells: {},

                selectedDivisions: [],

                selectedCount: 0,

                selectedSampleCount: 0,

                selectedEmptyCount: 0,

                initialize: function () {
                    this.division = null;
                    this.cellScopes = {};
                    this.selectedCells = {};
                    this.selectedDivisions = [];
                    this.selectedCount = 0;
                    this.selectedSampleCount = 0;
                },

                addCell: function (cellScope) {
                    var row = cellScope.row;
                    var column = cellScope.column;

                    if (!this.cellScopes[row]) {
                        this.cellScopes[row] = [];
                    }

                    this.cellScopes[row][column] = cellScope;
                },

                selectRow: function (row, shifted) {
                    if (!shifted) {
                        this.deselectAll();
                    }
                    var rowCells = this.cellScopes[row];
                    for (var column in rowCells) {
                        this.toggle(row, column);
                    }
                },

                selectColumn: function (column, shifted) {
                    if (!shifted) {
                        this.deselectAll();
                    }
                    for (row in this.cellScopes) {
                        for (var columnKey in this.cellScopes[row]) {
                            if (columnKey == column) {
                                this.toggle(row, column);
                            }
                        }
                    }
                },
                deselectAll: function () {
                    this.selectedCells = {};
                    this.selectedCount = 0;
                    this.selectedSampleCount = 0;
                    this.selectedEmptyCount = 0;
                },

                toggleCell: function (row, column, shifted) {
                    if (!shifted) {
                        this.deselectAll();
                    }
                    this.toggle(row,column);
                },

                toggle: function (row, column) {

                    if (this.selectedCells[row] && this.selectedCells[row][column]) {
                        this.selectedCount -= 1;
                        if (this.cellScopes[row][column].sample) {
                            this.selectedSampleCount -= 1;
                        } else {
                            this.selectedEmptyCount -= 1;
                        }
                        delete this.selectedCells[row][column];
                        return;
                    }

                    if (!this.selectedCells[row]) {
                        this.selectedCells[row] = [];
                    }

                    this.selectedCells[row][column] = true;

                    this.selectedCount += 1;

                    if (this.cellScopes[row][column].sample) {
                        this.selectedSampleCount += 1;
                    } else {
                        this.selectedEmptyCount += 1;
                    }

                },

                getSelectedSample: function () {
                    for (row in this.selectedCells) {
                        for (column in this.selectedCells[row]) {
                            return this.cellScopes[row][column].sample;
                        }
                    }
                },

                getSelectedSamples: function () {
                    var samples = [];
                    for (row in this.selectedCells) {
                        for (column in this.selectedCells[row]) {
                            if (this.cellScopes[row][column].sample) {
                                samples.push(this.cellScopes[row][column].sample);
                            }
                        }
                    }

                    return samples;
                },

                editSelectedSample: function () {
                    var sample = storageDivisionManager.getSelectedSample();
                    sampleFormFactory.openSampleFormModal(sample);
                },

                toggleDivision: function (division) {
                    if (this.selectedDivisions[division.id]) {
                        delete this.selectedDivisions[division.id];
                        return;
                    }
                    this.selectedDivisions[division.id] = true;
                },

                delete: function () {

                    var samples = this.getSelectedSamples();
                    storageFormFactory.openSampleStorageRemoveModal(samples);

                }

            };

            return storageDivisionManager;
        }

    ])
;
