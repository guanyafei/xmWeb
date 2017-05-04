/**
 * Created by Leo Long on 2016/4/19.
 */
'use strict';
define([
    'angular',
    '../services/AuthService',
    '../services/OpportunityService',
    '../services/ErrorService',
    '../services/BusinessService',
    '../services/IndustryService',
    '../services/UserService',
    '../services/DistrictService',
    '../services/AccuseService',
    '../services/UtilService',
    '../services/deadData.service',
    '../services/baseData.service'
], function (angular) {

    BusinessHallController.$inject = ['baseDataService','deadDataService', '$stateParams','$rootScope','districtService','industryService','$location','$window','CONFIG', "$cookies", "$uibModal", "userService", "businessService", "authService", "OpportunityService", "errorService", '$scope', 'accuseService', 'utilService'];

    return angular.module('xwWeb')
        .registerController('BusinessHallController', BusinessHallController);

    function BusinessHallController(baseDataService,deadDataService, $stateParams,$rootScope,districtService,industryService,$location,$window,CONFIG, $cookies, $uibModal, userService, businessService, authService, OpportunityService, errorService, $scope, accuseService, utilService) {
        var cityId = authService.getCityId();
        var sessionId = authService.getSessionId();
        var user = $cookies.getObject(sessionId);
        var vm = this;
        vm.cityId = authService.getCityId();  //用于平台推荐传值


        //init basic params
        vm.defaultPicUrl = CONFIG.businessDetailDefaultPic;
        vm.list = [];
        vm.pluginId = "xw:"+$stateParams.pluginId;
        vm.validity = -1;//商机状态
        vm.keyword = "";
        vm.idnum = "";
        vm.industryId = "";
        vm.smallIndustryId = "";
        vm.districtId = "";
        vm.businessAreaId = "";
        vm.industry = [];
        vm.smallIndustry = [];
        vm.district = [];
        vm.businessArea = [];
        vm.publishDateStart = "";
        vm.publishDateStartCollaspse = false;
        vm.publishDateEnd = "";
        vm.publishDateEndCollaspse = false;
        vm.isFlip = false;
        vm.currentResult = "query";
        vm.areaDisable = true;
        vm.queryType = "0"; //给默认值，一开始有默认选项

        vm.queryParams = {industryId:0,districtId:0,minArea:-1,maxArea:-1};

        //page params
        vm.pageSize = CONFIG.pageSize;
        vm.pageNo = 0;
        vm.currentPage = 1;
        vm.totalCount = 0;

        vm.rentMeasureSelect = deadDataService.getRentMeasureSelect();


        //warning params
        vm.isIdentify = false;
        vm.showWarning = false;
        vm.e_num=false;
        vm.warning = "需要通过了身份认证的，才可以查看业务大厅。";
        vm.queryDateMsg = "";
        vm.queryAreaMsg = "";


        vm.pageFlip = pageFlip;//翻页
        vm.collect = collect;//领取商机
        vm.addRemark = addRemark;//添加备注
        vm.enterPress = enterPress;//回车搜索
        vm.eKey=eKey,//输入为字母时做处理
        vm.loadSmallIndustries = loadSmallIndustries;//获取所有行业
        vm.loadModifySmallIndustries = loadModifySmallIndustries; //获取分物业和经营的行业
        vm.loadBusinessAreas = loadBusinessAreas;
        vm.loadTableBusinessAreas = loadTableBusinessAreas;
        vm.fireQueryOrSearch = fireQueryOrSearch;//查询，搜索发起
        vm.accuseAdd = accuseAdd;//举报
        vm.modify = modify;//业务大厅对每个业务的方便修改
        vm.updateOppo = updateOppo;//更新商机
        vm.loadFitSmallIndustries = loadFitSmallIndustries;//获取适合经营的所有行业

        ////////////////////////////////////////////////

        function getCityLetterByCityCode(cityCode) {
            vm.cities = baseDataService.getCityByPinyin();
            for(var cityitem in vm.cities){
                for(var i=0;i<vm.cities[cityitem].length;i++){
                    if(vm.cities[cityitem][i].code==cityCode){
                        return vm.cities[cityitem][i].pinyin;
                    }
                }
            }
        }

        vm.cityLetter=getCityLetterByCityCode(vm.cityId);

        init();

        function init() {
            //initialize query params
            vm.industry = industryService.getIndustries();
            vm.fitIndustry = industryService.getIndustries();
            vm.district = districtService.getDistricts(cityId);
            if(vm.pluginId != 'xw:transfer' && vm.pluginId != 'xw:siting')
                vm.areaDisable = false;
            else
                vm.areaDisable = true;

            //confirm identity, cant use business hall without identity validation
            userService.getUserInfo(sessionId, user.id).then(function (result) {
                    var verify = result['certificates'];
                    if (verify.length == 0) {
                        vm.showWarning = true;
                    } else {
                        for (var i = 0; i < verify.length; i++) {
                            if (verify[i] == 5) {
                                $window.history.pushState({"currentPage": vm.currentPage}, '', $location.absUrl());
                                query(true);
                                vm.isIdentify = true;
                            } else if (i == verify.length - 1) {
                                vm.showWarning = true;
                            }
                        }
                    }
                },
                function (error) {
                    errorService.processError(error);
                });
        }

        //fetch subindustries accord to industry id 查询的行业，部分经营或者物业
        function loadSmallIndustries(industryId){
            vm.smallIndustry = industryService.getSmallIndustries(industryId);
            vm.smallIndustryId = "";
        }

        function loadFitSmallIndustries(industryId){
            vm.fitSmallIndustry = industryService.getSmallIndustries(industryId);
            vm.fitSmallIndustryId = "";
        }

        //修改的行业，分经营和物业
        function loadModifySmallIndustries(industryId, pluginId, obj){
            vm.smallModifyIndustry = industryService.getSmallIndustries(industryId, pluginId);
            obj.industryId = vm.smallModifyIndustry[0].code;
        }

        function loadBusinessAreas(districtId){
            vm.businessArea = districtService.getBusinessAreas(districtId);
            vm.businessAreaId = "";
        }

        function loadTableBusinessAreas(districtId, obj){
            vm.tableBusinessArea = districtService.getBusinessAreas(districtId);
            obj.businessId = "";
        }

        //fire search by pressing enter
        function enterPress(e){
            var event = e || window.event;
            if(event.keyCode == 13){
                fireQueryOrSearch('search');
            }
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

        //search function
        function search() {

           var queryParams={
             /*   "key":vm.keyword,
                oppId:parseInt(vm.idnum)*/
            };
            if(vm.keyword!="")
            {
                queryParams["key"]=vm.keyword;
            }
            if(vm.idnum!="" && vm.idnum!=null)
            {
                queryParams["oppId"]=parseInt(vm.idnum);
            }
            if(vm.keyword=="" && (vm.idnum=="" || vm.idnum==null) )
            {
                queryParams["key"]="";
            }

            console.log("search_text:",queryParams);
            OpportunityService.search(sessionId,queryParams,vm.currentPage-1,vm.pageSize).then(function(result){
                vm.list = [];
                vm.totalCount = result['totalCount'];
                    console.log("result",result);
                if( vm.totalCount == 0){
                    vm.warning = "没有搜索到结果";
                    vm.showWarning = true;
                }

                var items = result["objects"];
                for (var i = 0; i < result["objects"].length; i++) {
                    items[i].bigIndustry = parseInt(items[i].industryId.toString().substr(0,2));
                    items[i].cost = items[i].cost/1000000;
                    items[i].rent = items[i].rent/100;
                    items[i].minRent = items[i].minRent/100;
                    items[i].maxRent = items[i].maxRent/100;

                    if(items[i].pluginId == 'xw:transfer'){
                        items[i].transferType == 1 ? items[i].tramsferStatus = '类型：店铺转让' : items[i].tramsferStatus = '类型：出租招商';
                    }

                    if(items[i].pluginId == 'xw:siting') {
                        var arr = [], address = '';
                        arr = items[i].districtName.split("、");
                        for(var j = 0,len = arr.length; j < len; j ++) {
                            if(j === 0) {
                                address += arr[j];
                            } else {
                                address += "、" + arr[j].replace(items[i].cityName, "");
                            }
                        }
                        items[i].districtName = address;

                    }
                    vm.list.push(result["objects"][i]);
                }
            },function(error){
                console.log("error",error);
                errorService.processError(error);
            });
        }

        //query functions
        function query(valid){
            vm.submitted = true;
            if(!valid) {
                return;
            }
            var validation = true;
            vm.queryDateMsg = "";
            vm.queryAreaMsg = "";

            if(vm.publishDateEnd < vm.publishDateStart && vm.publishDateStart != '' && vm.publishDateEnd != ''){
                validation = false;
                vm.queryDateMsg = "结束时间不能小于开始时间！";
            }

            if(vm.maxArea || vm.minArea || vm.minArea == 0 || vm.maxArea == 0){
                    if(vm.maxArea < vm.minArea && vm.maxArea){
                        validation = false;
                        vm.queryAreaMsg = "最小面积不能大于最大面积！";
                    }
                if((vm.minArea < 1 && vm.minArea) || (vm.maxArea < 1 && vm.maxArea) || vm.minArea == 0 || vm.maxArea == 0){
                    validation = false;
                    vm.queryAreaMsg = "面积不能小于1！";
                    }
                if(vm.maxArea > 999999999 || vm.minArea > 999999999){
                    validation = false;
                    vm.queryAreaMsg = "面积不能大于999999999！";
                }
            }



            vm.queryParams.maxArea = vm.maxArea ? vm.maxArea : 99999999;
            vm.queryParams.minArea = vm.minArea ? vm.minArea : 1;

            vm.publishDateStart ? vm.queryParams.startTime = dateFormat(vm.publishDateStart) : delete vm.queryParams['startTime'];
            vm.publishDateEnd ? vm.queryParams.endTime = dateFormat(vm.publishDateEnd) : delete vm.queryParams['endTime'];

            if(vm.pluginId == "xw:siting" || vm.pluginId == "xw:transfer") {

                if(vm.minRent || vm.maxRent || vm.minArea == 0 || vm.maxArea == 0){
                    if(vm.maxRent < vm.minRent && vm.maxRent){
                        vm.maxRent = 999999.99;
                    }
                }
                vm.queryParams.minRent = vm.minRent ? vm.minRent * 100 : 0;
                vm.queryParams.maxRent = vm.maxRent ? vm.maxRent * 100: 999999.99 * 100;
                //如果最小租金大于最大租金则自动设置最大租金为最大值

                if( vm.pluginId == "xw:transfer") {
                    vm.queryParams.transferType = vm.queryType ? parseInt(vm.queryType) : 0;
                    vm.queryParams.fitIndustryId = vm.fitSmallIndustryId ? vm.fitSmallIndustryId : vm.fitIndustryId ? vm.fitIndustryId : undefined;
                }
            }

            if(vm.pluginId != "xw:transfer") {
                vm.queryParams.type =  vm.pluginId;
            }

            vm.queryParams.mobile = vm.account ? vm.account : undefined;

            if(validation){
                if(vm.pluginId != 'xw:transfer') {
                    OpportunityService.query(sessionId,vm.queryParams,vm.currentPage-1,vm.pageSize).then(function(data){
                        vm.list = [];
                        vm.totalCount = data['totalCount'];
                        var items = data['objects'];

                        if( vm.totalCount == 0){
                            vm.warning = "没有搜索到结果";
                            vm.showWarning = true;
                        }

                        for(var i in items){
                            items[i].bigIndustry = parseInt(items[i].industryId.toString().substr(0,2));
                            items[i].cost = items[i].cost/1000000;
                            items[i].rent = items[i].rent/100;
                            items[i].minRent = items[i].minRent/100;
                            items[i].maxRent = items[i].maxRent/100;
                            items[i].zone = items[i].districtId.toString().length >= 6 ? parseInt(items[i].districtId.toString().substr(0,6)): 0;
                            items[i].businessId= items[i].districtId.toString().length >= 8 ? parseInt(items[i].districtId.toString().substr(0,8)): 0;
                            if(items[i].pluginId == 'xw:transfer'){
                                items[i].transferType == 1 ? items[i].tramsferStatus = '类型：店铺转让' : items[i].tramsferStatus = '类型：出租招商';
                            }
                            if(items[i].pluginId == 'xw:siting') {
                                var arr = [], address = '';
                                arr = items[i].districtName.split("、");
                                for(var j = 0,len = arr.length; j < len; j ++) {
                                    if(j === 0) {
                                        address += arr[j];
                                    } else {
                                        address += "、" + arr[j].replace(items[i].cityName, "");
                                    }
                                }
                                items[i].districtName = address;

                            }
                            vm.list.push(items[i]);
                        }
                    },function(error){
                        errorService.processError(error);
                    });
                } else {
                    OpportunityService.queryTransfer(sessionId,vm.queryParams,vm.currentPage-1,vm.pageSize).then(function(data){
                        vm.list = [];
                        vm.totalCount = data['totalCount'];
                        var items = data['objects'];

                        if( vm.totalCount == 0){
                            vm.warning = "没有搜索到结果";
                            vm.showWarning = true;
                        }

                        for(var i in items){
                            items[i].bigIndustry = parseInt(items[i].industryId.toString().substr(0,2));
                            items[i].cost = items[i].cost/1000000;
                            items[i].rent = items[i].rent/100;
                            items[i].minRent = items[i].minRent/100;
                            items[i].maxRent = items[i].maxRent/100;
                            items[i].zone = items[i].districtId.toString().length >= 6 ? parseInt(items[i].districtId.toString().substr(0,6)): 0;
                            items[i].businessId= items[i].districtId.toString().length >= 8 ? parseInt(items[i].districtId.toString().substr(0,8)): 0;
                            if(items[i].pluginId == 'xw:transfer'){
                                items[i].transferType == 1 ? items[i].tramsferStatus = '类型：店铺转让' : items[i].tramsferStatus = '类型：出租招商';
                            }
                            vm.list.push(items[i]);
                        }
                    },function(error){
                        errorService.processError(error);
                    });
                }

            }
        }

        //return database needed date format
        function dateFormat(date){
            var year = date.getFullYear();
            var month = parseInt(date.getMonth()+1)<10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
            var day = parseInt(date.getDate())<10 ? "0"+date.getDate() : date.getDate();
            return year+"-"+ month +"-"+ day +" 0:0:0";
        }

        //
        function fireQueryOrSearch(operation, valid){
            vm.currentPage = 1;
            vm.showWarning = false;
            vm.currentResult = operation;
            valid = valid ? valid : true;
            if(vm.currentResult == 'search'){
                search();
            }else{
                vm.queryParams = {
                    industryId : vm.smallIndustryId ? vm.smallIndustryId : (vm.industryId ? vm.industryId : 0),
                    districtId : vm.businessAreaId ? vm.businessAreaId : (vm.districtId ? vm.districtId : 0),
                };
                query(valid);
            }
        }

        function pageFlip() {
            vm.list = [];
            $window.history.pushState({"currentPage": vm.currentPage}, '业务大厅', $location.absUrl());
            if(vm.isIdentify)
            vm.currentResult == 'query'? query(true) : search();
        }

        $window.onpopstate = function () {
            // 获得存储在该历史记录点的currentPage对象
            var currentPage = $window.history.state;

            if (currentPage == null) {
                vm.currentPage = 1;
            } else {
                vm.currentPage = currentPage.currentPage;
            }
            if(vm.isIdentify)
                vm.currentResult == 'query'? query(true) : search();
        };


        function collect(oppId,pluginId,index) {
            vm.popupInfo = {
                title: "领取业务",
                content: "",
                note: "",
                red:"",
                button: []
            };//初始化弹窗内容

            businessService.take(sessionId, oppId).then(function (result) {
                vm.list[index].status = 1;
                vm.popupInfo.button = [{
                    text: "查看该业务",
                    url: "index.main.businessDetail({businessId:" + result + "})"
                },{
                    text:"留在当前页",
                    url:"index.main.businessHall"
                }];
                getQuota(pluginId);
                $rootScope.$emit('quotaChanged');

            }, function (error) {
                vm.popupInfo.content = "抱歉：业务领取失败！";
                console.log("error.code",error.code);
                switch (error.code) {
                    case -30996 :
                        vm.popupInfo.note = "原因：没有该类业务限额或限额已满，查看限额规则了解如何获得更多限额！";
                        vm.popupInfo.button = [
                            {
                            text: "立即查看限额规则",
                            url: "index.main.limitPolicy"},
                            {
                            text:"取消",
                            url:"index.main.businessHall"}];
                        break;
                    case -31198 :
                        vm.popupInfo.note = "原因：该业务已被别人抢先领取";
                        vm.list[index].status = 1;
                        vm.popupInfo.button = [{
                            text:"确定",
                            url:"index.main.businessHall"}];
                        break;
                    default :
                        vm.popupInfo.note = utilService.getHintForErrMesg(error.code);
                        vm.popupInfo.button = [{
                            text:"确定",
                            url:"index.main.businessHall"}];
                        break;
                }
            });

            var modalInstance = $uibModal.open({
                animation: true,
                size: "sm",
                templateUrl: 'views/partial/popup.html',
                controllerAs: 'vm',
                controller: 'popupController',
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/popupController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }],
                    info: function () {
                        return vm.popupInfo;
                    }
                }
            });
            modalInstance.result.then(function (result) {
            }, function () {

            });
        }

        //get quota
        function getQuota(pluginId){
            businessService.getQuota(sessionId).then(function (result) {
                vm.popupInfo.content = "恭喜您：领取业务成功！";
                vm.popupInfo.note = "您该类业务限额还有" + (result[pluginId]["total"] - result[pluginId]["get"]) + "个";
                vm.popupInfo.red = "font-red";
            }, function (error) {
                errorService.processError(error);
            });
        }

        function addRemark(oppId) {
            $scope.oppId = oppId;
            var modalInstance = $uibModal.open({
                animation: true,
                size: "lg",
                templateUrl: 'views/partial/oppRemark.html',
                controllerAs: 'vm',
                controller: 'oppRemarkController',
                scope: $scope,
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/oppRemarkController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }],
                    oppId: function () {
                        return oppId;
                    }
                }
            });
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

        //业务大厅对每个业务的方便修改
        function modify(obj) {
            obj.modify = !obj.modify;
            vm.modifyIndustry = industryService.getIndustries(vm.pluginId);
            vm.smallModifyIndustry = industryService.getSmallIndustries(obj.bigIndustry, vm.pluginId);
            vm.tableDistrict = districtService.getDistricts(cityId);
            vm.tableBusinessArea = districtService.getBusinessAreas(obj.zone);

        }

        function updateOppo(obj) {
            var contentParam = {}, clientType = 3;//更新商机显示clientType, android= 1,ios = 2, pc = 3;

            contentParam.area = obj.area;
            contentParam.rent = obj.rent * 100;
            contentParam.transferFee = obj.cost * 1000000;
            contentParam.minArea = parseInt(obj.minArea);
            contentParam.maxArea = parseInt(obj.maxArea);
            contentParam.minRent = obj.minRent * 100;
            contentParam.maxRent = obj.maxRent * 100;
            contentParam.industryId = obj.industryId;
            contentParam.rentMeasure = obj.rentMeasure;
            contentParam.districtId = obj.businessId ? obj.businessId : obj.zone;
            contentParam.title = obj.title;
            contentParam.contact = obj.contract;
            contentParam.description = obj.description;



            OpportunityService.update(sessionId, obj.id, contentParam, clientType).then(function (result) {
                obj.districtId =  contentParam.districtId; //不刷新页面，所以要修改当前对象的值。
                utilService.showPrompt("修改成功");
                obj.modify = false;
            }).catch(function (err) {
                errorService.processError(err);
            })
        }
    }
});
