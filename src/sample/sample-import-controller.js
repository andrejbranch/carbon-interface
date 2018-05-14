angular.module('sample.sampleImportCtrl', [])

    .controller('sampleImportCtrl', ['$scope', 'productionPipelineFactory', 'sampleTypes', 'StepsService',

        function ($scope, productionPipelineFactory, sampleTypes, StepsService) {

            $scope.sampleTypes = sampleTypes.data;

            $scope.productionCompleteConfig = productionPipelineFactory.create();
            $scope.productionCompleteConfig
                .setScope($scope)
                .setName('sampleImport')
                .setReturnState('sample.index')
                .addStep({
                    name: 'step_1',
                    title: 'Step 1',
                    description: 'Select Sample Type',
                    type: 'outputSamples',
                    templateUrl: 'sample/partials/sample-import-sample-type-step-type-tpl.html'
                })
                .addStep({
                    name: 'step_2',
                    title: 'Step 2',
                    description: 'Upload Import Template',
                    type: 'outputSamples',
                    templateUrl: 'common/production-pipeline/partials/sample-import-output-sample-step-type-tpl.html'
                })
                .addStep({
                    name: 'step_3',
                    title: 'Step 3',
                    description: 'Storage Location',
                    type: 'storageLocation',
                    templateUrl: 'common/production-pipeline/partials/storage-location-step-type-tpl.html'
                })
                .addStep({
                    name: 'step_4',
                    title: 'Step 4',
                    description: 'Confirmation',
                    type: 'confirmation',
                    templateUrl: 'common/production-pipeline/partials/confirmation-step-type-tpl.html'
                })
            ;

            $scope.onSampleTypeSelect = function (sampleType) {
                $scope.productionCompleteConfig.setOutputSampleDefaults({
                    sampleType: sampleType.name
                });
                StepsService.steps($scope.productionCompleteConfig.name).next();
            };

        }

    ])
;
