define([
    'angular',
    '../services/AuthService'
], function (angular) {
    return angular.module('xwWeb')
        .registerController('logoutController', ['authService', '$timeout', logoutController]);

    function logoutController(authService, $timeout) {
        $timeout(function () {
            authService.logout();
        }, 500);

    }
})
