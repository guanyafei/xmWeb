'use strict';
define([
    'angular',
    '../services/AuthService',
    '../services/OpportunityService',
    '../services/ErrorService',
    '../directives/scrollThumb/ScrollThumbDirective',
    '../services/IndustryService',
    '../services/BusinessService',
    '../services/UserService',
    '../services/RemarkService'
], function (angular) {
    businessOppRemarkController.$inject = ['$timeout','remarkService','$stateParams','businessService',"authService", "errorService", 'userService'];

    return angular.module('xwWeb')
        .registerController('businessOppRemarkController', businessOppRemarkController);

    function businessOppRemarkController($timeout,remarkService,$stateParams,businessService,authService,errorService, userService){
        var vm = this;
        vm.oppId = $stateParams.oppId ? $stateParams.oppId : 0;
        vm.businessId = $stateParams.businessId ? $stateParams.businessId : 0;
        vm.showClass = "";
        vm.activeTab = 0;
        vm.list = [];
        vm.pageSize = 30;
        vm.currentPage = 1;
        vm.totalCount = 0;
        vm.remarkContent = "";
        vm.remarkWarnShow = true;
        vm.remarkWarnMsg = "";
        vm.void = false;
        vm.xwHidden = "xwhidden";//css类，用于显示隐藏提示框
        vm.oppStatus = "";

        vm.addRemark = addRemark;
        vm.enterPress = enterPress;
        vm.getRemarkList = getRemarkList;
        vm.promptSubmit = promptSubmit;//删除备注

        ///////////////////////////////

        var sessionId = authService.getSessionId();
        init();

        function init(){
            if(vm.businessId != 0){
                businessService.get(sessionId, vm.businessId).then(function (result) {
                    vm.oppId = result.opportunityId;
                    getRemarkList();
                },function(){});
            }else{
                getRemarkList();
            }

            userService.getProfile(sessionId).then(function (result) {
                vm.userId = result.id;
            })

        }

        function enterPress(e){
            var event = e || window.event;
            if(event.keyCode == 13){
                addRemark();
            }
        }

        function addRemark(){
            if(vm.remarkContent == ""){
                vm.remarkWarnMsg = "请填写备注内容";
                vm.void = true;
            }else if(vm.remarkContent.length > 300){
                vm.remarkWarnMsg = "备注不超过300字！";
                vm.void = true;
            }else{
                remarkService.add(sessionId, vm.oppId, 0, vm.remarkContent).then(function () {
                    vm.remarkContent = "";
                    vm.xwHidden = "";
                    vm.currentPage = 1;
                    vm.void = false;

                    getRemarkList();
                    $timeout(function(){vm.xwHidden = "xwhidden";},600,true);
                }, function (error) {
                    errorService.processError(error);
                });
            }
        }

        function getRemarkList(){
            remarkService.getList(sessionId,vm.oppId,vm.currentPage-1,vm.pageSize).then(function(data){
                vm.totalCount = data.totalCount;
                vm.list = data['objects'];
            },function(){

            });
        }

        function promptSubmit() {
            remarkService.batchDelete(sessionId,[vm.currentRemarkId]).then(function(){
                angular.forEach(vm.list, function (value, index) {
                    if(value.id == vm.currentRemarkId) {
                        vm.list.splice(index, 1);
                    }
                });
            },function(err){
                errorService.processError(err);
            });
        }



    }
});

