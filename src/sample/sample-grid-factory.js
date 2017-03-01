angular.module('sample.sampleGridFactory', [])

    .factory('sampleGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var sampleGridFactory = {

                columns: [
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
                        header: 'Division',
                        bindTo: 'division.title',
                        name: 'division',
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
                ],

                filters: [
                    {
                        type: 'relation',
                        title: 'Sample Type',
                        accessProperty: 'id',
                        filterProperty: 'sampleTypeId',
                        resourceUrl: '/storage/sample-type',
                        bindTo: 'name',
                        isVisible: true
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
                        enum: ['Available', 'Depleted', 'Destroyed', 'Shipped'],
                        isVisible: true
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
                    },
                    {
                        type: 'enum',
                        title: 'Species',
                        filterProperty: 'species',
                        bindTo: 'species',
                        enum: ['human'],
                        isVisible: false

                    },
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

                },

                getIndexGrid: function () {

                    var grid = this.create();

                    grid
                        .setActionTemplate('sample/views/partials/sample-row-actions-tpl.html')
                        .setResourceUrl('/storage/sample')
                        .setBindToState(true)
                    ;

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC'};
                    var params = angular.extend(defaultParams, $location.search());

                    return $cbResource.get('/storage/sample', params).then(function (response) {

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                        ;

                    });

                },

                getOneToManyGrid: function (parentSampleId, isEditable) {

                    var grid = this.create();

                    isEditable ? grid.allowEdit().disableHyperlinks() : grid.disallowEdit();

                    grid
                        .setResourceUrl('/storage/sample-linked-sample/' + parentSampleId)
                        .setPerPage(3)
                        .disableToggleColumns()
                        .setNoResultString('No linked samples found')
                        .disableHover()
                    ;

                    grid.perPageOptions = [3, 10, 25];

                    if (!parentSampleId) {
                        return grid;
                    }

                    return $cbResource.get('/storage/sample-linked-sample/' + parentSampleId).then(function (response) {

                        return grid
                            .setPaginationFromResponse(response)
                            .setResults(response.data)
                        ;

                    });

                },

                getSelectGrid: function () {

                    var grid = this.create();

                    grid.setResourceUrl('/storage/sample');

                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC', cPerPage:'3'};

                    return $cbResource.get('/storage/sample', defaultParams).then(function (response) {

                        grid.perPageOptions = [3, 10, 25];

                        return grid
                            .setResults(response.data)
                            .setPaginationFromResponse(response)
                            .allowSelectMany()
                            .disableHover()
                            .setPerPage(3)
                            .disableToggleColumns()
                        ;

                    });

                }

            };

            return sampleGridFactory;

        }

    ])
;
