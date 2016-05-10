angular.module('sample.sampleGridFactory', [])

    .factory('sampleGridFactory', ['gridFactory',

        function (gridFactory) {

            var sampleGridFactory = {

                getOneToManyGrid: function (parentSampleId) {

                    var columns = [
                        {
                            header: 'Id',
                            bindTo: 'id',
                            name: 'id'
                        },
                        {
                            header: 'Sample Type',
                            bindTo: 'sampleType.name',
                            name: 'sampleTypeId',
                        },
                        {
                            header: 'Name',
                            bindTo: 'name',
                            name: 'name',
                        },
                        {
                            header: 'Description',
                            bindTo: 'description',
                            name: 'description',
                        },
                        {
                            header: 'Created By',
                            bindTo: 'createdBy.fullName',
                            name: 'createdBy'
                        }
                    ];

                    // var staticFilters = [
                    //     'parentSampleId=' + 19
                    // ];

                    var filters = [
                        {
                            title: 'Sample Type',
                            accessProperty: 'id',
                            filterProperty: 'sampleTypeId',
                            resourceUrl: '/sample-type',
                            bindTo: 'name'
                        }
                    ];

                    var grid = gridFactory.create();

                    grid
                        .addColumns(columns)
                        .addFilters(filters)
                        .setPerPage(3)
                        .setResourceUrl('/sample-linked-sample/' + parentSampleId)
                        // .setStaticFilters(staticFilters)
                        // .hideFilters()
                        .allowEdit()
                        .disableToggleColumns()
                    ;

                    grid.perPageOptions = [3, 10, 25];

                    return grid;

                }

            };

            return sampleGridFactory;

        }

    ])
;
