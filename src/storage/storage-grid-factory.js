angular.module('storage.storageGridFactory', [])

    .factory('storageGridFactory', ['gridFactory', 'sampleTypeGridFactory', 'storageFactory', 'storageContainerGridFactory', '$cbResource',

        function (gridFactory, sampleTypeGridFactory, storageFactory, storageContainerGridFactory, $cbResource) {

            var storageGridFactory = {

                url: '/storage/division',

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
                }

            };

            return storageGridFactory;

        }

    ])
;
