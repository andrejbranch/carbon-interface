angular.module('session', [
    'session.sessionFactory',
    'session.httpInterceptor',
    'session.roleDefiner',
    'session.authInterceptor'
]);
