angular.module('storage.storageGridFactory', [])

    .factory('storageGridFactory', ['gridFactory', 'sampleTypeGridFactory', 'storageFactory', 'storageContainerGridFactory', '$cbResource',

        function (gridFactory, sampleTypeGridFactory, storageFactory, storageContainerGridFactory, $cbResource) {

            var storageGridFactory = {

                divisionColumns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Title',
                        bindTo: 'title',
                        name: 'title',
                        isSortable: true,
                        // sref: 'sample.detail({id:result.id})'
                    },
                    {
                        header: 'Dimension',
                        bindTo: 'dimensionString',
                        name: 'dimensionString',
                        isSortable: false
                    },
                    {
                        header: 'Percent Full',
                        bindTo: 'percentFullString',
                        name: 'percentFull',
                        isSortable: true
                    },
                    {
                        header: 'Path',
                        bindTo: 'path',
                        name: 'path',
                        isSortable: true
                    }
                ],

                create: function () {
                    return gridFactory.create()
                        .addColumns(this.divisionColumns)
                        .sortColumn(this.divisionColumns[0], 'DESC')
                    ;
                },

                getDivisionGrid: function () {

                    var grid = this.create();

                    grid.setResourceUrl('/division');

                    return $cbResource.get('/division', {cPerPage:'3'}).then(function (response) {

                        grid.perPageOptions = [3, 10, 25];

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .allowSelect()
                            .disableHover()
                            .setPerPage(3)
                            .disableToggleColumns()
                        ;

                    });

                },

                getDivisionSampleTypeGrid: function (divisionId) {

                    return storageFactory.getDivisionSampleTypes(divisionId).then(function (response) {

                        var grid = sampleTypeGridFactory.getIndexGrid(response);

                        grid
                            .setResourceUrl('/division-sample-type/division/' + divisionId)
                            .setPerPage(3)
                            .disableToggleColumns()
                            .allowEdit()
                            .disableHover()
                        ;

                        grid.perPageOptions = [3, 10, 25];

                        return grid;

                    });

                },

                getDivisionStorageContainerGrid: function (divisionId) {

                    return storageFactory.getDivisionStorageContainers(divisionId).then(function (response) {

                        var grid = storageContainerGridFactory.getIndexGrid(response);

                        grid
                            .setResourceUrl('/division-storage-container/division/' + divisionId)
                            .setPerPage(3)
                            .disableToggleColumns()
                            .allowEdit()
                            .disableHover()
                        ;

                        grid.perPageOptions = [3, 10, 25];

                        return grid;

                    });

                }

            };

            return storageGridFactory;

        }

    ])
;
