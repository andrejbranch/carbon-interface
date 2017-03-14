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
