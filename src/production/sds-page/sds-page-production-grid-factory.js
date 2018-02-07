angular.module('production.sdsPage.sdsPageProductionGridFactory', [])

    .factory('sdsPageProductionGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var sdsPageProductionGridFactory = {

                url: '/production/analysis/sds-page-request',

                actionTemplate: 'production/sds-page/partials/sds-page-production-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'alias',
                        isSortable: true,
                        name: 'alias',
                        isPrimary: true,
                        sref: 'production_sds_page.detail({id:result.id})'
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
                        templateUrl: 'production/sds-page/partials/sds-page-production-status-column-tpl.html'
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

            return sdsPageProductionGridFactory;

        }

    ])
;
