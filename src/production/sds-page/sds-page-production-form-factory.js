angular.module('production.sdsPage.sdsPageProductionFormFactory', [])

    .factory('sdsPageProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var sdsPageProductionFormFactory = {

                openFormModal: function (sdsPageProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/sds-page/partials/sds-page-production-form-modal-tpl.html',
                        controller: 'sdsPageProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            sdsPageProduction: function () {

                                return sdsPageProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/sds-page-request-input-sample/sds-page-request/', 'sampleGridFactory', sdsPageProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/sds-page-request-project/sds-page-request/', 'projectGridFactory', sdsPageProduction, true);

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

            return sdsPageProductionFormFactory;
        }

    ])
;
