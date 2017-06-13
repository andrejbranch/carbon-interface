angular.module('sampleType.sampleTypeGridFactory', [])

    .factory('sampleTypeGridFactory', ['gridFactory',

        function (gridFactory) {

            var sampleTypeGridFactory = {

                url: '/storage/sample-type',

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

                },

                getHelpGrid: function () {

                    var grid = gridFactory.create();
                    var columns = [
                        {
                            header: 'Property',
                            bindTo: 'prop',
                            name: 'prop',
                            isSortable: false
                        },
                        {
                            header: 'Allowed Value',
                            bindTo: 'allowed',
                            name: 'allowed',
                            isSortable: false
                        }
                    ];

                    var data = [
                        {
                            prop: 'Name',
                            allowed: 'String (300)'
                        },
                        {
                            prop: 'Description',
                            allowed: 'String'
                        },
                        {
                            prop: 'Status',
                            allowed: 'Available, Depleted, Destroyed, Shipped'
                        },
                        {
                            prop: 'Storage Container',
                            allowed: ' 1.5-2.0 mL Eppendorf Tube, 15 mL Falcon, 50 mL Falcon, Vial, PCR tube, PCR strip, 96 well plate, Bag, Box'
                        },
                        {
                            prop: 'Storage Buffer',
                            allowed: 'String'
                        },
                        {
                            prop: 'Linked Samples',
                            allowed: 'Comma separated list of sample ids'
                        },
                        {
                            prop: 'Vector Name',
                            allowed: 'String (150)'
                        }
                    ];

                    grid
                        .addColumns(columns)
                        .setPerPage(100)
                        .setData(data)
                        .disableToggleColumns()
                        .disablePagination()
                        .disableHover()
                        .hideFilters()
                    ;

                    return grid;

                }

            };

            return sampleTypeGridFactory;

        }
    ])
;
