angular.module('common.commonCtrl', [])
    .controller('commonCtrl', ['$scope', 'sessionFactory', '$cookieStore',

        function ($scope, sessionFactory, $cookieStore) {

            var user = $cookieStore.get('User');

            if (user) {

                this.userName = user.username;

            }

            this.helloText = 'Welcome in SeedProject';
            this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

            this.logout = function () {

                sessionFactory.logout();

            }

        }

    ])
;
