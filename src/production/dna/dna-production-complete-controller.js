angular.module('production.dna.dnaProductionCompleteCtrl', [])

    .controller('dnaProductionCompleteCtrl', ['$scope', 'dnaRequest', 'dnaSampleType', 'catalogData', 'productionPipelineFactory',

        function ($scope, dnaRequest, dnaSampleType, catalogData, productionPipelineFactory) {

            $scope.dnaRequest = dnaRequest;
            $scope.productionCompleteConfig  = productionPipelineFactory.create();
            $scope.productionCompleteConfig
                .setScope($scope)
                .setName('dnaProductionComplete')
                .setRequestObject(dnaRequest)
                .setEntity('AppBundle\\Entity\\Production\\DNA')
                .setInputSampleType(dnaSampleType)
                .setOutputSampleType(dnaSampleType)
                .setCatalogData(catalogData.data)
                .setReturnState('production_dna.detail')
                .setOutputSampleDefaults({
                    description: 'this is a test',
                    sampleType: dnaSampleType.name,
                    catalog: catalogData.data.catalogName,
                    status: 'Available',
                    storageContainer: 'Vial',
                    lot: dnaRequest.alias
                })
                .addStep({
                    name: 'step_1',
                    title: 'Step 1',
                    description: 'Specify Output',
                    type: 'specifyOutput',
                    templateUrl: 'common/production-pipeline/partials/specify-output-step-type-tpl.html'
                })
                .addStep({
                    name: 'step_2',
                    title: 'Step 2',
                    description: 'Input Samples',
                    type: 'inputSamples',
                    templateUrl: 'common/production-pipeline/partials/input-sample-step-type-tpl.html'
                })
                .addStep({
                    name: 'step_3',
                    title: 'Step 3',
                    description: 'Output Samples',
                    type: 'outputSamples',
                    templateUrl: 'common/production-pipeline/partials/output-sample-step-type-tpl.html'
                })
                .addStep({
                    name: 'step_4',
                    title: 'Step 4',
                    description: 'Storage Location',
                    type: 'storageLocation',
                    templateUrl: 'common/production-pipeline/partials/storage-location-step-type-tpl.html'
                })
                .addStep({
                    name: 'step_5',
                    title: 'Step 5',
                    description: 'Confirmation',
                    type: 'confirmation',
                    templateUrl: 'common/production-pipeline/partials/confirmation-step-type-tpl.html'
                })
            ;
        }

    ])
;
