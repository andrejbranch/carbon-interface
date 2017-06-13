angular.module('sample.sampleImportCtrl', [])

    .controller('sampleImportCtrl', ['$scope', 'sampleTypes', '$cbResource', 'API', '$localStorage', 'gridFactory', 'StepsService', 'toastr', 'sampleTypeHelpGrid', 'sampleGridFactory', 'sampleImportManager',

        function ($scope, sampleTypes, $cbResource, API, $localStorage, gridFactory, StepsService, toastr, sampleTypeHelpGrid, sampleGridFactory, sampleImportManager) {

            var fileInput;

            $scope.sampleTypes = sampleTypes.data;
            $scope.sampleTypeHelpGrid = sampleTypeHelpGrid;
            $scope.isUploading = false;
            $scope.sampleImportManager = sampleImportManager;

            $scope.selectSampleType = function (sampleType) {
                $scope.sampleType = sampleType;
                StepsService.steps('sampleImportFlow').next();
            }

            $scope.parentScope = $scope;

            $scope.steps = [
                {
                    name: 'step_1',
                    title: 'Step 1',
                    description: 'Select your sample type'
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

            $scope.currentStep = 'step_1'

            $scope.download = function () {

                $cbResource.get('/storage/sample-import/' + $scope.sampleType.id).then(function (response) {

                    var blob = new Blob([response], {type:'octet/stream'});

                    var windowUrl = window.URL || window.webkitURL;
                    var url = windowUrl.createObjectURL(blob);

                    var filename = $scope.sampleType.name + ' Import Template.csv';

                    var a = document.createElement('a');

                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);

                });

            };

            $scope.upload = function () {
                angular.element('#test-file-uploader').click();
            }

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

                        StepsService.steps('sampleImportFlow').goTo(2);

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

                    var sampleToSave = sample;

                    // if (sampleToSave.storageRecommended !== undefined) {
                    //     sampleToSave.division = sampleToSave.recommendedDivision;
                    //     sampleToSave.divisionColumn = sampleToSave.recommendedDivisionColumn;
                    //     sampleToSave.divisionRow = sampleToSave.recommendedDivisionRow;
                    // }

                    bulkSamples.push(sampleToSave);

                });

                $cbResource.create('/storage/sample-import/save', bulkSamples).then(function (response) {
                    $scope.isUploading = false;
                    StepsService.steps('sampleImportFlow').goTo(4);
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
