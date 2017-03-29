angular.module('storage.storageDivisionManager', [])

    .service('storageDivisionManager', ['sampleFormFactory', 'storageFormFactory', '$compile', '$q',

        function (sampleFormFactory, storageFormFactory, $compile, $q) {

            var storageDivisionManager = {

                division: null,

                cellScopes: {},

                selectedCells: {},

                selectedDivisions: [],

                selectedCount: 0,

                selectedSampleCount: 0,

                selectedEmptyCount: 0,

                isDragging: false,

                ghosts: null,

                pageX: null,

                pageY: null,

                sampleMap: {},

                initialize: function (division) {
                    this.division = division;
                    this.cellScopes = {};
                    this.selectedCells = {};
                    this.selectedDivisions = [];
                    this.selectedCount = 0;
                    this.selectedSampleCount = 0;
                    this.sampleMap = this.getSampleMap();
                },

                getSampleMap: function () {

                    var divisionRow, divisionColumn, map = {};
                    angular.forEach(this.division.samples, function (sample) {

                        divisionRow = sample.divisionRow;
                        divisionColumn = sample.divisionColumn;

                        if (map[divisionRow] === undefined) {
                            map[divisionRow] = {};
                        }

                        map[divisionRow][divisionColumn] = sample;

                    });

                    return map;

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

                getSelectedSampleScopes: function () {
                    var scopes = [];
                    for (row in this.selectedCells) {
                        for (column in this.selectedCells[row]) {
                            if (this.cellScopes[row][column].sample) {
                                scopes.push(this.cellScopes[row][column]);
                            }
                        }
                    }

                    return scopes;
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

                },

                makeGhosts: function () {

                    var selectedSampleScopes = this.getSelectedSampleScopes();
                    var newEl, originalEl, cellEl, ghostScope;
                    var bodyEl = angular.element('body');
                    var ghosts = [];

                    scrollTop = angular.element('div.storage-division-container').scrollTop()

                    angular.forEach(selectedSampleScopes, function (scope) {

                        originalEl = scope.element;
                        cellEl = angular.element(originalEl).find('.cell');
                        newEl = angular.element('<div class="storage-ghost"><div class="cell"><span class="sample-name"> '+ scope.sample.name +'</span></div></div>');
                        newEl.css({
                            'width': originalEl.offsetWidth + 'px',
                            'height': originalEl.offsetHeight + 'px',
                            'top': originalEl.offsetTop + 50 - scrollTop + 'px',
                            'left': originalEl.offsetLeft + 'px'
                        });
                        newEl.find('.cell').css({
                            'background-image': cellEl.css('background-image')
                        });

                        ghostScope = scope.$new()
                        ghostScope.sample = scope.sample;
                        $compile(newEl)(ghostScope);
                        bodyEl.append(newEl);
                        ghosts.push(newEl);

                        angular.element(scope.element).addClass('tmp-hide');

                    });

                    this.ghosts = ghosts;

                },

                onMouseDown: function (event) {

                    this.isDragging = true;
                    this.toggleBodyNoSelect();
                    this.pageX = event.pageX;
                    this.pageY = event.pageY;

                    //Check to set correct data for TouchEvents
                    if (event.originalEvent && event.originalEvent.touches && (event.originalEvent.touches.length > 0)) {
                        this.disableScroll();
                        this.pageX = event.originalEvent.touches[0].pageX;
                        this.pageY = event.originalEvent.touches[0].pageY;
                    }

                    this.makeGhosts();

                },

                disableScroll: function () {
                    angular.element('div.storage-division-container').css({'overflow': 'hidden'});
                },

                enableScroll: function () {
                    angular.element('div.storage-division-container').css({'overflow': 'auto'});
                },

                toggleBodyNoSelect: function (event) {
                    angular.element('body').toggleClass('noselect');
                },

                onMouseUp: function (event) {
                    if (!this.isDragging) {
                        return;
                    }

                    this.isDragging = false;

                    if (event.originalEvent && event.originalEvent.touches && (event.originalEvent.touches.length > 0)) {
                        this.disableScroll();
                    }

                    this.handleDrop().then(

                        function () {
                            storageDivisionManager.removeGhosts();
                            storageDivisionManager.unhoverAll();
                            storageDivisionManager.toggleBodyNoSelect();
                            storageDivisionManager.unhideAll();
                            storageDivisionManager.enableScroll();
                            storageDivisionManager.deselectAll();
                        },
                        function () {
                            storageDivisionManager.removeGhosts();
                            storageDivisionManager.unhoverAll();
                            storageDivisionManager.toggleBodyNoSelect();
                            storageDivisionManager.unhideAll();
                            storageDivisionManager.enableScroll();
                        }
                    );

                },

                handleDrop: function () {

                    var left, top, centerX, centerY, dropScope, sampleMoveMap = [];
                    angular.forEach(this.ghosts, function (ghost) {

                        left = parseInt(ghost.css('left').replace('px', ''))
                        top = parseInt(ghost.css('top').replace('px', ''))
                        centerX = Math.abs((ghost.width() / 2 ) + left);
                        centerY = Math.abs((ghost.width() / 2 ) + top);

                        ghost.css({'display': 'none'});

                        elBehind = angular.element((document.elementFromPoint(centerX, centerY)));

                        ghost.css({'display': 'block'});

                        if (elBehind.hasClass('cell')) {
                            elBehind = elBehind.parent('td')
                        }

                        if (elBehind.hasClass('tmp-hide') || !elBehind.hasClass('has-sample')) {

                            dropScope = angular.element(elBehind).scope();
                            ghostScope = ghost.scope();

                            if (ghostScope.sample.divisionRow == dropScope.row && ghostScope.sample.divisionColumn == dropScope.column || dropScope.sample) {

                            } else {

                                sampleMoveMap.push({
                                    sample: ghostScope.sample,
                                    row: dropScope.row,
                                    column: dropScope.column
                                });

                            }
                        }

                    });

                    if (!sampleMoveMap.length) {
                        return $q.reject();
                    }

                    return storageFormFactory.openStorageSampleMove(sampleMoveMap).then(function () {

                        angular.forEach(sampleMoveMap, function (map) {

                            console.log(storageDivisionManager.sampleMap[map.sample.divisionRow][map.sample.divisionColumn]);
                            if (storageDivisionManager.sampleMap[map.sample.divisionRow][map.sample.divisionColumn].id == map.sample.id) {
                                storageDivisionManager.sampleMap[map.sample.divisionRow][map.sample.divisionColumn] = false;
                                storageDivisionManager.cellScopes[map.sample.divisionRow][map.sample.divisionColumn].initialize();
                            }

                            if (storageDivisionManager.sampleMap[map.row] === undefined) {
                                storageDivisionManager.sampleMap[map.row] = {};
                            }

                            map.sample.divisionRow = map.row;
                            map.sample.divisionColumn = map.column;
                            storageDivisionManager.sampleMap[map.row][map.column] = map.sample;
                            storageDivisionManager.cellScopes[map.row][map.column].initialize();

                        });
                    });

                },

                removeGhosts: function () {
                    angular.forEach(this.ghosts, function (ghost) {
                        ghost.remove();
                    });
                    this.ghosts = [];
                },

                unhoverAll: function () {

                    for (row in this.cellScopes) {
                        for (column in this.cellScopes[row]) {
                            this.cellScopes[row][column].element.classList.remove('hovering');
                        }
                    }

                },

                unhideAll: function () {

                    for (row in this.cellScopes) {
                        for (column in this.cellScopes[row]) {
                            this.cellScopes[row][column].element.classList.remove('tmp-hide');
                        }
                    }

                },

                drag: function (event) {

                    if (!this.isDragging) {
                        return;
                    }

                    event.preventDefault();

                    this.unhoverAll();

                    var oldPageX = this.pageX;
                    var oldPageY = this.pageY;
                    var pageX = event.pageX;
                    var pageY = event.pageY;
                    var elBehind, newLeft, newTop, centerX, centerY;

                    //Check to set correct data for TouchEvents
                    if (event.originalEvent && event.originalEvent.touches && (event.originalEvent.touches.length > 0)) {
                      pageX = event.originalEvent.touches[0].pageX;
                      pageY = event.originalEvent.touches[0].pageY;
                    }

                    angular.forEach(this.ghosts, function (ghost) {

                        newLeft = Math.abs((oldPageX - pageX) - parseInt(ghost.css('left').replace('px', '')));
                        newTop = Math.abs((oldPageY - pageY) - parseInt(ghost.css('top').replace('px', '')));

                        ghost.css({
                            'left': newLeft + 'px',
                            'top': newTop + 'px'
                        });

                        ghost.css({'display': 'none'});

                        centerX = Math.abs((ghost.width() / 2 ) + newLeft);
                        centerY = Math.abs((ghost.width() / 2 ) + newTop);
                        elBehind = angular.element((document.elementFromPoint(centerX, centerY)));

                        ghost.css({'display': 'block'});

                        if (elBehind.hasClass('cell')) {
                            elBehind = elBehind.parent('td')
                        }

                        if (elBehind.hasClass('tmp-hide') || !elBehind.hasClass('has-sample')) {
                            elBehind.addClass('hovering');
                        }

                    });

                    this.pageX = pageX;
                    this.pageY = pageY;
                }

            };

            return storageDivisionManager;
        }

    ])
;
