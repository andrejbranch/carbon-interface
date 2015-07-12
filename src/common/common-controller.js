angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer',

        function ($scope, sessionFactory, navigationInitializer) {

            navigationInitializer.initialize();

            this.logout = function () {

                sessionFactory.logout();

            }


        }

    ])
;