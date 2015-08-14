angular.module('session.roleDefiner', ['permission', 'session.sessionFactory'])
    .run(function (Permission, sessionFactory) {

        // Define anonymous role
        Permission.defineRole('anonymous', function (stateParams) {

            return !sessionFactory.isLoggedInUser();

        });

    })
;
