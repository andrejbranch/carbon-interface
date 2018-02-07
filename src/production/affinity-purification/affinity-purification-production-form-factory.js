angular.module('production.affinityPurification.affinityPurificationProductionFormFactory', [])

    .factory('affinityPurificationProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var affinityPurificationProductionFormFactory = {

                openFormModal: function (affinityPurificationProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/affinity-purification/partials/affinity-purification-production-form-modal-tpl.html',
                        controller: 'affinityPurificationProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            affinityPurificationProduction: function () {

                                return affinityPurificationProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/purification/affinity-purification-request-input-sample/affinity-purification-request/', 'sampleGridFactory', affinityPurificationProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/purification/affinity-purification-request-project/affinity-purification-request/', 'projectGridFactory', affinityPurificationProduction, true);

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

            return affinityPurificationProductionFormFactory;
        }

    ])
;
