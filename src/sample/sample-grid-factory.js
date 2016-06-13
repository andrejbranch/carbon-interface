angular.module('sample.sampleGridFactory', [])

    .factory('sampleGridFactory', ['gridFactory',

        function (gridFactory) {

            var sampleGridFactory = {

                getIndexGrid: function (initResponse) {

                    var columns = [
                        {
                            header: 'Id',
                            bindTo: 'id',
                            isSortable: true,
                            name: 'id',
                            isPrimary: true,
                            sref: 'sample.detail({id:result.id})'
                        },
                        {
                            header: 'Name',
                            bindTo: 'name',
                            name: 'name',
                            isSortable: true,
                            sref: 'sample.detail({id:result.id})'
                        },
                        {
                            header: 'Sample Type',
                            bindTo: 'sampleType.name',
                            name: 'sampleTypeId',
                            isSortable: true
                        },
                        {
                            header: 'Description',
                            bindTo: 'description',
                            name: 'description',
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
                        {
                            header: 'Storage Buffer',
                            bindTo: 'storageBuffer',
                            name: 'storageBuffer',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Status',
                            bindTo: 'status',
                            name: 'status',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Vector',
                            bindTo: 'vectorName',
                            name: 'vectorName',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Concentration',
                            bindTo: 'concentrationString',
                            name: 'concentration',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'DNA Sequence',
                            bindTo: 'dnaSequence',
                            name: 'dnaSequence',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Amino Acid Sequence',
                            bindTo: 'aminoAcidSequence',
                            name: 'aminoAcidSequence',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Amino Acid Count',
                            bindTo: 'aminoAcidCount',
                            name: 'aminoAcidCount',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Molecular Weight',
                            bindTo: 'molecularWeight',
                            name: 'molecularWeight',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Extinction Coefficient',
                            bindTo: 'extinctionCoefficient',
                            name: 'extinctionCoefficient',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Purification Tags',
                            bindTo: 'purificationTags',
                            name: 'purificationTags',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Species',
                            bindTo: 'species',
                            name: 'species',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Cell Line',
                            bindTo: 'cellLine',
                            name: 'cellLine',
                            isSortable: true,
                            isVisible: false
                        },
                        {
                            header: 'Mass (g)',
                            bindTo: 'mass',
                            name: 'mass',
                            isSortable: true,
                            isVisible: false
                        }

                    ];

                    var filters = [
                        {
                            type: 'relation',
                            title: 'Sample Type',
                            accessProperty: 'id',
                            filterProperty: 'sampleTypeId',
                            resourceUrl: '/sample-type',
                            bindTo: 'name',
                        },
                        {
                            type: 'relation',
                            title: 'Created By',
                            accessProperty: 'id',
                            filterProperty: 'createdById',
                            resourceUrl: '/user',
                            bindTo: 'fullName'

                        },
                        {
                            type: 'enum',
                            title: 'Status',
                            filterProperty: 'status',
                            bindTo: 'status',
                            enum: ['Available', 'Depleted', 'Destroyed', 'Shipped']

                        },
                        {
                            type: 'relation',
                            title: 'Updated By',
                            accessProperty: 'id',
                            filterProperty: 'updatedById',
                            resourceUrl: '/user',
                            bindTo: 'fullName'
                        },
                        {
                            type: 'integer',
                            title: 'Concentration',
                            // accessProperty: 'id',
                            filterProperty: 'concentration',
                            // bindTo: 'fullName'
                            isVisible: false
                        },
                        {
                            type: 'integer',
                            title: 'Mass (g)',
                            // accessProperty: 'id',
                            filterProperty: 'mass',
                            // bindTo: 'fullName'
                            isVisible: false
                        }
                    ];

                    var grid = gridFactory.create();

                    grid
                        .addColumns(columns)
                        .addFilters(filters)
                        .setActionTemplate('sample/views/partials/sample-row-actions-tpl.html')
                        .setResourceUrl('/sample')
                        .sortColumn(columns[0], 'DESC')
                        .setResults(initResponse.data)
                        .setPaginationFromResponse(initResponse)
                    ;

                    return grid;
                },

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

                    var filters = [
                        {
                            type: 'relation',
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
                        .allowEdit()
                        .disableToggleColumns()
                        .setNoResultString('No linked samples found')
                    ;

                    grid.perPageOptions = [3, 10, 25];

                    return grid;

                }

            };

            return sampleGridFactory;

        }

    ])
;
