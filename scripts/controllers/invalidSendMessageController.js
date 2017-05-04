define([
    'angular',
    '../services/AuthService',
    '../services/SmsService',
    '../services/BusinessService',
    '../services/OpportunityService',
    '../services/ErrorService',
    '../services/ServiceService',
    '../services/ServiceHistoryService',
    '../services/ServiceRemarkService',
    '../services/RequirementService',
    '../services/PaginationService',
    '../services/UtilService',
    '../services/baseData.service'
], function (angular) {
    'use strict';
    invalidSendMessageController.$inject = ['$scope', '$uibModalInstance', 'CONFIG', '$rootScope', 'OpportunityService', 'authService', 'smsService', 'businessService'];

    angular.module('xwWeb')
        .registerController('invalidSendMessageController', invalidSendMessageController);

    function invalidSendMessageController($scope, $uibModalInstance, CONFIG, $rootScope, OpportunityService, authService, smsService, businessService) {
        var vm = this;
        var sessionId = authService.getSessionId();
        vm.currentPage = 1; //必须是1，插件会自动调用当前页数来显示
        vm.pageSize = 20;
        vm.allSelected = false;
        vm.selectedOppId = [];
        vm.getChoiseOppId = [];
        vm.oppIds = [];
        vm.cacheResourceList = smsService.cacheSmsServiceData.cacheResourceList;
        vm.selectedCustoms = smsService.cacheSmsServiceData.selectedCustoms;
        vm.queryParam = smsService.cacheSmsServiceData.queryParam;
        vm.resourceList = vm.cacheResourceList ? vm.cacheResourceList[1] : [];
        vm.totalCount = smsService.cacheSmsServiceData.totalCount;
        vm.cacheAllSelect = smsService.cacheSmsServiceData.cacheAllSelect;
        vm.allSelected = smsService.cacheSmsServiceData.cacheAllSelect ?
            smsService.cacheSmsServiceData.cacheAllSelect[1] : false;

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

        if (!vm.resourceList) {
            query(false);
        }
        vm.query = query;
        vm.enterPress = enterPress;
        vm.eKey = eKey;
        vm.search = search;
        vm.selectAll = selectAll;
        vm.submit = submit;
        vm.changePage = changePage;
        vm.selected = selected;

        /**
         * 查询联系人
         * @param isClicked 是否是从页面点击，如果是，需要清空缓存cacheResourceList内容
         */
        function query(isClicked) {
            var queryParam = {
                type: vm.type,
                pluginId: vm.pluginId,
                transferType: vm.transferType,
                businessStatus: vm.businessStatus,
                sendRecord: vm.sendRecord
            };
            vm.queryParam = queryParam;
            vm.cacheResourceList = isClicked ? {} : vm.cacheResourceList;
            return smsService.queryCustomer(sessionId, queryParam, vm.currentPage - 1, vm.pageSize)
                .then(function (result) {
                    vm.resourceList = result.objects;
                    vm.cacheResourceList[vm.currentPage] = result.objects;
                    vm.cacheAllSelect[vm.currentPage] = false;
                    vm.totalCount = result.totalCount;

                    for(var i=0;i<vm.resourceList.length;i++){
                        for(var j=0;j<vm.selectedCustoms.length;j++){
                            if(vm.resourceList[i].oppId==vm.selectedCustoms[j].oppId){
                                vm.resourceList[i].$isChecked = vm.resourceList[i].$checked = true;
                                console.log(vm.selectedCustoms,"vm.selectedCustoms[j])");
                                console.log(vm.resourceList,"vm.resourceList[i]");
                            }
                        }
                    }

                    smsService.cacheSmsServiceData.totalCount = result.totalCount;
                    if (vm.totalCount == 0) {
                        vm.warning = "未找到相关信息。限查询我的业务与我发布的，且未被其他人保护的非收费信息";
                        vm.showWarning = true;
                    } else {
                        vm.showWarning = false;
                    }
                }, function () {

                })
        }

        function changePage() {
            var cacheResource = vm.cacheResourceList[vm.currentPage];
            if (cacheResource) {
                vm.resourceList = cacheResource;
            } else {
                query(false);
            }
            vm.allSelected = vm.cacheAllSelect[vm.currentPage];
        }

        function enterPress(e) {
            var event = e || window.event;
            if (event.keyCode == 13) {
                search();
            }
        }

        //数字e做处理
        function eKey(e) {
            var event = e || window.event;
            if (event.keyCode == 69) {
                vm.e_num = true;
            } else {
                vm.e_num = false;
            }
        }

        //搜索
        function search() {
            var searchParam = {
            };
            if (vm.keyword != "") {
                searchParam["key"] = vm.keyword;
            }
            if (vm.idnum != "" && vm.idnum != null) {
                searchParam["oppId"] = parseInt(vm.idnum);
            }
            if (vm.keyword == "" && (vm.idnum == "" || vm.idnum == null)) {
                searchParam["key"] = "";
            }

            vm.resourceList = [];
            return smsService.searchCustomer(sessionId, searchParam, vm.currentPage - 1, vm.pageSize).then(function (result) {
                vm.resourceList = result.objects;
                vm.cacheResourceList[vm.currentPage] = result.objects;

                for(var i=0;i<vm.resourceList.length;i++){
                    for(var j=0;j<vm.selectedCustoms.length;j++){
                        if(vm.resourceList[i].oppId==vm.selectedCustoms[j].oppId){
                            vm.resourceList[i].$isChecked = vm.resourceList[i].$checked = true;
                        }
                    }
                }

                vm.totalCount = result.totalCount;
                if (vm.totalCount == 0) {
                    vm.warning = "未找到相关信息。限搜索我的业务，且未被其他人保护的非收费信息";
                    vm.showWarning = true;
                } else {
                    vm.showWarning = false;
                }
                console.log(vm.totalCount, "vm.totalCount")
            }, function () {

            })
        }

        /**
         * 全选
         * @param selectAll
         * @param list 被全选的顾客列表
         */
        function selectAll(selectAll, list) {
            var isSelected = false;
            var count = 1;
            for (var i = 0; i < list.length; i++) {
                var custom = list[i];
                if(selectAll && isSameMobile(custom)){
                    if(count){
                        isSelected = true;
                        count--;
                    }
                    continue;
                }
                custom.$isChecked = selectAll;
                vm.cacheAllSelect[vm.currentPage] = selectAll;
                if (selectAll) {
                    if (vm.selectedCustoms.indexOf(custom) !== -1) {
                        continue;
                    }
                    vm.selectedCustoms.push(custom);
                } else {
                    vm.selectedCustoms.splice(vm.selectedCustoms.indexOf(custom), 1);
                }
            }
            if(isSelected){
                alert('同一客户只能被选择一次。')
            }
        }

        /**
         * 单选
         * @param custom 被单选的顾客
         */
        function selected(custom) {
            if (custom.$checked && isSameMobile(custom)){
                custom.$checked = false;
                alert('同一客户只能被选择一次。');
                return;
            }
            custom.$isChecked = custom.$checked;
            if (custom.$checked) {
                vm.selectedCustoms.push(custom);
            } else {
                vm.selectedCustoms.splice(vm.selectedCustoms.indexOf(custom), 1);
            }
        }

        /**
         * 根据手机号判断客户是否已经被选择了
         * @param custom
         * @returns {boolean}
         */
        function isSameMobile(custom) {
            var mobiles = vm.selectedCustoms.map(function (eachCustom) {
                return eachCustom.mobile;
            });
            for (var i=0;i<mobiles.length;i++){
                if (mobiles[i] === custom.mobile){
                    return true;
                }
            }
            return false;
        }

        function submit() {
            vm.data = {};
            $uibModalInstance.close(vm.data);
        }
    }
});
