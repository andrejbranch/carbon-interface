angular.module('production.purification.purificationProductionFormFactory', [])

    .factory('purificationProductionFormFactory', ['$uibModal', '$cbGridBuilder',

        function ($modal, $cbGridBuilder) {

            var purificationProductionFormFactory = {

                openFormModal: function (purificationProduction) {

                    $modal.open({
                        templateUrl: 'production/purification/partials/purification-production-form-modal-tpl.html',
                        controller: 'purificationProductionFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            purificationProduction: function () {

                                return purificationProduction;

                            },

                            sampleGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/purification-request-sample/purification-request/', 'sampleGridFactory', purificationProduction, true);

                            },

                            projectGrids: function () {

                                return $cbGridBuilder.buildMTMGrids('/production/purification-request-project/purification-request/', 'projectGridFactory', purificationProduction, true);

                            },

                            protocolGrid: function () {

                                return $cbGridBuilder.buildSelectSingle('protocolGridFactory');

                            },
                        }

                    });

                }

            };

            return purificationProductionFormFactory;
        }

    ])
;
