angular.module('production.dna.dnaProductionFormFactory', [])

    .factory('dnaProductionFormFactory', ['$uibModal', '$cbGridBuilder', 'cbFormHelper',

        function ($modal, $cbGridBuilder, cbFormHelper) {

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

                },

                openDeleteForm: function (dnaRequest, returnState) {

                    cbFormHelper.openForm("delete", "DNA Purification Request", dnaRequest.id, '/production/dna', returnState);

                },

                openRestoreForm: function (dnaRequest, returnState) {

                    cbFormHelper.openForm("restore", "DNA Purification Request", dnaRequest.id, '/production/dna', returnState);

                },

                openPurgeForm: function (dnaRequest, returnState) {

                    cbFormHelper.openForm("purge", "DNA Purification Request", dnaRequest.id, '/production/dna', returnState);

                }

            };

            return dnaProductionFormFactory;
        }

    ])
;
