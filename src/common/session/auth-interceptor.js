angular.module('session.authInterceptor', [])
    .factory('authInterceptor',['$localStorage',

        function ($localStorage) {

            return {

                request: function(config) {

                    config.headers = config.headers || {};

                    if (typeof $localStorage.User !== 'undefined') {
                        config.headers.apikey = $localStorage.User.apiKey;
                    }

                    return config;
                }

            };

        }

])

.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
