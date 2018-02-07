angular.module('production.affinityPurification.affinityPurificationProductionGridFactory', [])

    .factory('affinityPurificationProductionGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var affinityPurificationProductionGridFactory = {

                url: '/production/purification/affinity-purification-request?status[NE][]=Pending-Pipeline',
                // url: '/production/protein-request?status[NE][]=Pending-Pipeline',

                actionTemplate: 'production/affinity-purification/partials/affinity-purification-production-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'alias',
                        isSortable: true,
                        name: 'alias',
                        isPrimary: true,
                        sref: 'production_affinity_purification.detail({id:result.id})'
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
                        templateUrl: 'production/affinity-purification/partials/affinity-purification-production-status-column-tpl.html'
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
                ],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                }

            };

            return affinityPurificationProductionGridFactory;

        }

    ])
;
