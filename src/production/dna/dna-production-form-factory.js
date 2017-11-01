angular.module('production.dna.dnaProductionFormFactory', [])

    .factory('dnaProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var dnaProductionFormFactory = {

                openFormModal: function (dnaProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
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

                                return $cbGridBuilder.buildMTMGrids('/production/dna-request-input-sample/dna-request/', 'sampleGridFactory', dnaProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/dna-request-project/dna-request/', 'projectGridFactory', dnaProduction, true);

                            },

                            protocolGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('protocolGridFactory');

                            },

                            isPipeline: function () {

                                return isPipeline ? true: false;

                            },

                            pipelineStepIndex: function () {

                                return pipelineStepIndex;

                            }
                        }

                    });

                }

            };

            return dnaProductionFormFactory;
        }

    ])
;
