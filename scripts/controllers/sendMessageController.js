define([
    'angular',
    '../services/SmsService',
    '../services/BusinessService',
    '../services/OpportunityService',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/ServiceService',
    '../services/DistrictService',
    '../services/IndustryService',
    '../services/CityService',
    '../services/ServiceHistoryService',
    '../services/ServiceRemarkService',
    '../services/RequirementService',
    '../services/PaginationService',
    '../services/UtilService',
    '../services/baseData.service'
], function (angular) {
    'use strict';

    sendMessageController.$inject = ['CONFIG', '$stateParams', '$uibModal', '$rootScope', 'utilService', 'errorService', 'OpportunityService', 'authService', 'smsService', 'businessService'];

    angular.module('xwWeb')
        .registerController('sendMessageController', sendMessageController);

    function sendMessageController(CONFIG, $stateParams, $uibModal, $rootScope, utilService, errorService, OpportunityService, authService, smsService, businessService) {
        var vm = this;
        var sessionId = authService.getSessionId();
        vm.content = '';
        vm.isAddCustomName = false;
        vm.num = 0;
        vm.needCostSmsNum = 0;
        vm.readonly=false;
        vm.list = [];
        vm.selectedCustoms = smsService.cacheSmsServiceData.selectedCustoms;
        vm.cacheResourceList = smsService.cacheSmsServiceData.cacheResourceList;
        vm.oppIds = [];
        vm.resourceList = [];

        //模态框数据
        vm.typeSelect = [{
            "value": "0",
            "name": "我的业务信息"
        }, {
            "value": "1",
            "name": "我发布的信息"
        }];
        vm.type = "0"; //默认我的业务
        vm.pluginIdSelect = [{
            "value": "all:all",
            "name": "全部"
        }, {
            "value": "xw:transfer",
            "name": "转店"
        }, {
            "value": "xw:siting",
            "name": "找店"
        }, {
            "value": "xw:recruitment",
            "name": "招聘"
        }, {
            "value": "xw:reservation",
            "name": "消费"
        }];
        vm.pluginId = "all:all"; //默认查找全部
        vm.transferTypeSelect = [{
            "value": "0",
            "name": "全部转店/出租招商"
        }, {
            "value": "1",
            "name": "转店"
        }, {
            "value": "2",
            "name": "出租招商"
        }];
        vm.transferType = "0"; //默认全部转店/出租招商
        vm.businessStatusSelect = [{
            "value": "1",
            "name": "业务中"
        }, {
            "value": "2",
            "name": "签约中"
        }, {
            "value": "4",
            "name": "已联系"
        }];
        vm.businessStatus = "4"; //已联系
        vm.sendRecordSelect = [{
            "value": "1",
            "name": "4天内未发送过短信"
        }, {
            "value": "2",
            "name": "7天内未发送过短信"
        }, {
            "value": "3",
            "name": "15天内未发送过短信"
        }, {
            "value": "4",
            "name": "30天内未发送过短信"
        }];
        vm.sendRecord = "1"; //4天内未发送过短信

        vm.invalid = invalid;
        vm.sendSms = sendSms;
        vm.deleteCustom = deleteCustom;
        vm.calSmsCount = calSmsCount;
        vm.isSmsEnough = isSmsEnough;

        getSmsNum();
        checkContent();

        function getSmsNum() {
            return smsService.getSmsNum(sessionId).then(function (result) {
                vm.num = result;
            })
        }

        /**
         * 计算单词发送需要消耗的短信数量
         * @param content 输入的内容
         * @param type 是否自动在短信前面添加用户称呼
         * @returns {number|*} 需要消耗短信数量
         */
        function calSmsCount(content, type) {
            if(!content) {
                return 0;
            }
            if (content.length < 53) {
                vm.needCostSmsNum = vm.selectedCustoms.length;
                return vm.selectedCustoms.length;
            }
            var smsCount = 0;
            vm.selectedCustoms.forEach(function (custom) {
                var tempContent = ['【铺铺旺】', content];
                if (type) {
                    tempContent.push(custom.contact.substring(0, 7));
                }
                tempContent.push('回TD退订');
                smsCount += Math.ceil(tempContent.join('').length / 70);
            });
            vm.needCostSmsNum = smsCount;
            return smsCount;
        }

        function isSmsEnough() {
            vm.diff = vm.needCostSmsNum - vm.num;
            // if (vm.diff > 0) {
            //     alert("短信余额不足（还差" + diff + "条）请删减客户；短信每超过70个字会算作2条短信”");
            //     return true;
            // }
            // return false;
            return vm.diff > 0 ? true : false;
        }

        function checkContent(input){
            if(input>200){
                // alert("字数超过200，短信只截取200字");
                vm.readonly=true;

                // vm.content=vm.content.substring(0,200);
            }
        }

        function sendSms() {
            var modalInstance = $uibModal.open({
                animation: true,
                size: "sm",
                templateUrl: "views/partial/sendMessageButton.html",
                controllerAs: 'vm',
                controller: 'sendMessageButtonController',
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/sendMessageButtonController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }],
                    data: function () {
                        return {
                            type: vm.isAddCustomName,
                            content: vm.content,
                            selectedMoreContacts: vm.selectedCustoms,
                            needCostSmsNum: vm.needCostSmsNum
                        }
                    }
                }

            });
            modalInstance.result.then(function () {
                $rootScope.$emit('quotaChanged');
            }, function () {

            });
        }

        function invalid() {
            var modalInstance = $uibModal.open({
                animation: true,
                size: "md",
                templateUrl: "views/partial/invalidSendMessage.html",
                controllerAs: 'vm',
                // scope: $scope,
                controller: 'invalidSendMessageController',
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/invalidSendMessageController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
                }
            });
        }

        function deleteCustom(custom) {
            // 从选中的顾客信息中删除
            vm.selectedCustoms.splice(vm.selectedCustoms.indexOf(custom), 1);

            // 把缓存中相应选中信息去除
            var keys = Object.keys(vm.cacheResourceList);
            for(var i=0;i<keys.length;i++) {
                var resoureList = vm.cacheResourceList[keys[i]];
                var index = resoureList.indexOf(custom);
                if (index !== -1) {
                    resoureList[index].$isChecked = resoureList[index].$checked = false;
                }
            }
        }

    }
});
