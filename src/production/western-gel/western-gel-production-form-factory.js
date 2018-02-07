angular.module('production.westernGel.westernGelProductionFormFactory', [])

    .factory('westernGelProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var westernGelProductionFormFactory = {

                openFormModal: function (westernGelProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/western-gel/partials/western-gel-production-form-modal-tpl.html',
                        controller: 'westernGelProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            westernGelProduction: function () {

                                return westernGelProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/western-gel-request-input-sample/western-gel-request/', 'sampleGridFactory', westernGelProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/western-gel-request-project/western-gel-request/', 'projectGridFactory', westernGelProduction, true);

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

            return westernGelProductionFormFactory;
        }

    ])
;
