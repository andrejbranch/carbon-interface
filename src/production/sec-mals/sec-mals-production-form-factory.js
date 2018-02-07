angular.module('production.secMals.secMalsProductionFormFactory', [])

    .factory('secMalsProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var secMalsProductionFormFactory = {

                openFormModal: function (secMalsProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/sec-mals/partials/sec-mals-production-form-modal-tpl.html',
                        controller: 'secMalsProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            secMalsProduction: function () {

                                return secMalsProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/sec-mals-request-input-sample/sec-mals-request/', 'sampleGridFactory', secMalsProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/sec-mals-request-project/sec-mals-request/', 'projectGridFactory', secMalsProduction, true);

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

            return secMalsProductionFormFactory;
        }

    ])
;
