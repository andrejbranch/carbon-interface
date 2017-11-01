angular.module('production.pipeline.pipelineGridFactory', [])

    .factory('pipelineGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var pipelineGridFactory = {

                url: '/production/pipeline',

                actionTemplate: 'production/pipeline/partials/pipeline-row-actions-tpl.html',

                columns: [
                    {
                        header: 'Id',
                        bindTo: 'id',
                        isSortable: true,
                        name: 'id',
                        isPrimary: true,
                        // sref: 'project.detail({id:result.id})'
                    }
                ],

                filters: [],

                create: function () {

                    return gridFactory.create()
                        .addColumns(this.columns)
                        .addFilters(this.filters)
                        .sortColumn(this.columns[0], 'DESC')
                    ;

                }

            };

            return pipelineGridFactory;

        }

    ])
;
