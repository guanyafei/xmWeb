/**
 * Created by leo long on 2016/6/22.
 */
define([
	'angular',
	'../services/AuthService',
	'../services/ErrorService',
	'../services/ResourceService',
	'../services/RecommendService',
	'../services/OpportunityService',
	'../services/RequirementService',
    '../services/UtilService'
], function(angular) {
	return angular.module('xwWeb')
		.registerController('platformRecommendController', ['$scope', '$location','$window','utilService','requirementService','OpportunityService', '$uibModal', 'recommendService', 'resourceService','$stateParams', 'CONFIG', 'authService', 'errorService', platformRecommendController]);

	function platformRecommendController($scope, $location,$window,utilService,requirementService,OpportunityService, $uibModal, recommendService, resourceService, $stateParams, CONFIG, authService, errorService) {
		var sessionId = authService.getSessionId();
		var vm = this;
		vm.currentPage = 1;
		vm.pageSize = 30;
		vm.resourceList = [];
        vm.serviceId = $stateParams.serviceId ? $stateParams.serviceId : 0;
        vm.oppId = $stateParams.oppId ? $stateParams.oppId : 0;
        vm.pluginId = $stateParams.pluginId;
        vm.type = 1;
        vm.totalCount = 0;
        vm.formWarning = false;
        vm.warningContent = "";
        vm.keyword = "";
        vm.recommendType = 'service';

		vm.showDetail = showDetail;
		vm.confirmRecord = confirmRecord;
		vm.hideDetail = hideDetail;
        vm.changeType = changeType;
        vm.search = search;
        vm.flipPage = flipPage;
        vm.recommend = recommend;
        vm.enterSearch = enterSearch;//回车键搜索
        vm.accuseAdd = accuseAdd; //举报

		init();

		function init() {
            if(vm.serviceId == 0) vm.recommendType = 'opp';
            $window.history.pushState({"currentPage": vm.currentPage}, '', $location.absUrl());
			getResourceList();
		}

        function changeType(type){
            vm.type = type;
            vm.currentPage = 1;
            vm.keyword = "";
            vm.formWarning = false;
            getResourceList();
        }

		function getResourceList() {
            if(vm.pluginId == 'xw:transfer') {
                if(vm.recommendType == 'service')
                    resourceService.matchSitingBySystem(sessionId,vm.serviceId, vm.type, vm.currentPage-1,vm.pageSize).then(function (data) {
                        initList(data);
                    }, function (error) {
                        console.info(error);
                    });
                else
                    requirementService.matchSiting(sessionId,vm.oppId,vm.currentPage-1,vm.pageSize).then(function(data){
                        initList(data);
                    },function(error){
                        errorService.processError(error);
                    });

            }else{
                if(vm.recommendType == 'service')
                    resourceService.matchTransferBySystem(sessionId, vm.serviceId, vm.type, vm.currentPage-1,vm.pageSize).then(function (data) {
                        initList(data);
                    }, function (error) {
                        console.info(error);
                    });
                else
                    requirementService.matchTransfer(sessionId,vm.oppId,vm.currentPage-1,vm.pageSize).then(function(data){
                        initList(data);
                    },function(error){

                    });
            }
		}

        function initList(data){
            vm.resourceList = data['objects'];
            vm.totalCount = data['totalCount'];
            for (var i in vm.resourceList) {
                vm.resourceList[i]['showDetail'] = false;
                vm.resourceList[i]['recommended'] = false;
            }
        }

		function showDetail(index) {
			vm.resourceList[index]['showDetail'] = true;
			if (vm.resourceList[index]['detail']) return;
            if(vm.recommendType == 'service')
                OpportunityService.getInfo(sessionId,vm.resourceList[index]['id']).then(function(data) {
                    vm.resourceList[index]['detail'] = data;
                    vm.info = data;
                }, function(error) {
                });
            else
                requirementService.getInfo(vm.resourceList[index]['id']).then(function(data) {
                    vm.resourceList[index]['detail'] = data;
                    vm.info = data;
                }, function(error) {
                    console.info(error);
                });
		}

		function hideDetail(index) {
			vm.resourceList[index]['showDetail'] = false;
		}

        function search(){
            var resourceId = 0;
            var mobile = "";
            if (vm.keyword == "" || !vm.keyword) {getResourceList(); return;}

            //判断是资源id还是手机号码
            if (vm.keyword.toString().length == 11)
                mobile = vm.keyword.toString();
            else
                resourceId = vm.keyword;

            vm.totalCount = 0;
            vm.resourceList = [];
            if(vm.recommendType == 'service'){
                if(vm.pluginId == 'xw:transfer'){
                    resourceService.searchSiting(sessionId,resourceId,mobile).then(function(data){
                        if(data) {
                            vm.totalCount = 1;
                            vm.resourceList.push(data);
                        }
                    },function(error){
                        vm.totalCount = 0;
                    });
                }else{
                    resourceService.searchTransfer(sessionId,resourceId,mobile).then(function(data){
                        if(data) {
                            vm.totalCount = 1;
                            vm.resourceList.push(data);
                        }
                    },function(error){
                        vm.totalCount = 0;
                    });
                }
            }else{
                if(vm.pluginId == 'xw:transfer'){
                    requirementService.searchSiting(sessionId,resourceId,mobile).then(function(data){
                        if(data) {
                            vm.totalCount = 1;
                            vm.resourceList.push(data);
                        }
                    },function(error){
                        vm.totalCount = 0;
                    });
                }else{
                    requirementService.searchTransfer(sessionId,resourceId,mobile).then(function(data){
                        if(data) {
                            vm.totalCount = 1;
                            vm.resourceList.push(data);
                        }
                    },function(error){
                        vm.totalCount = 0;
                    });
                }
            }
        }

        function enterSearch(e){
            var event = e || window.event;
            if(event.keyCode == 13){
                search();
            }
        }

        function recommend(index){
            var serviceId = vm.recommendType == 'opp' ? vm.resourceList[index]['detail']['serviceId'] : vm.serviceId;
            var resourceId = vm.recommendType == 'service' ? vm.resourceList[index]['id'] : vm.oppId;

            console.info(serviceId);
            console.info(resourceId);

            recommendService.add(sessionId,resourceId,serviceId).then(function(){
                vm.resourceList[index]['recommended'] = true;
            },function(error){
                utilService.showPrompt(error.code);
            });
        }

        function flipPage() {
            vm.resourceList = [];
            $window.history.pushState({"currentPage": vm.currentPage}, '', $location.absUrl());
            getResourceList();
        }

        $window.onpopstate = function () {
            // 获得存储在该历史记录点的currentPage对象
            var currentPage = $window.history.state;

            if (currentPage == null) {
                vm.currentPage = 1;
            } else {
                vm.currentPage = currentPage.currentPage;
            }
            getResourceList();
        };


		/*add record window*/
		function confirmRecord(resource) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/partial/add-record.html',
				controllerAs: 'vm',
				controller: 'AddRecordController',
				resolve: {
					loadController: ['$q', function($q) {
						var deferred = $q.defer();
						require(["controllers/add-record.controller"], function() {
							deferred.resolve();
						});
						return deferred.promise;
					}],
					resource: function() {
						return resource;
					}
				}
			});
			modalInstance.result.then(function(result) {}, function() {

			});
		}

        function accuseAdd(oppId) {
            console.log(oppId, "oppId");
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/partial/accuseInfo.html',
                controllerAs: 'vm',
                controller: 'accuseController',
                scope: $scope,
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/AccuseController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }],
                    oppId: function () {
                        return oppId;
                    }
                }
            });
            modalInstance.result.then(function () {
                modalInstance.dismiss();
            }, function () {
                console.log("举报发生返回错误");
            });
        }
	}
});
