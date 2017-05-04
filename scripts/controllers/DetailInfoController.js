/**
 * Created by Administrator on 2017/3/9.
 */
define([
    'angular',
    '../services/SpiderInfoService',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/UtilService'
], function (angular) {
    angular.module("xwWeb")
        .registerController("detailInfoController", detailInfoController)

    detailInfoController.$inject = ['CONFIG', 'data', 'spiderInfoService', '$uibModalInstance', 'errorService', 'utilService', 'authService','districtService'];

    function detailInfoController(CONFIG, data, spiderInfoService, $uibModalInstance, errorService, utilService, authService,districtService) {
        var sessionId = authService.getSessionId();
        var vm = this;
        vm.data=data;
        console.log("xll",vm.data);


    }
})
