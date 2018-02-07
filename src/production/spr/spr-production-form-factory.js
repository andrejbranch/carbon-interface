angular.module('production.spr.sprProductionFormFactory', [])

    .factory('sprProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var sprProductionFormFactory = {

                openFormModal: function (sprProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/spr/partials/spr-production-form-modal-tpl.html',
                        controller: 'sprProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            sprProduction: function () {

                                return sprProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/spr-request-input-sample/spr-request/', 'sampleGridFactory', sprProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/spr-request-project/spr-request/', 'projectGridFactory', sprProduction, true);

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

            return sprProductionFormFactory;
        }

    ])
;
