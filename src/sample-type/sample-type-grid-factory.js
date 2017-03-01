angular.module('sampleType.sampleTypeGridFactory', [])

    .factory('sampleTypeGridFactory', ['gridFactory',

        function (gridFactory) {

            var sampleTypeGridFactory = {

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
                        // .addFilters(filters)
                        // .setActionTemplate('sample/views/partials/sample-row-actions-tpl.html')
                        .setResourceUrl('/sample-type')
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
