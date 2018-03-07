angular.module('production.protein.proteinProductionCompleteCtrl', [])

    .controller('proteinProductionCompleteCtrl', ['$scope', 'proteinRequest', 'proteinSampleType', 'dnaSampleType', 'catalogData', 'productionPipelineFactory',

        function ($scope, proteinRequest, proteinSampleType, dnaSampleType, catalogData, productionPipelineFactory) {

            $scope.proteinRequest = proteinRequest;
            $scope.productionCompleteConfig  = productionPipelineFactory.create();
            $scope.productionCompleteConfig
                .setScope($scope)
                .setName('proteinProductionComplete')
                .setRequestObject(proteinRequest)
                .setEntity('AppBundle\\Entity\\Production\\ProteinRequest')
                .setInputSampleType(dnaSampleType)
                .setOutputSampleType(proteinSampleType)
                .setCatalogData(catalogData.data)
                .setReturnState('production_protein.detail')
                .setOutputSampleDefaults({
                    description: 'this is a test',
                    sampleType: proteinSampleType.name,
                    catalog: catalogData.data.catalogName,
                    status: 'Available',
                    storageContainer: 'Vial',
                    lot: proteinRequest.alias
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
