angular.module('session.sessionFactory', [])
    .factory('sessionFactory', ['$http', 'API', '$localStorage', '$state',

        function ($http, API, $localStorage, $state) {

            var sessionFactory = {

                /**
                 * Authenitcate returns an API key if credentials are
                 * correct.
                 *
                 * @param  {string} username
                 * @param  {string} password
                 *
                 * @return {object} promise
                 */
                login: function (username, password) {

                    var url = API.url + '/authenticate',
                        data = {
                            username: username,
                            password: password
                        }
                    ;

                    return $http.post(url, data).then(

                        function (response) {

                            $localStorage.$default({
                                User: response.data
                            });

                        }

                    );

                },

                logout: function () {

                    $localStorage.$reset();

                    $state.go('login');

                },

                isLoggedInUser: function () {

                    return $localStorage.User;

                }
            };

            return sessionFactory;
        }

    ])
;