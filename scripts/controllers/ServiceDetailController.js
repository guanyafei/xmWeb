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
        .registerController('serviceDetailController', ['CONFIG','$uibModal', 'userService', 'authService', '$stateParams', 'errorService', 'serviceService', 'requirementService', 'serviceHistoryService', 'serviceRemarkService', 'shopService', '$window', '$location', 'utilService', 'paginationService', serviceDetailController]);

    function serviceDetailController(CONFIG, $uibModal, userService, authService, $stateParams, errorService, serviceService, requirementService, serviceHistoryService, serviceRemarkService, shopService, $window, $location, utilService, paginationService) {


        //基本参数
        var vm = this;
        var sessionId = authService.getSessionId();
        var serviceId = $stateParams.serviceId;
        var activeTab = $stateParams.active;
        var cssId = $stateParams.cssId;
        vm.cssId = cssId;

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
        console.log(serviceId, "servciedetail serviceid");

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
        vm.refresh = refresh;
        vm.shopRefresh = shopRefresh;
        vm.abort = abort;
        vm.cancelAbort = cancelAbort;
        vm.addServiceHistory = addServiceHistory;
        vm.addServiceRemark = addServiceRemark;
        vm.getServiceRemarklist = getServiceRemarklist;
        vm.getServiceHistoryList = getServiceHistoryList;
        vm.clearCurrentPage = clearCurrentPage;
        vm.pageGetServiceHistoryList = pageGetServiceHistoryList;
        vm.pageGetServiceRemarklist = pageGetServiceRemarklist;
        vm.take = take;//领取服务
        vm.addAchievement = addAchievement;

        //新的获取服务详情
        getServiceDetail();

        pageGetServiceHistoryList();
        pageGetServiceRemarklist();
        getUserInfo();//获取用户信息
        vm.promptSubmit = promptSubmit;//删除备注
        //getServiceRemarklist();
        //getServiceHistoryList();

        ////////////////////////////////

        //获取服务详情
        function getServiceDetail() {
            vm.myServiceTag = cssId ? true: false;
            if(!cssId) {
                serviceService.getServiceDetail(sessionId, serviceId).then(function (result) {
                    serviceDetailResult(result);
                }).catch(function (error) {
                    errorService.processError(error);
                })
            } else {
                serviceService.getServiceDetail(sessionId, serviceId, cssId).then(function (result) {
                    serviceDetailResult(result);
                }).catch(function (error) {
                    errorService.processError(error);
                })
            }
        }

        function serviceDetailResult(result) {
            vm.serviceDetail = result;

            vm.pluginId = result.pluginId;
            vm.shopId = result.shopId;
            //vm.cssId = result.cssId;
            vm.serviceStatus = result.cssStatus;

            vm.status = result.status;
            vm.serviceDetail.perPrice = (result.perPrice/100).toFixed(2);
            if(result.pluginId != vm.reservationPluginId) {
                if(result.item.length > 0) {
                    vm.requirement = result.item;

                    console.log(vm.requirement,"lalala");
                    vm.facilities=vm.requirement[0].content.facilities;
                    vm.industryId=vm.requirement[0].content.industryId;

                    vm.industryType=vm.requirement[0].content.industryType;
                    console.log(vm.requirement[0].content.contractPeriod,"mttlalalammm");



                    vm.doorWidth=parseFloat((vm.requirement[0].content.doorWidth/100).toFixed(2));

                    if(vm.requirement[0].content.photos && vm.requirement[0].content.photos.length > 0){
                        for(var i = 0, length = vm.requirement[0].content.photos.length; i < length; i ++) {
                          var  photourl=vm.requirement[0].content.photos[i].url+'?x-oss-process=image/resize,m_mfit,h_200,w_578';
                            vm.photos.push(photourl);
                        }
                    }
                }
            }
            if(vm.serviceDetail.mode == 2) {
                vm.serviceDetail.calMonth = Math.floor(vm.serviceDetail.days/30);
                vm.serviceDetail.calDay = vm.serviceDetail.days%30;
            }
        }

        //刷新(除消费的刷新)
        function refresh(requirementId) {
            requirementService.refresh(sessionId, requirementId).then(function () {
                alert("刷新成功")
            }, function (error) {
                errorService.processError(error);
            })
        }

        //消费的店铺刷新
        function shopRefresh() {
            shopService.refresh(sessionId, vm.shopId).then(function () {
                alert("刷新成功")
            }, function (error) {
                errorService.processError(error);
            })
        }

        //放弃服务
        function abort() {
            serviceService.abort(sessionId, cssId).then(function () {
                alert("已放弃服务");
                getServiceDetail();
            }, function (error) {
                errorService.processError(error);
            })
        }

        //展示图片
        // function showPic(img){
        //
        // }

        //取消放弃服务
        function cancelAbort() {
            serviceService.cancelAbort(sessionId, cssId).then(function () {
                alert("取消放弃服务成功");
                getServiceDetail();
            }, function (error) {
                errorService.processError(error);
            })
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

        function addServiceHistory(isValid) {
            vm.historySubmited = true;
            if(!isValid) {
                return;
            }
            serviceHistoryService.add(sessionId, serviceId, vm.historyContent).then(function (result) {
                vm.serviceHistoryId = result;
                angular.element(document.querySelector(".history-content")).val("");
                getServiceHistoryList();
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

        function addServiceRemark(isValid) {
            vm.remarkSubmited = true;
            if(!isValid) {
                return;
            }
            serviceRemarkService.add(sessionId, serviceId, vm.remark).then(function (result) {
                vm.serviceRemarkId = result;
                angular.element(document.querySelector(".remark-content")).val("");
                getServiceRemarklist();
            }, function (error) {
                errorService.processError(error);
            })
        }

        function clearCurrentPage() {
            vm.remarkCurrentPage = 1;
            vm.historyCurrentPage = 1;
        }

        function take(serviceId) {
            serviceService.take(sessionId, serviceId).then(function(result) {
                utilService.showPrompt("领取服务成功，请在我的服务中进行服务");
                cssId = result;
                getServiceDetail();
                // $location.path("/serviceDetail/:serviceId/:active/:cssId/" + businessId);
                // $location.path("/serviceDetail/" + serviceId + "/0" + "/" + );

            }).catch(function (error) {
                errorService.processError(error);
            })
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

        /*leo long 2016-6-23*/
        function addAchievement(){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/partial/addAchievement.html',
                controllerAs: 'vm',
                controller: 'addAchievementController',
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/AddAchievementController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }],
                    contractId:function(){return vm.serviceDetail.contractId;}
                }
            });
            modalInstance.result.then(function (result) {
            }, function () {

            });


        }

        function getUserInfo() {
            var userId = authService.getSession().id;
            vm.userId = userId;
             console.log("userId", userId);
            userService.getUserInfo(sessionId, userId).then(function (result) {
                vm.userType = result.userType;
            }).catch(function (error) {
                errorService.processError(error);
            })
        }

        function promptSubmit() {
            console.log(vm.tabType, "vm.tabType");
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
