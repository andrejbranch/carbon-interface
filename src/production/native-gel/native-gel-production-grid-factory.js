angular.module('production.nativeGel.nativeGelProductionGridFactory', [])

    .factory('nativeGelProductionGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var nativeGelProductionGridFactory = {

                url: '/production/analysis/native-gel-request',

                actionTemplate: 'production/native-gel/partials/native-gel-production-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'alias',
                        isSortable: true,
                        name: 'alias',
                        isPrimary: true,
                        sref: 'production_native_gel.detail({id:result.id})'
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
                        templateUrl: 'production/native-gel/partials/native-gel-production-status-column-tpl.html'
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

            return nativeGelProductionGridFactory;

        }

    ])
;
