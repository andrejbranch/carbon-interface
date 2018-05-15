angular.module('production.dna.dnaProductionGridFactory', [])

    .factory('dnaProductionGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var dnaProductionGridFactory = {

                url: '/production/dna',

                actionTemplate: 'production/dna/partials/dna-production-row-actions-tpl.html',

                columns: [
                    {
                        header: 'ID',
                        bindTo: 'alias',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        sref: 'production_dna.detail({id:result.id})'
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
                    {
                        type: 'string',
                        title: 'ID',
                        filterProperty: 'alias',
                        isVisible: false
                    },
                    {
                        type: 'enum',
                        title: 'Status',
                        filterProperty: 'status',
                        bindTo: 'status',
                        enum: ['Available', 'Depleted', 'Destroyed', 'Shipped'],
                        isVisible: false
                    },
                    {
                        type: 'relation',
                        title: 'Created By',
                        accessProperty: 'id',
                        filterProperty: 'createdById',
                        resourceUrl: '/user',
                        bindTo: 'fullName',
                        isVisible: false
                    },
                    {
                        type: 'relation',
                        title: 'Updated By',
                        accessProperty: 'id',
                        filterProperty: 'updatedById',
                        resourceUrl: '/user',
                        bindTo: 'fullName',
                        isVisible: false
                    },
                    {
                        type: 'date',
                        title: 'Created At',
                        filterProperty: 'createdAt',
                        isVisible: false
                    },
                    {
                        type: 'date',
                        title: 'Updated At',
                        filterProperty: 'updatedAt',
                        isVisible: false
                    },
                    {
                        type: 'deleted',
                        title: 'Show Deleted',
                        filterProperty: 'cShowDeleted',
                        isVisible: false
                    }
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
