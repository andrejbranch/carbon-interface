angular.module('storageContainer.storageContainerGridFactory', [])

    .factory('storageContainerGridFactory', ['gridFactory',

        function (gridFactory) {

            var storageContainerGridFactory = {

                getIndexGrid: function (initResponse) {

                    var columns = [
                        {
                            header: 'Id',
                            bindTo: 'id',
                            isSortable: true,
                            name: 'id',
                            isPrimary: true
                            // sref: '.detail({id:result.id})'
                        },
                        {
                            header: 'Name',
                            bindTo: 'name',
                            name: 'name',
                            isSortable: true
                        }
                    ];

                    var grid = gridFactory.create();

                    grid
                        .addColumns(columns)
                        .setResourceUrl('/storage-container')
                        .sortColumn(columns[0], 'DESC')
                        .setResults(initResponse.data)
                        .setPaginationFromResponse(initResponse)
                    ;

                    return grid;

                }

            };

            return storageContainerGridFactory;

        }
    ])
;
