angular.module('storage.storageBoxCellDirective', [])
    .directive('storageBoxCell', ['storageDivisionManager',

        function (storageDivisionManager) {

            return {

                restrict: 'A',
                require: '^storageBox',
                link: function ($scope, element, attrs, storageBoxCtrl) {

                    $scope.element = element[0];
                    $scope.sdm = storageDivisionManager;


                    // responsive calculations
                    var resizeCell = function (event, data) {

                        var boxOuterWidth = storageBoxCtrl.scope.element.outerWidth() - ((storageBoxCtrl.division.width + 2) * 4);

                        var widthPercentage = 98 / storageBoxCtrl.division.width / 100;

                        var floor = Math.floor(widthPercentage * boxOuterWidth);

                        var flooredPercentage = floor / boxOuterWidth;

                        element.css('width', flooredPercentage * 100 + '%');

                        element.css('padding-bottom', floor + 'px');


                        var percentage = data == undefined ? 100 : data.percentage;
                        element.css('font-size', (percentage / 100) * 0.7 + 'vw');

                    };

                    var onSelect = function (event) {

                        $scope.sdm.toggleCell($scope.row, $scope.column, event.shiftKey);
                        $scope.$apply();

                    };

                    // events
                    element.on('click', function (e) {

                        onSelect(e);

                    });

                    element.find('.move').on('mousedown touchstart', function (e) {
                        $scope.sdm.onMouseDown(e);
                    });

                    $scope.$on('storage_box.resize', resizeCell);

                    $scope.$on('storage_box.select_column', function (event, data) {
                        if ($scope.column == data) {
                            element.toggleClass('selected');
                        }
                    });

                    $scope.$on('storage_box.select_row', function (event, data) {
                        if ($scope.row == data) {
                            element.toggleClass('selected');
                        }
                    });

                    $scope.$on('storage_box.details.well_selected', function (event, data) {

                        onSelect(event, data);

                    });

                    $scope.initialize = function () {

                        $scope.sampleTypeIconMapping = {
                            'DNA': 'dna.png',
                            'Chemical Compound': 'chemical_compound_2.png',
                            'Mammalian Cells': 'mammalian_cells.png',
                            'Protein': 'protein.png',
                            'Sera': 'sera.png',
                            'Solution': 'solution.png',
                            'Yeast Cells': 'yeast_cells_2.png',
                            'Bacterial Cells': 'bacterial_cells_2.png',
                        };

                        if ($scope.sdm.sampleMap[$scope.row]) {
                            $scope.sample = $scope.sdm.sampleMap[$scope.row][$scope.column];
                        }

                        if ($scope.sample) {
                            element.find('div.cell').css({'background-image': 'url("/images/' + $scope.sampleTypeIconMapping[$scope.sample.sampleType.name] + '")'});
                        } else {
                            element.find('div.cell').css({'background-image': 'none'});
                        }

                    };

                    storageDivisionManager.addCell($scope);
                    resizeCell();
                    $scope.initialize();
                }

            };

        }

    ])
;
