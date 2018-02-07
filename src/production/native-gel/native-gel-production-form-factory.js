angular.module('production.nativeGel.nativeGelProductionFormFactory', [])

    .factory('nativeGelProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var nativeGelProductionFormFactory = {

                openFormModal: function (nativeGelProduction, isPipeline, pipelineStepIndex) {

                    return $modal.open({
                        templateUrl: 'production/native-gel/partials/native-gel-production-form-modal-tpl.html',
                        controller: 'nativeGelProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            nativeGelProduction: function () {

                                return nativeGelProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/native-gel-request-input-sample/native-gel-request/', 'sampleGridFactory', nativeGelProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/analysis/native-gel-request-project/native-gel-request/', 'projectGridFactory', nativeGelProduction, true);

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

            return nativeGelProductionFormFactory;
        }

    ])
;
