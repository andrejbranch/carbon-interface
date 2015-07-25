angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', 'navigationInitializer', 'profileFactory', '$localStorage',

        function ($scope, sessionFactory, navigationInitializer, $localStorage) {

            navigationInitializer.initialize();

            this.logout = function () {

                sessionFactory.logout();

            }

            if (typeof $localStorage.User !== 'undefined') {
                this.user = $localStorage.User;
            }
        }

    ])
;
