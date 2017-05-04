/**
 * Created by Administrator on 2016/6/23.
 */
/**
 * Created by xiajingsi on 2016/4/13.
 */
define([
    'angular',
    '../config/CONFIG',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/UserService',
    '../services/SupplyAchievementService',
    '../services/ShopService',
    '../services/ContractService',
    '../services/RequirementService',
    '../services/ServiceHistoryService',
    '../services/ServiceRemarkService',
    '../directives/scrollThumb/ScrollThumbDirective',
    '../services/PaginationService',
    '../services/UtilService'
], function (angular) {

    'use strict';

    return angular.module('xwWeb')
        .registerController('addAchievementController', ['contractId', 'supplyAchievementService', 'authService', '$uibModalInstance', '$stateParams', 'errorService', 'serviceService', 'requirementService', 'serviceHistoryService', 'serviceRemarkService', 'shopService', '$window', '$location', 'utilService', 'paginationService', addAchievementController]);

    function addAchievementController(contractId, supplyAchievementService, authService, $uibModalInstance, $stateParams, errorService, serviceService, requirementService, serviceHistoryService, serviceRemarkService, shopService, $window, $location, utilService, paginationService) {
        //基本参数
        var vm = this;
        var sessionId = authService.getSessionId();
        var session = authService.getSession();
        vm.userId = session.id;
        vm.userName = session.nickname;
        vm.userMobile = session.mobile;
        vm.remark = '';

        vm.ownerId = vm.userId;//默认为本人.
        console.log(vm.ownerId);

        vm.supplyAchievement = supplyAchievement;
        vm.cancel = cancel;

        getBusinessUser();


        ///////////////////////

        function getBusinessUser() {
            supplyAchievementService.getBusinessUser(sessionId, contractId).then(function (result) {
                if(result.id == 0) {
                    vm.businessId = 0;
                } else {
                    vm.businessId = result.id;
                    vm.businessMobile = result.mobile;
                    vm.businessName = result.name
                }
            }).catch(function (error) {
                errorService.processError(error);
            })
        }

        function supplyAchievement(valid) {
            vm.submitted = true;
            if(!valid){
                return;
            }
            console.log("supply, ownerId", vm.ownerId);
            supplyAchievementService.supplyAchievement(sessionId, vm.amount * 100, contractId, vm.remark, vm.ownerId).then(function () {
                $uibModalInstance.dismiss('cancel');
                utilService.showPrompt("补充业绩成功");
            }).catch(function (error) {
                errorService.processError(error);
            })
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }
});
