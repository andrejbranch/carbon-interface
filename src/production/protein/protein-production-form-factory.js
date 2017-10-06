angular.module('production.protein.proteinProductionFormFactory', [])

    .factory('proteinProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var proteinProductionFormFactory = {

                openFormModal: function (proteinProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/protein/partials/protein-production-form-modal-tpl.html',
                        controller: 'proteinProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            proteinProduction: function () {

                                return proteinProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/protein-request-sample/protein-request/', 'sampleGridFactory', proteinProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/protein-request-project/protein-request/', 'projectGridFactory', proteinProduction, true);

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

            return proteinProductionFormFactory;
        }

    ])
;
