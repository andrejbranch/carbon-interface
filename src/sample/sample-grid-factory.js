angular.module('sample.sampleGridFactory', [])

    .factory('sampleGridFactory', ['gridFactory', '$cbResource', '$location',

        function (gridFactory, $cbResource, $location) {

            var sampleGridFactory = {

                url: '/storage/sample',

                actionTemplate: 'sample/views/partials/sample-row-actions-tpl.html',

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
                        header: 'Status',
                        bindTo: 'status',
                        name: 'status',
                        isSortable: true,
                        templateUrl: 'sample/partials/sample-status-column-tpl.html'
                    },
                    {
                        header: 'Catalog',
                        bindTo: 'catalog.name',
                        name: 'catalog',
                        isSortable: true,
                        sref: 'catalog.detail({id:result.catalogId})'
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
                        header: 'Lot',
                        bindTo: 'lot',
                        name: 'lot',
                        isSortable: true
                    },
                    {
                        header: 'Tags',
                        bindTo: 'tagString',
                        name: 'tagString',
                        isSortable: false
                    },
                    {
                        header: 'Storage Location',
                        bindTo: 'division.path',
                        name: 'division',
                        isSortable: false
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
                        title: 'Catalog',
                        accessProperty: 'id',
                        filterProperty: 'catalogId',
                        resourceUrl: '/storage/catalog',
                        bindTo: 'name',
                        isVisible: false
                    },
                    {
                        type: 'relation',
                        title: 'Sample Type',
                        accessProperty: 'id',
                        filterProperty: 'sampleTypeId',
                        resourceUrl: '/storage/sample-type',
                        bindTo: 'name',
                        isVisible: false
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
                        isVisible: false
                    },
                    {
                        type: 'relation',
                        title: 'Tags',
                        accessProperty: 'id',
                        filterProperty: 'sampleTags.tagId',
                        resourceUrl: '/storage/tag',
                        bindTo: 'name',
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
                        title: 'Lot',
                        filterProperty: 'lot',
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

                },

                getImportGrid: function (importData) {

                    var importGrid = gridFactory.create(),
                        importItems = importData.items,
                        responseColumns = importData.columns,
                        columns = []
                    ;

                    angular.forEach(responseColumns, function (responseColumn) {

                        var ngClass = '{';
                        angular.forEach(responseColumn.errorProp, function (prop) {
                            ngClass = ngClass + "\'background-error\': result.errors." + prop + ".length,"
                        })
                        ngClass = ngClass + '}'

                        var column = {
                            header: responseColumn.header,
                            bindTo: responseColumn.bindTo,
                            ngClass: ngClass
                        };

                        if (responseColumn.header === 'Catalog') {
                            column.bindTo = 'catalog';
                        }

                        if (responseColumn.header === 'Division') {
                            column.templateUrl = 'sample/partials/sample-storage-import-division-column-1-tpl.html';
                        }

                        if (responseColumn.header === 'Division Row') {
                            column.templateUrl = 'sample/partials/sample-storage-import-division-row-column-tpl.html';
                        }

                        if (responseColumn.header === 'Division Column') {
                            column.templateUrl = 'sample/partials/sample-storage-import-division-column-column-tpl.html';
                        }

                        columns.push(column);

                    });

                    columns.unshift({
                        header: "",
                        templateUrl: 'sample/partials/sample-import-error-column-tpl.html'
                    });

                    importGrid
                        .addColumns(columns)
                        .setPerPage(100)
                        .setData(importItems)
                        .hideFilters()
                        .disableToggleColumns()
                        .disableHover()
                    ;

                    return importGrid;

                },

                getStorageImportGrid: function (importData) {

                    var importStorageGrid = gridFactory.create(),
                        importItems = importData.items
                    ;

                    var columns = [
                        {
                            header: 'Catalog',
                            bindTo: 'catalog',
                            name: 'catalog',
                        },
                        {
                            header: 'Sample Type',
                            bindTo: 'sampleType.name',
                            name: 'sampleType'
                        },
                        {
                            header: 'Description',
                            bindTo: 'description',
                            name: 'description'
                        },
                        {
                            header: 'Storage Location',
                            name: 'storageLocation',
                            templateUrl: 'sample/partials/sample-storage-import-division-column-tpl.html'
                        },
                    ];

                   importStorageGrid
                        .setActionTemplate('sample/partials/sample-storage-import-row-actions-tpl.html')
                        .addColumns(columns)
                        .setPerPage(100)
                        .setData(importItems)
                        .hideFilters()
                        .disableToggleColumns()
                        .disableHover()
                    ;

                    return importStorageGrid;

                },

                getCatalogGrid: function (catalog, sampleTypeId) {

                    var grid = this.create();
                    var resourceUrl = '/storage/sample?catalogId[EQ]=' + catalog.id + '&sampleTypeId[EQ]=' + sampleTypeId;
                    var defaultParams = { cOrderBy: 'id', cOrderByDirection: 'DESC'};

                    grid.setResourceUrl(resourceUrl);
                    angular.forEach(grid.filters, function (filter) {
                        if (filter.filterProperty == 'sampleTypeId' || filter.filterProperty == 'name') {
                            grid.filters.splice(grid.filters.indexOf(filter), 1);
                        }
                    });

                    return $cbResource.get(resourceUrl, defaultParams).then(function (response) {

                        grid
                            .setPaginationFromResponse(response)
                            .setResults(response.data)
                        ;

                        return grid;

                    });


                }

            };

            return sampleGridFactory;

        }

    ])
;
