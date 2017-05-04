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
    '../services/IndustryService',
    '../services/DistrictService',
	'../services/RequirementService',
    '../services/UtilService'
], function(angular) {
	return angular.module('xwWeb')
		.registerController('platformRecommendControllerfor', ['$scope', '$location','$window','utilService','requirementService','OpportunityService','industryService','districtService',  '$uibModal', 'recommendService', 'resourceService','$stateParams', 'CONFIG', 'authService', 'errorService', platformRecommendControllerfor]);

	function platformRecommendControllerfor($scope, $location,$window,utilService,requirementService,OpportunityService,industryService, districtService, $uibModal, recommendService, resourceService, $stateParams, CONFIG, authService, errorService) {

        var vm = this;
        var sessionId = authService.getSessionId();
        var cityId = $stateParams.cityId;
        vm.defaultPicUrl = CONFIG.postDefaultPic;
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.totalCount = 0;
        vm.exampleList = [];//案例列表
        vm.pluginId = $stateParams.pluginId;

        vm.pageNo="";
        vm.businessId = $scope.businessId;

        vm.e_num=false;

        vm.currentPage = 1;
        vm.pageSize = 30;
        vm.resourceList = [];
        vm.serviceId = $stateParams.serviceId ? $stateParams.serviceId : 0;
        vm.oppId = $stateParams.oppId ? $stateParams.oppId : 0;
        vm.pluginId = $stateParams.pluginId;
        vm.title = $stateParams.title;
        vm.type = 1;
        vm.totalCount = 0;
        vm.formWarning = false;
        vm.warningContent = "";
        vm.keyword = "";
        vm.recommendType = 'service';
        vm.orderbyrecom=2;
        vm.orderbyrecomSelected=[
            {
                'value':0,
                /*'name':"忠诚靠前星级倒序，时间倒序"*/
                "name":"发布时间倒序"
            },
            {
                'value':1,
                'name':"刷新时间倒序"
            },
            {
                'value':2,
                'name':"收费靠前，刷新时间倒序"
            },
            {
                'value':3,
                'name':"免费靠前，刷新时间倒序"
            }
        ];



        vm.industryId = "";
        vm.smallIndustryId = "";
        vm.districtId="";//区域id
        vm.minArea="";//最小面积 平米
        vm.maxArea="";//最大面积 平米
        vm.minRent="";//最小租金 元/月
        vm.maxRent="";//最大租金 元/月
        vm.orderby=0;

        vm.key="";
        vm.number="";
        vm.opportunityId="";

        vm.type=1;
        vm.typeSelected=[
            {
                "value":0,
                "name":"无"
            },
            {
                "value":1,
                "name":"平台推荐"
            },
            {
                "value":2,
                "name":"最新信息"
            },
            {
                "value":3,
                "name":"参考信息"
            }
        ];


        vm.loadSmallIndustries=loadSmallIndustries;//得到小行业
        vm.loadBusinessAreas=loadBusinessAreas;//得到小商圈

        vm.showDetail = showDetail;
        vm.confirmRecord = confirmRecord;
        vm.hideDetail = hideDetail;
        vm.changeType = changeType;
        vm.eKey=eKey,//输入为字母时做处理

        vm.flipPage = flipPage;
        vm.recommend = recommend;
        vm.enterSearch = enterSearch;//回车键搜索
        vm.accuseAdd = accuseAdd; //举报
        vm.queryList=queryList;
        vm.fireQueryOrSearch=fireQueryOrSearch;
        vm.search=search;//搜索按钮
        vm.querySitingTransfer=querySitingTransfer;//查询按钮
        vm.addOppExperiences=addOppExperiences;//体验推荐

        vm.query="init";//判断点击的是查询还是搜索
        vm.try_to_recomed=new Array();





        init();
        function  init(){
            console.log("title:",vm.title);
            vm.industry = industryService.getIndustries();
            vm.district = districtService.getDistricts(cityId);

            if(vm.serviceId == 0) vm.recommendType = 'opp';
            $window.history.pushState({"currentPage": vm.currentPage}, '', $location.absUrl());

            matchSitingTransfer();
          /*  getResourceList();*/
        }


        function getparams(){
            var params={

                orderby:vm.orderbyrecom//0:检索字段案例对应的商机的信息编号;1:创建时间倒序;2:创建时间顺序 必填
                /*serviceId:parseInt(vm.serviceId)*/
            }
            if(vm.industryId && vm.smallIndustryId)
            {
                params['industryId']=parseInt(vm.smallIndustryId);
            }

            if(vm.industryId && !vm.smallIndustryId)
            {
                params['industryId']=parseInt(vm.industryId);
            }
            if(vm.districtId && !vm.businessAreaId)
            {
                params['districtId']=parseInt(vm.districtId);
            }
            if(vm.districtId && vm.businessAreaId)
            {
                params['districtId']=parseInt(vm.businessAreaId);
            }
            if(vm.minArea && vm.maxArea)
            {
                params['minArea']=parseInt(vm.minArea);
                params['maxArea']=parseInt(vm.maxArea);
            }
            if(vm.maxArea && !vm.minArea )
            {
                params['minArea']=0;
                params['maxArea']=parseInt(vm.maxArea);
            }
            if(vm.minRent && vm.maxRent)
            {
                params['minRent']=parseInt(vm.minRent*100);
                params['maxRent']=parseInt(vm.maxRent*100);
            }
            if(vm.maxRent && !vm.minRent )
            {
                params['minRent']=0;
                params['maxRent']=parseInt(vm.maxRent*100);
            }
            if(vm.serviceId>0)
            {
                params['serviceId']=parseInt(vm.serviceId);
            }
            return params;
        }
        function getcondition(){
            var queryParams={};
            if((vm.keyword!="" && vm.keyword!=null) && (vm.idnum=="" || vm.idnum==null))
            {
                queryParams["mobile"]=vm.keyword.toString();
            }
            if((vm.idnum!="" && vm.idnum!=null) && (vm.keyword=="" || vm.keyword==null))
            {
                queryParams["opportunityId"]=parseInt(vm.idnum);
            }
            if(vm.idnum && vm.keyword)
            {
                queryParams["mobile"]=vm.keyword.toString();
                queryParams["opportunityId"]=parseInt(vm.idnum);
            }

            return queryParams;
        }

        function queryList(){
            var params=getparams();

            exampleService.queryExample(sessionId,cityId, vm.pluginId,params,  vm.currentPage - 1, vm.pageSize).then(function (result) {

                vm.totalCount = result.totalCount;
                vm.exampleList = result.objects;
                for(var i = 0, length = vm.exampleList.length; i < length; i ++ ) {
                    getSeviceDetail(vm.exampleList[i].serviceId, vm.exampleList[i]);
                    viewServiceAndEvaluate(vm.exampleList[i].serviceId, vm.exampleList[i]);
                }
            }, function (error) {
                errorService.processError(error);
            });
        }

        function changeType(type){
            vm.type = type;
            vm.currentPage = 1;
            vm.keyword = "";
            vm.formWarning = false;
            matchSitingTransfer();
        }

        //数字e做处理
        function eKey(e){
            var event =e || window.event;
            if(event.keyCode== 69)
            {
                vm.e_num=true;
            }else{
                vm.e_num=false;
            }
        }


        //fetch subindustries accord to industry id
        function loadSmallIndustries(industryId){
            vm.smallIndustry = industryService.getSmallIndustries(industryId);
            vm.smallIndustryId = "";
        }
        //小商圈
        function loadBusinessAreas(districtId){
            vm.businessArea = districtService.getBusinessAreas(districtId);
            vm.businessAreaId = "";
        }

        function matchSitingTransfer(){
            vm.query="init";
            var condition=getcondition();
            resourceService.matchSitingTransfer(sessionId,vm.oppId,vm.type,vm.currentPage-1,vm.pageSize).then(function (data) {
                console.log("1",data);
                initList(data);
            }, function (error) {
                console.info(error);
            });
        }

        //搜索按钮
        function search(isValid){
            if(isValid){
                vm.query="search";
                var searchParams=getcondition();
                resourceService.search(sessionId,vm.pluginId,searchParams,vm.currentPage-1,vm.pageSize).then(function (data) {
                    console.log("3",data);
                    initList(data);
                }, function (error) {
                    console.info(error);
                });
            }

        }


        //查询按钮
        function querySitingTransfer(isValid){

            if(!isValid || (vm.minArea && !vm.maxArea) || (vm.minRent && !vm.maxRent))
            {
                return;
            }
            vm.query="query";
            var queryParams=getparams();
            resourceService.querySitingTransfer(sessionId,cityId, vm.pluginId,queryParams,vm.currentPage-1,vm.pageSize).then(function (data) {
                console.log("2",data);
                initList(data);
            }, function (error) {
                console.info(error);
            });
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
            console.log("data:",data);

           /* console.info(data);*/
            vm.resourceList = data['objects'];

            vm.totalCount = data['totalCount'];
            for (var i in vm.resourceList) {
                vm.resourceList[i]['showDetail'] = false;
                vm.resourceList[i]['recommended'] = false;
                vm.try_to_recomed[i]=false;
            }
        }

        function showDetail(index) {

            vm.resourceList[index]['showDetail'] = true;
            if (vm.resourceList[index]['detail']) return;
            if(vm.resourceList[index]['pluginId']=='xw:siting')
            {
                resourceService.getSitingDetail(sessionId,vm.resourceList[index]['id']).then(function(data) {
                    vm.resourceList[index]['detail'] = data;
                }, function(error) {
                });
            }
            if(vm.resourceList[index]['pluginId']=='xw:transfer')
            {
                resourceService.getTransferDetail(sessionId,vm.resourceList[index]['id']).then(function(data) {
                    vm.resourceList[index]['detail'] = data;
                }, function(error) {
                });
            }


        }

        function hideDetail(index) {
            vm.resourceList[index]['showDetail'] = false;
        }

        function accuseAdd(oppId) {
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

        /*add record window*/
        function confirmRecord(resource) {
            console.log("resource:",resource);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/partial/add-recordfor.html',
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

        function fireQueryOrSearch(operation){
            vm.currentPage = 1;
            vm.showWarning = false;
            vm.currentResult = operation;
            if(vm.currentResult == 'search'){
                search();
            }
        }

        function addOppExperiences(index){
            OpportunityService.addOppExperiences(sessionId,vm.resourceList[index]['id'],parseInt(vm.serviceId)).then(function(data){
                vm.try_to_recomed[index]=true;
                console.log("vm.try_to_recomed[index]",vm.try_to_recomed[index]);
            },function(error){
                if(error.code=="-31180"){
                    $window.alert("已经超过免费体验的条数限制");
                }
                if(error.code=="-31181"){
                    $window.alert("信息已经购买或者已经免费");
                }
                if(error.code=="-31597"){
                    $window.alert("服务不存在");
                }
                if(error.code=="-31597"){
                    $window.alert("服务不存在");
                }
                if(error.code=="-31197"){
                    $window.alert("商机不存在");
                }
                if(error.code=="-31998"){
                    $window.alert("用户不存在");
                }
            });
        }

        function flipPage() {
            vm.resourceList = [];
            $window.history.pushState({"currentPage": vm.currentPage}, '', $location.absUrl());
           /* matchSitingTransfer();*/
            if(vm.query=="query"){
                querySitingTransfer(true);
            }else if(vm.query=="search"){
                search(true);
            }else{
                matchSitingTransfer();
            }
        }


    }
});
