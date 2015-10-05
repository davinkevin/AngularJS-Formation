angular
    .module('cf.config.restangular', ['restangular'])
    .config(restangularConfig);

function restangularConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/');
}
