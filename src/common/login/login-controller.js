angular.module('login.loginCtrl', [])
    .controller('loginCtrl', ['$scope', '$state',
        function ($scope, $state) {
            console.log($state.current.data);
        }
    ])
;
