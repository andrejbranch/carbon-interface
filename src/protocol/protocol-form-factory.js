angular.module('protocol.protocolFormFactory', [])

    .factory('protocolFormFactory', ['$uibModal', '$state', '$stateParams', '$cbGridBuilder',

        function ($modal, $state, $stateParams, $cbGridBuilder) {

            var protocolFormFactory = {

                openFormModal: function (protocol) {

                    $modal.open({
                        templateUrl: 'protocol/partials/protocol-form-tpl.html',
                        controller: 'protocolFormCtrl',
                        windowClass: 'inmodal',
                        keyboard: false,
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {

                            protocol: function () {

                                return protocol;

                            },

                            callback: function () {

                                return function () {

                                    $state.go($state.current, $stateParams, {reload:true});

                                };

                            }

                        }

                    });

                }

            };

            return protocolFormFactory;
        }

    ])
;
