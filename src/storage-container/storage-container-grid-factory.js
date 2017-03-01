angular.module('storageContainer.storageContainerGridFactory', [])

    .factory('storageContainerGridFactory', ['gridFactory',

        function (gridFactory) {

            var storageContainerGridFactory = {

                columns: [
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
                ],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                },

                getIndexGrid: function (initResponse) {

                    var grid = this.create();

                    grid
                        .setResourceUrl('/storage-container')
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
