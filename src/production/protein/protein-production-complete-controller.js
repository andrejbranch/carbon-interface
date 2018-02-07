angular.module('production.protein.proteinProductionCompleteCtrl', [])

    .controller('proteinProductionCompleteCtrl', ['$scope', 'proteinRequest', '$cbResource', 'sampleGridFactory', 'API', 'proteinSampleType', '$localStorage', 'sampleImportManager', 'StepsService', 'catalogName',

        function ($scope, proteinRequest, $cbResource, sampleGridFactory, API, proteinSampleType, $localStorage, sampleImportManager, StepsService, catalogName) {

            var fileInput;

            $scope.proteinRequest = proteinRequest;
            $scope.sampleType = proteinSampleType;
            $scope.sampleImportManager = sampleImportManager;
            $scope.catalogName = catalogName.data.catalogName;
            $scope.importForm = {};

            $scope.formData = {
                catalogName: $scope.catalogName,
                sampleCount: null
            };

            $scope.steps = [
                {
                    name: 'step_1',
                    title: 'Step 1',
                    description: 'Specify Output'
                },
                {
                    name: 'step_2',
                    title: 'Step 2',
                    description: 'Upload CSV'
                },
                {
                    name: 'step_3',
                    title: 'Step 3',
                    description: 'Validate CSV'
                },
                {
                    name: 'step_4',
                    title: 'Step 4',
                    description: 'Storage Location'
                },
                {
                    name: 'step_5',
                    title: 'Step 5',
                    description: 'Confirmation'
                }
            ];

            $scope.specifyOutput = function (importForm) {

                importForm.$submitted = true;

                if (!importForm.$valid) {
                    return;
                }

                StepsService.steps('proteinProductionComplete').next();

            };

            $scope.currentStep = 'step_1'
            $scope.acceptedSampleCount = [1,2,3,4,5,6,7,8,9,10];

            $scope.download = function () {

                $cbResource.create('/production/protein-request/' + $scope.proteinRequest.id + '/download-output-template', $scope.formData).then(function (response) {

                    var blob = new Blob([response.data], {type:'octet/stream'});

                    var windowUrl = window.URL || window.webkitURL;
                    var url = windowUrl.createObjectURL(blob);

                    var filename = 'Protein Request ' + $scope.proteinRequest.id + ' Template.csv';

                    var a = document.createElement('a');

                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);

                });

            };

            $scope.resetFileInput = function () {

                if (fileInput) {
                    fileInput.remove();
                }

                fileInput = angular.element('<input style="display:none" type="file" id="test-file-uploader"></input>');

                angular.element(document).find('body').append(fileInput);

                fileInput.on('change', function () {
                    $scope.handleUpload();
                });

            };

            $scope.upload = function () {
                angular.element('#test-file-uploader').click();
            }

            $scope.handleUpload = function () {

                $scope.isUploading = true;
                $scope.$apply();

                var file = angular.element('#test-file-uploader')[0].files[0];

                var xhr = new XMLHttpRequest();

                $scope.isUploading = true;

                xhr.open('POST', API.url + '/storage/sample-import/' + $scope.sampleType.id, true);

                $scope.errorCount = 0
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) {

                        var importData = JSON.parse(xhr.responseText)

                        $scope.hasErrors = importData.hasErrors;
                        $scope.importGrid = sampleGridFactory.getImportGrid(importData);
                        $scope.sampleImportManager.setImportData($scope.importGrid.data);

                        $scope.importStorageGrid = sampleGridFactory.getStorageImportGrid(importData);

                        $scope.$apply();

                        StepsService.steps('proteinProductionComplete').goTo(2);

                        $scope.isUploading = false;

                        $scope.resetFileInput()

                    } else if (xhr.readyState == 4) {

                        toastr.error('Sorry, an error occured while uploading your file, please review the CSV and try again.')
                        $scope.errorCount++;
                        $scope.isUploading = false;

                    }

                };

                xhr.setRequestHeader('X_FILENAME', file.name);
                xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);

                xhr.send(file)

            }

            $scope.import = function () {

                $scope.isUploading = true;

                bulkSamples = []
                angular.forEach($scope.importGrid.data, function (sample) {

                    sample.lot = $scope.proteinRequest.alias;

                    var sampleToSave = sample;

                    bulkSamples.push(sampleToSave);

                });

                $cbResource.create('/storage/sample-import/save', bulkSamples).then(function (response) {

                    $scope.isUploading = false;
                    StepsService.steps('proteinProductionComplete').goTo(4);

                    $scope.sampleIds = response.data;

                    $cbResource.create('/production/protein-request/' + $scope.proteinRequest.id + '/complete', $scope.sampleIds).then(function (response) {
                        console.log(response);
                    });

                })

            };

            $scope.$on('$destroy', function () {
                if (fileInput) {
                    fileInput.remove();
                }
            });

            $scope.resetFileInput()

        }

    ])
;
