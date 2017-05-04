/**
 * Created by Administrator on 2016/12/27.
 */
/**
 * Created by xiajingsi on 2016/4/13.
 */
define([
    'angular',
    '../config/CONFIG',
    '../services/UserService',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/ServiceService',
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
        .registerController('aboutServiceController', ['CONFIG','$uibModal', 'userService', 'authService', '$stateParams', 'errorService', 'serviceService', 'requirementService', 'serviceHistoryService', 'serviceRemarkService', 'shopService', '$window', '$location', 'utilService', 'paginationService', aboutServiceController]);

    function aboutServiceController(CONFIG, $uibModal, userService, authService, $stateParams, errorService, serviceService, requirementService, serviceHistoryService, serviceRemarkService, shopService, $window, $location, utilService, paginationService) {


        //基本参数
        var vm = this;
        var sessionId = authService.getSessionId();
        var serviceId = $stateParams.serviceId;
        var activeTab = $stateParams.active;


        if(activeTab == 1) {
            vm.activeTab = 1;
        } else if (activeTab == 2){
            vm.activeTab = 2;
        } else {
            vm.activeTab  = 0;
        }
        vm.allPluginId = "all:all";
        vm.transferPluginId = "xw:transfer";
        vm.sitingPluginId = "xw:siting";
        vm.recruitmentPluginId = "xw:recruitment";
        vm.reservationPluginId = "xw:reservation";
        vm.serviceId = serviceId;


        vm.historySubmited = false;
        vm.remarkSubmited = false;

        //找店首选类型
        vm.typeSelect=[
            {
                "value":vm.all,
                "name":"全部"
            },
            {
                "value":vm.shopTransferType,
                "name":"店铺转让"
            },
            {
                "value":vm.attractInvestmentType,
                "name":"出租招商"
            },
        ];

        //查询参数
        vm.shopId = '';
        vm.currentPage = 1;
        vm.historyCurrentPage = 1;//记录的当前页
        vm.remarkCurrentPage = 1;//备注的翻页
        vm.pageSize = CONFIG.pageSize;
        vm.historyContent ='';
        vm.remark = '';

        //查询结果
        vm.pluginId = '';
        vm.defaultPicUrl = CONFIG.postDefaultPic;
        vm.photos = [];
        vm.serviceList = [];
        vm.requirement = {};
        vm.reqContent = {};
        vm.postPhotos = [];
        vm.recruitmentReq = [];
        vm.serviceDetail = {};
        vm.serviceHistory = '';//服务记录
        vm.serviceHistoryId = '';//新增服务记录id
        vm.serviceRemark = ''; //服务备注
        vm.serviceRemarkId = '';//新增服务备注id
        vm.userType = '';//用户身份
        vm.facilities="";
        vm.industryType="";
        vm.doorWidth="";
        vm.industryId="";//适合经营


        //被暴露的方法
        vm.getServiceRemarklist = getServiceRemarklist;
        vm.getServiceHistoryList = getServiceHistoryList;
        vm.clearCurrentPage = clearCurrentPage;
        vm.pageGetServiceHistoryList = pageGetServiceHistoryList;
        vm.pageGetServiceRemarklist = pageGetServiceRemarklist;
        vm.promptSubmit = promptSubmit;//删除备注


        //新的获取服务详情

        pageGetServiceHistoryList();
        pageGetServiceRemarklist();
        getUserInfo();//获取用户信息


        init();
        function init() {
                getServiceRemarklist();
                getServiceHistoryList();
        }


        function pageGetServiceHistoryList() {
            $window.history.pushState({"historyCurrentPage": vm.historyCurrentPage}, '', $location.absUrl());
            getServiceHistoryList();
        }

        function getServiceHistoryList() {
            serviceHistoryService.getList(sessionId, serviceId, vm.historyCurrentPage -1, vm.pageSize).then(function (result) {
                vm.serviceHistory = result["objects"];
                vm.totalHistoryCount = result.totalCount;
            }, function (error) {
                errorService.processError(error);
            })
        }


        function pageGetServiceRemarklist () {
            $window.history.pushState({"remarkCurrentPage": vm.remarkCurrentPage}, '', $location.absUrl());
            getServiceRemarklist();
        }

        function getServiceRemarklist() {
            serviceRemarkService.getList(sessionId, serviceId, vm.remarkCurrentPage -1, vm.pageSize).then(function (result) {
                vm.serviceRemark = result["objects"];
                vm.totalRemarkCount = result.totalCount;
            }, function (error) {
                errorService.processError(error);
            })
        }


        function clearCurrentPage() {
            vm.remarkCurrentPage = 1;
            vm.historyCurrentPage = 1;
        }


        //浏览器后退触发事件
        $window.onpopstate = function () {
            // 获得存储在该历史记录点的currentPage对象
            var currentPage = $window.history.state;
            if(currentPage == null) {
                vm.historyCurrentPage = 1;
                vm.remarkCurrentPage = 1;
                getServiceHistoryList();
                getServiceRemarklist();
            } else {
                if(currentPage.historyCurrentPage) {
                    vm.historyCurrentPage = currentPage.historyCurrentPage;
                    getServiceHistoryList();
                } else {
                    vm.historyCurrentPage = 1;
                    getServiceHistoryList();
                }

                if(currentPage.remarkCurrentPage) {
                    vm.remarkCurrentPage = currentPage.remarkCurrentPage;
                    getServiceRemarklist();
                } else {
                    vm.remarkCurrentPage = 1;
                    getServiceRemarklist();
                }
            }
        };



        function getUserInfo() {
            var userId = authService.getSession().id;
            vm.userId = userId;

            userService.getUserInfo(sessionId, userId).then(function (result) {
                vm.userType = result.userType;
            }).catch(function (error) {
                errorService.processError(error);
            })
        }


        //删除服务记录
        function promptSubmit() {
            if(vm.tabType == 'remark') {
                serviceRemarkService.batchDelete(sessionId,[vm.currentRemarkId]).then(function(){
                    angular.forEach(vm.serviceRemark, function (value, index) {
                        if(value.id == vm.currentRemarkId) {
                            vm.serviceRemark.splice(index, 1);
                        }
                    });

                },function(err){
                    errorService.processError(err);
                });
            } else if(vm.tabType == 'history'){
                serviceHistoryService.batchDelete(sessionId,[vm.currentRemarkId]).then(function(){
                    angular.forEach(vm.serviceHistory, function (value, index) {
                        if(value.id == vm.currentRemarkId) {
                            vm.serviceHistory.splice(index, 1);
                        }
                    });

                },function(err){
                    errorService.processError(err);
                });
            }

        }
    }
});
