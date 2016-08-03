angular.module('sampleType.sampleTypeGridFactory', [])

    .factory('sampleTypeGridFactory', ['gridFactory',

        function (gridFactory) {

            var sampleTypeGridFactory = {

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
                        // .addFilters(filters)
                        // .setActionTemplate('sample/views/partials/sample-row-actions-tpl.html')
                        .setResourceUrl('/sample-type')
                        .sortColumn(columns[0], 'DESC')
                        .setResults(initResponse.data)
                        .setPaginationFromResponse(initResponse)
                    ;

                    return grid;

                }

            };

            return sampleTypeGridFactory;

        }
    ])
;
