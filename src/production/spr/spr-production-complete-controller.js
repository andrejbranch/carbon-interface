angular.module('production.spr.sprProductionCompleteCtrl', [])

    .controller('sprProductionCompleteCtrl', ['$scope', 'sprRequest', '$cbResource', 'sampleGridFactory', 'API', 'sprSampleType', '$localStorage', 'sampleImportManager', 'StepsService',

        function ($scope, sprRequest, $cbResource, sampleGridFactory, API, sprSampleType, $localStorage, sampleImportManager, StepsService) {

            var fileInput;

            $scope.sprRequest = sprRequest;
            $scope.sampleType = sprSampleType;
            $scope.importForm = {};
            $scope.sampleImportManager = sampleImportManager;

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

            $scope.selectTotalSamples = function (totalSamples) {
                $scope.totalSamples = totalSamples;
                StepsService.steps('sprProductionComplete').next();
            }

            $scope.currentStep = 'step_1'
            $scope.acceptedSampleCount = [1,2,3,4,5,6,7,8,9,10];

            $scope.download = function () {

                $cbResource.get('/production/spr-request/' + $scope.sprRequest.id + '/download-output-template/' + $scope.totalSamples).then(function (response) {

                    var blob = new Blob([response], {type:'octet/stream'});

                    var windowUrl = window.URL || window.webkitURL;
                    var url = windowUrl.createObjectURL(blob);

                    var filename = 'Gel Request ' + $scope.sprRequest.id + ' Template.csv';

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

                        StepsService.steps('sprProductionComplete').goTo(2);

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

                    sample.lot = $scope.sprRequest.alias;

                    var sampleToSave = sample;

                    bulkSamples.push(sampleToSave);

                });

                $cbResource.create('/storage/sample-import/save', bulkSamples).then(function (response) {

                    $scope.isUploading = false;
                    StepsService.steps('sprProductionComplete').goTo(4);

                    $scope.sampleIds = response.data;

                    $cbResource.create('/production/spr-request/' + $scope.sprRequest.id + '/complete', $scope.sampleIds).then(function (response) {
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
