angular.module('production.spr.sprProductionGridFactory', [])

    .factory('sprProductionGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var sprProductionGridFactory = {

                url: '/production/analysis/spr-request',

                actionTemplate: 'production/spr/partials/spr-production-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'alias',
                        isSortable: true,
                        name: 'alias',
                        isPrimary: true,
                        sref: 'production_spr.detail({id:result.id})'
                    },
                    {
                        header: 'Type',
                        bindTo: 'type',
                        name: 'type',
                        isSortable: true
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
                        templateUrl: 'production/spr/partials/spr-production-status-column-tpl.html'
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

            return sprProductionGridFactory;

        }

    ])
;
