angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory',

        function ($scope, sessionFactory) {

            this.logout = function () {

                sessionFactory.logout();

            }

        }

    ])
;
