angular.module('production.dna.dnaProductionGridFactory', [])

    .factory('dnaProductionGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var dnaProductionGridFactory = {

                url: '/production/dna',

                actionTemplate: 'production/dna/partials/dna-production-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        sref: 'dna_production.detail({id:result.id})'
                    },
                    {
                        header: 'Description',
                        bindTo: 'description',
                        name: 'description',
                        isSortable: true
                    },
                    {
                        header: 'Status',
                        bindTo: 'status',
                        name: 'status',
                        isSortable: true,
                        templateUrl: 'production/dna/partials/dna-production-status-column-tpl.html'
                    },
                    {
                        header: 'Created By',
                        bindTo: 'createdBy.fullName',
                        name: 'createdBy'
                    },
                    {
                        header: 'Updated By',
                        bindTo: 'updatedBy.fullName',
                        name: 'updatedBy'
                    },
                    {
                        header: 'Date Created',
                        bindTo: 'createdAt | date:\'MMM d, y\'',
                        name: 'createdAt',
                        isSortable: true
                    },
                    {
                        header: 'Date Updated',
                        bindTo: 'updatedAt | date:\'MMM d, y\'',
                        name: 'updatedAt',
                        isSortable: true,
                        isVisible: false
                    },
                ],

                filters: [
                    // {
                    //     type: 'relation',
                    //     title: 'Sample Type',
                    //     accessProperty: 'id',
                    //     filterProperty: 'sampleTypeId',
                    //     resourceUrl: '/storage/sample-type',
                    //     bindTo: 'name',
                    //     isVisible: true
                    // },
                    // {
                    //     type: 'relation',
                    //     title: 'Created By',
                    //     accessProperty: 'id',
                    //     filterProperty: 'createdById',
                    //     resourceUrl: '/user',
                    //     bindTo: 'fullName'
                    // },
                    // {
                    //     type: 'enum',
                    //     title: 'Status',
                    //     filterProperty: 'status',
                    //     bindTo: 'status',
                    //     enum: ['Available', 'Depleted', 'Destroyed', 'Shipped'],
                    //     isVisible: true
                    // },
                    // {
                    //     type: 'relation',
                    //     title: 'Updated By',
                    //     accessProperty: 'id',
                    //     filterProperty: 'updatedById',
                    //     resourceUrl: '/user',
                    //     bindTo: 'fullName',
                    //     isVisible: false
                    // },
                    // {
                    //     type: 'integer',
                    //     title: 'Concentration',
                    //     // accessProperty: 'id',
                    //     filterProperty: 'concentration',
                    //     // bindTo: 'fullName'
                    //     isVisible: false
                    // },
                    // {
                    //     type: 'integer',
                    //     title: 'Mass (g)',
                    //     // accessProperty: 'id',
                    //     filterProperty: 'mass',
                    //     // bindTo: 'fullName'
                    //     isVisible: false
                    // },
                    // {
                    //     type: 'enum',
                    //     title: 'Species',
                    //     filterProperty: 'species',
                    //     bindTo: 'species',
                    //     enum: ['human'],
                    //     isVisible: false

                    // },
                    // {
                    //     type: 'string',
                    //     title: 'Name',
                    //     filterProperty: 'name',
                    //     isVisible: false
                    // }
                ],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                }

            };

            return dnaProductionGridFactory;

        }

    ])
;
