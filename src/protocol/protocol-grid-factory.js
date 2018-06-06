angular.module('protocol.protocolGridFactory', [])

    .factory('protocolGridFactory', ['gridFactory', '$cbResource', '$location', 'protocolFormFactory',

        function (gridFactory, $cbResource, $location, protocolFormFactory) {

            var protocolGridFactory = {

                url: '/protocol',

                // actionTemplate: 'sample/views/partials/sample-row-actions-tpl.html',
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
                        // sref: 'project.detail({id:result.id})'
                    }
                ],

                filters: [
                    {
                        type: 'string',
                        title: 'Name',
                        filterProperty: 'name',
                        isVisible: false
                    }
                ],

                rowActions: [
                    {
                        type: 'edit',
                        init: protocolFormFactory.openFormModal,
                        iconClass: 'fa fa-edit'
                    },
                    {
                        type: 'delete',
                        init: protocolFormFactory.openDeleteForm,
                        iconClass: 'fa fa-edit'
                    },
                    {
                        type: 'restore',
                        init: protocolFormFactory.openRestoreForm,
                        iconClass: 'fa fa-edit'
                    },
                    {
                        type: 'purge',
                        init: protocolFormFactory.openPurgeForm,
                        iconClass: 'fa fa-edit'
                    }
                ],


                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        .addRowActions(this.rowActions)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                }

            };

            return protocolGridFactory;

        }

    ])
;
