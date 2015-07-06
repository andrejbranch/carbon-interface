angular.module('session.sessionFactory', ['ngCookies'])
    .factory('sessionFactory', ['$http', 'API', '$cookieStore', '$state',

        function ($http, API, $cookieStore, $state) {

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

                            $cookieStore.put('User', response.data);

                        },

                        function () {

                            //

                        }

                    );

                },

                logout: function () {

                    $localStorage.$reset();

                    $state.go('login');

                },

                isLoggedInUser: function () {

                    console.log($cookieStore.get('User'));
                    return $cookieStore.get('User');

                }
            };

            return sessionFactory;
        }

    ])
;
