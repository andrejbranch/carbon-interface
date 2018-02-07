angular.module('production.sizeExclusionPurification.sizeExclusionPurificationProductionFormFactory', [])

    .factory('sizeExclusionPurificationProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var sizeExclusionPurificationProductionFormFactory = {

                openFormModal: function (sizeExclusionPurificationProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/size-exclusion-purification/partials/size-exclusion-purification-production-form-modal-tpl.html',
                        controller: 'sizeExclusionPurificationProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            sizeExclusionPurificationProduction: function () {

                                return sizeExclusionPurificationProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/purification/size-exclusion-purification-request-input-sample/size-exclusion-purification-request/', 'sampleGridFactory', sizeExclusionPurificationProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/purification/size-exclusion-purification-request-project/size-exclusion-purification-request/', 'projectGridFactory', sizeExclusionPurificationProduction, true);

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

            return sizeExclusionPurificationProductionFormFactory;
        }

    ])
;
