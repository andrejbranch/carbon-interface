angular.module('sample.sampleIndexCtrl', [])

    .controller('sampleIndexCtrl', ['$scope', 'sampleResponse', '$modal', '$state', '$stateParams', 'sampleTypes', 'storageContainers', 'gridFactory', 'sampleFactory', 'gridColumnFactory', 'sampleGridFactory',

        function ($scope, sampleResponse, $modal, $state, $stateParams, sampleTypes, storageContainers, gridFactory, sampleFactory, gridColumnFactory, sampleGridFactory) {

            $scope.sampleResponse = sampleResponse;
            $scope.samples = sampleResponse.data;
            $scope.storageContainers;

            var sampleCallback = function () {

                $state.go($state.current, $stateParams, {reload:true});

            };

            $scope.editSample = function (sample) {

                $modal.open({
                    templateUrl: 'sample/views/partials/sample-form-modal-tpl.html',
                    controller: 'sampleFormCtrl',
                    windowClass: 'inmodal',
                    keyboard: false,
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {

                        sample: function () {

                            return sample;

                        },

                        sampleTypes: function () {

                            return sampleTypes.data;

                        },

                        storageContainers: function () {

                            return storageContainers.data;

                        },

                        linkedSamplesGrid: function () {

                            return sampleFactory.getLinkedSamples(sample).then(function (response) {

                                var grid = sampleGridFactory.getOneToManyGrid();

                                grid.setPaginationFromResponse(response.data);
                                grid.setResults(response.data.data);

                                return grid;

                            });

                        },

                        callback: function () {

                            return sampleCallback;

                        }

                    }

                });
            };

            var columns = [
                {
                    header: 'Id',
                    bindTo: 'id',
                    isSortable: true,
                    name: 'id'
                },
                {
                    header: 'Sample Type',
                    bindTo: 'sampleType.name',
                    name: 'sampleTypeId',
                    isSortable: true
                },
                {
                    header: 'Name',
                    bindTo: 'name',
                    name: 'name',
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
                    isSortable: true
                }
            ];

            var filters = [
                {
                    title: 'Sample Type',
                    accessProperty: 'id',
                    filterProperty: 'sampleTypeId',
                    resourceUrl: '/sample-type',
                    bindTo: 'name'
                },
                {
                    title: 'Created By',
                    accessProperty: 'id',
                    filterProperty: 'createdById',
                    resourceUrl: '/user',
                    bindTo: 'fullName'

                },
                {
                    title: 'Updated By',
                    accessProperty: 'id',
                    filterProperty: 'updatedById',
                    resourceUrl: '/user',
                    bindTo: 'fullName'
                }
            ];

            var grid = gridFactory.create();

            grid
                .addColumns(columns)
                .addFilters(filters)
                .setActionTemplate('sample/views/partials/sample-row-actions-tpl.html')
                .setResourceUrl('/sample')
                .setPaginationFromResponse($scope.sampleResponse)
                .setResults($scope.samples)
            ;

            $scope.grid = grid;

        }

    ])
;
