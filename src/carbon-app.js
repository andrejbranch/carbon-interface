var scrippsApp = angular.module('scrippsApp', [
    'templates',
    'common',
    'cb-constants',
    'sampleType',
    'storageContainer',
    'sample',
    'project',
    'production',
    'protocol',
    'tag'
]);

angular.module('scrippsApp').run(
    function($rootScope, $state) {
        $rootScope.$state = $state;
    }
);
