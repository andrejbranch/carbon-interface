angular.module('session.httpInterceptor', [])
    .factory('httpInterceptor', ['$injector', '$q', '$localStorage',

        function ($injector, $q, $localStorage) {

            return {

                request: function(config) {

                    if (!$localStorage.api) {

                        $state = $injector.get('$state');

                        // $state.go('login');

                    }

                    return config;

                },

                response: function(response) {

                    return response;

                },

                responseError: function(rejection) {

                    var stateName = $injector.get('$state').current.name;

                    if (rejection.status === 401 && stateName !== 'login.totp' && stateName !== 'login') {

                        var deferred = $q.defer();

                        $injector.get('$state').go('login');

                        return deferred.promise;

                    }
                    else if (rejection.status === 403) {

                        $injector.get('toastr').error("You do not have permission to perform that action.");

                        return $q.reject(rejection);

                    }
                    else if (rejection.status === 0 || rejection.status === 400) {

                        return $q.reject(rejection);

                    }

                    return $q.reject(rejection);

                }

            };

    }])

    .config(['$httpProvider', function($httpProvider) {

        $httpProvider.interceptors.push('httpInterceptor');

    }]);
