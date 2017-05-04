define([
    'angular',
    '../services/SmsService',
    '../services/BusinessService',
    '../services/OpportunityService',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/ServiceService',
    '../services/RequirementService',
    '../services/PaginationService',
    '../services/UtilService',
    '../services/baseData.service'
],function (angular) {
    'use strict';

    sendMessageButtonController.$inject = ['$uibModalInstance', '$rootScope', 'authService', 'utilService', 'errorService', 'OpportunityService', 'smsService','data'];

    angular.module('xwWeb')
        .registerController('sendMessageButtonController', sendMessageButtonController);

    function sendMessageButtonController($uibModalInstance, $rootScope, authService, utilService, errorService, OpportunityService, smsService,data) {
        var vm = this;
        vm.selectedMoreContacts=data.selectedMoreContacts;
        vm.content=data.content;
        vm.type=data.type ? 1: 0;
        vm.needCostSmsNum=data.needCostSmsNum;
        var sessionId = authService.getSessionId();

        vm.sendMsmSubmit=sendMsmSubmit;
        vm.sendMsmcancel=sendMsmcancel;


        function sendMsmSubmit(){
            vm.oppIds=[];
            vm.selectedMoreContacts.forEach(function(customer){
                vm.oppIds.push(customer.oppId);
            });
            return smsService.sendSms(sessionId, vm.oppIds, vm.content, vm.type).then(function(){
                $uibModalInstance.close();
                alert("发送短信成功");
                location.reload();
            }).catch(function (error) {
                errorService.processError(error);
            })
        }

        function sendMsmcancel(){
            $uibModalInstance.dismiss();
        }

    }
})














