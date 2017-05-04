/**
 * Created by xjs on 2016/7/12.
 */
define([
    'angular',
    '../services/AuthService',
    '../services/BusinessService',
    '../services/ErrorService'
], function (angular) {
    return angular.module('xwWeb')
        .registerController('giveUpBusinessController', ['authService', '$uibModalInstance', 'businessId', 'businessService', 'errorService', giveUpBusinessController]);

    function giveUpBusinessController(authService, $uibModalInstance, businessId, businessService, errorService) {
        var sessionId = authService.getSessionId();
        var vm = this;
        vm.businessId = businessId;

        vm.certain = certain;
        vm.cancel = cancel;

        function certain() {
            businessService.sendMessageToPersuade(sessionId, vm.businessId).then(function () {
                alert("发送短信成功");
                $uibModalInstance.dismiss();
            }).catch(function (error) {
                errorService.processError(error);
                $uibModalInstance.dismiss();
            });
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }
});
