angular.module('project.projectGridFactory', [])

    .factory('projectGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var projectGridFactory = {

                url: '/project',

                actionTemplate: 'project/partials/project-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        sref: 'project.detail({id:result.id})'
                    },
                    {
                        header: 'Name',
                        bindTo: 'name',
                        name: 'name',
                        isSortable: true,
                        sref: 'project.detail({id:result.id})'
                    },
                    {
                        header: 'Status',
                        bindTo: 'status',
                        name: 'status',
                        isSortable: true
                    },
                    {
                        header: 'Created By',
                        bindTo: 'createdBy.fullName',
                        name: 'createdBy'
                    },
                    {
                        header: 'Updated By',
                        bindTo: 'updatedBy.fullName',
                        name: 'updatedBy',
                        isVisible: false
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
                    }
                ],

                filters: [
                    {
                        type: 'string',
                        title: 'Name',
                        filterProperty: 'name',
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

            return projectGridFactory;

        }

    ])
;
