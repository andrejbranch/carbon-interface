angular.module('production.analysis.analysisProductionFormFactory', [])

    .factory('analysisProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var analysisProductionFormFactory = {

                openFormModal: function (analysisProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/analysis/partials/analysis-production-form-modal-tpl.html',
                        controller: 'analysisProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            analysisProduction: function () {

                                return analysisProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis-request-input-sample/analysis-request/', 'sampleGridFactory', analysisProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis-request-project/analysis-request/', 'projectGridFactory', analysisProduction, true);

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

            return analysisProductionFormFactory;
        }

    ])
;
