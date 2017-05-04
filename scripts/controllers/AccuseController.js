/**
 * Created by Administrator on 2016/7/13.
 */

define([
    'angular',
    '../services/AccuseService',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/UtilService'
], function (angular) {
    angular.module("xwWeb")
        .registerController("accuseController", accuseController)

    accuseController.$inject = ['oppId', '$uibModalInstance', 'accuseService', 'errorService', 'utilService', 'authService'];

    function accuseController(oppId, $uibModalInstance, accuseService, errorService, utilService, authService) {
        var vm = this;
        var sessionId =  authService.getSessionId();
        vm.accuseReasonOne = "信息无效";
        vm.accuseReasonTwo = "手机号码错误，联系不上";
        vm.accuseReasonThree = "信息与实际不符，需要修改";

        var type = 1;//为1是商机

        vm.reason = vm.accuseReasonOne;

        vm.accuseSubmit = accuseSubmit;
        vm.cancel = cancel;

        ////////

        function accuseSubmit(valid) {
            vm.submitted = true;
            console.log("valie");
            if(!valid) {
                console.log("!valie");
                return;
            }

            accuseService.add(sessionId, type, oppId, vm.reason, vm.description).then(function (result) {
                $uibModalInstance.dismiss();
                utilService.showPrompt("举报成功，感谢你的每一次努力");
            }).catch(function (error) {
                errorService.processError(error);
            })
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }

    }
})
