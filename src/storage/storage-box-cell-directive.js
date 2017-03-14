angular.module('storage.storageBoxCellDirective', [])
    .directive('storageBoxCell', [

        function () {

            return {

                restrict: 'A',
                require: '^storageBox',
                scope: {
                    sample: '=',
                    column: '=',
                    row: '='
                },
                link: function ($scope, element, attrs, storageBoxCtrl) {

                    // responsive calculations
                    var resizeCell = function () {

                        var boxOuterWidth = storageBoxCtrl.scope.element.outerWidth() - ((storageBoxCtrl.division.width + 2) * 4);

                        var widthPercentage = 98 / storageBoxCtrl.division.width / 100;

                        var floor = Math.floor(widthPercentage * boxOuterWidth);

                        var flooredPercentage = floor / boxOuterWidth;

                        element.css('width', flooredPercentage * 100 + '%');

                        element.css('padding-bottom', floor + 'px');

                    };

                    var onSelect = function (event, data) {

                        if (data.column !== $scope.column || data.row !== $scope.row) {

                            element.removeClass('selected');

                        } else {

                            element.addClass('selected');

                        }

                    };

                    // events
                    element.on('click', function (e) {

                        var data = {
                            sample: $scope.sample,
                            row: $scope.row,
                            column: $scope.column
                        };

                        $scope.$emit('storage_box.well_selected', data);

                        onSelect(e, data);

                    });

                    resizeCell();

                    $scope.$on('storage_box.resize', resizeCell);

                    $scope.$on('storage_box.details.well_selected', function (event, data) {

                        onSelect(event, data);

                    });

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


                    if ($scope.sample) {
                        element.find('div.cell').css({'background-image': 'url("/images/' + $scope.sampleTypeIconMapping[$scope.sample.sampleType.name] + '")'});
                    }
                }

            };

        }

    ])
;
