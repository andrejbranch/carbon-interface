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

                getSamples: function (options) {

                    var perPage = options.perPage ? options.perPage : 10;

                    var url = API.url + '/sample?cPerPage=' + perPage;

                    if (options.search !== undefined) {
                        url = url + '&cSearch=' + options.search;
                    }

                    if (options.filteredIds !== undefined) {
                        var filteredParams = options.filteredIds.map(function (filteredId) {
                            return 'cNot[id][]=' + filteredId
                        });

                        url = url + '&' + filteredParams.join('&')
                    }

                    var params = [];

                    params.push('cOrderBy=' + 'id');
                    params.push('cOrderByDirection=' + 'DESC');

                    url = url + '&' + params.join('&')

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
                        mass: sample.mass,
                        linkedSamples: sample.linkedSamples
                    });

                },

                getLinkedSamples: function (sample) {

                   return $http.get(API.url + '/sample-linked-sample/' + sample.id);

                },

                getSample: function (options) {

                    var url = API.url + '/sample?id[EQ]=' + options.id;

                    return $http.get(url).then(function (response) {

                        return response.data.data[0];

                    });

                }

            }

            return sampleFactory;

        }

    ])
;
