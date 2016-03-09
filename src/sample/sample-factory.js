angular.module('sample.sampleFactory', [])
    .factory('sampleFactory', ['$http', 'API',

        function ($http, API) {

            var sampleFactory = {

                getSampleTypes: function () {

                    var url = API.url + '/sample-type';

                    var promise = $http.get(url).then(function (response) {

                        return response.data;

                    });

                    return promise;
                },

                getStorageContainers: function () {

                    var url = API.url + '/storage-container';

                    var promise = $http.get(url).then(function (response) {

                        return response.data;

                    });

                    return promise;
                },

                getSamples: function () {

                    var url = API.url + '/sample?cPerPage=10';

                    var promise = $http.get(url).then(function (response) {

                        return response.data;

                    });

                    return promise;
                },

                updateSample: function (sample) {

                    var url = API.url + '/sample?id=' + sample.id;

                    return $http.put(url, {
                        name: sample.name,
                        description: sample.description,
                        storageBuffer: sample.storageBuffer,
                        storageContainer: sample.storageContainer,
                        sampleType: sample.sampleType,
                        status: sample.status,
                        vectorName: sample.vectorName,
                        concentration: sample.concentration,
                        concentrationUnits: sample.concentrationUnits,
                        dnaSequence: sample.dnaSequence,
                        aminoAcidSequence: sample.aminoAcidSequence,
                        aminoAcidCount: sample.aminoAcidCount,
                        molecularWeight: sample.molecularWeight,
                        extinctionCoefficient: sample.extinctionCoefficient,
                        purificationTags: sample.purificationTags,
                        species: sample.species,
                        cellLine: sample.cellLine,
                        mass: sample.mass
                    });

                }

            }

            return sampleFactory;

        }

    ])
;
