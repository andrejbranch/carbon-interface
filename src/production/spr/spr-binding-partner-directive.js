angular.module('production.spr.sprBindingPartnerDirective', [])

    .directive('sprBindingPartner', [

        function () {

            return {

                require: '^form',

                scope: {
                    sampleGrid: '=',
                    request: '='
                },

                restrict: 'E',

                templateUrl: 'production/spr/partials/spr-binding-partner-directive-tpl.html',

                transclude: true,

                controller: function ($scope) {

                    if ($scope.request.requestBindingPartners == undefined) {
                        $scope.request.requestBindingPartners = [];
                    }

                    $scope.request.bindingPartners = {adding:[],removing:[]};

                    $scope.bindingPartnerModel = {};

                    $scope.ligandGrid = angular.copy($scope.sampleGrid);
                    $scope.analyteGrid = angular.copy($scope.sampleGrid);

                    $scope.addBindingPartner = function () {

                        $scope.request.requestBindingPartners.push($scope.bindingPartnerModel);
                        $scope.request.bindingPartners.adding.push($scope.bindingPartnerModel);
                        $scope.bindingPartnerModel = {};
                        $scope.ligandGrid = angular.copy($scope.sampleGrid);
                        $scope.analyteGrid = angular.copy($scope.sampleGrid);

                    };

                    $scope.removeBindingPartner = function (bindingPartner) {

                        $scope.request.requestBindingPartners.splice($scope.request.requestBindingPartners.indexOf(bindingPartner), 1);

                        if (bindingPartner.id != undefined) {
                            $scope.request.bindingPartners.removing.push(bindingPartner);
                        }

                    }

                },


            }

        }

    ])
;
