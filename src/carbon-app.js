var scrippsApp = angular.module('scrippsApp', [
    'templates',
    'common',
    'cb-constants',
    'storage',
    'sampleType',
    'storageContainer',
    'sample',
    'project'
]);

angular.module('scrippsApp').run(
    function($rootScope, $state) {
        $rootScope.$state = $state;
    }
);
