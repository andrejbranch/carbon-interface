angular.module('production.dna.dnaProductionFormFactory', [])

    .factory('dnaProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var dnaProductionFormFactory = {

                openFormModal: function (dnaProduction) {

                    $modal.open({
                        templateUrl: 'production/dna/partials/dna-production-form-modal-tpl.html',
                        controller: 'dnaProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            dnaProduction: function () {

                                return dnaProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/dna-request-sample/dna-request/', 'sampleGridFactory', dnaProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/dna-request-project/dna-request/', 'projectGridFactory', dnaProduction, true);

                            },

                            protocolGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('protocolGridFactory');

                            },
                        }

                    });

                }

            };

            return dnaProductionFormFactory;
        }

    ])
;
