angular.module('sample.sampleImportCtrl', [])

    .controller('sampleImportCtrl', ['$scope', 'sampleType', '$cbResource', 'API', '$localStorage', 'gridFactory',

        function ($scope, sampleType, $cbResource, API, $localStorage, gridFactory) {

            var fileInput;

            $scope.sampleType = sampleType;

            $scope.download = function () {

                $cbResource.get('/sample-import/1').then(function (response) {

                    // var type = response.headers('Content-Type');
                    var blob = new Blob([response.data], {type:'octet/stream'});

                    var windowUrl = window.URL || window.webkitURL;
                    var url = windowUrl.createObjectURL(blob);

                    var filename = response.headers()['content-disposition'].match(/filename="(.*)"/)[1];

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
                    console.log(1);
                    fileInput.remove();
                }

                fileInput = angular.element('<input type="file" id="test-file-uploader"></input>');

                angular.element(document).find('body').append(fileInput);

                fileInput.on('change', function () {
                    $scope.handleUpload();
                });

            };

            $scope.handleUpload = function () {

                var file = angular.element('#test-file-uploader')[0].files[0];

                var xhr = new XMLHttpRequest();

                xhr.upload.addEventListener('progress', function (e) {
                    console.log('progress');
                    console.log(e);
                });

                xhr.upload.addEventListener('load', function (e) {
                    console.log('load');
                    console.log(e);
                });

                xhr.upload.addEventListener('error', function (e) {
                    console.log('error');
                    console.log(e);
                });

                xhr.open('POST', API.url + '/sample-import/' + $scope.sampleType.id, true);

                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText) {

                        $scope.importData = JSON.parse(xhr.responseText);
                        $scope.importItems = $scope.importData.items;
                        $scope.importGrid = gridFactory.create();

                        var responseColumns = $scope.importData.columns;
                        var columns = [];

                        var count = 0;

                        angular.forEach(responseColumns, function (responseColumn) {
                            columns.push({
                                header: responseColumn.header,
                                bindTo: responseColumn.bindTo,
                                ngClass: "{\'background-error\': result.errors." + responseColumn.bindTo + ".length}"
                            });
                        });
                        // for (k in $scope.importItems[0]) {
                        //     if (k !== 'errors') {
                        //         console.log(k)
                        //         console.log($scope.headers[count-1]);
                        //         columns.push({
                        //             header: $scope.headers[count],
                        //             bindTo: k,
                        //             ngClass: "{\'background-error\': result.errors." + k + ".length}"
                        //         });
                        //         count++;
                        //     }
                        // }

                        columns.unshift({
                            header: "",
                            templateUrl: 'sample/partials/sample-import-error-column-tpl.html'
                        });

                        $scope.importGrid
                            .addColumns(columns)
                            .setPerPage(100)
                            .setData($scope.importItems)
                            .hideFilters()
                            .disableToggleColumns()
                            .disableHover()
                        ;

                        $scope.$apply();

                        console.log($scope.importGrid);

                        $scope.resetFileInput()

                    }

                };

                xhr.setRequestHeader('X_FILENAME', file.name)
                xhr.setRequestHeader(API.apiKeyParam, $localStorage.User.apiKey);

                xhr.send(file)

            }

            $scope.$on('$destroy', function () {
                if (fileInput) {
                    fileInput.remove();
                }
            });
            $scope.resetFileInput()

        }

    ])
;
