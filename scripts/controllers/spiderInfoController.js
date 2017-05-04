/**
 * Created by Administrator on 2017/3/9.
 */
define([
    'angular',
    '../services/SpiderInfoService',
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
], function(angular) {

    'use strict';

    return angular.module('xwWeb')
        .registerController('spiderInfoController', ['CONFIG', 'spiderInfoService', 'baseDataService', 'authService', 'serviceService', 'errorService', 'districtService', 'industryService', 'cityService', 'requirementService', 'serviceHistoryService', 'serviceRemarkService', '$window', 'paginationService', '$uibModal', '$stateParams', 'utilService', spiderInfoController]);

    function spiderInfoController(CONFIG, spiderInfoService, baseDataService, authService, serviceService, errorService, districtService, industryService, cityService, requirementService, serviceHistoryService, serviceRemarkService, $window, paginationService, $uibModal, $stateParams, utilService) {
        var sessionId = authService.getSessionId();
        var vm = this;

        vm.currentPage = 1; //必须是1，插件会自动调用当前页数来显示
        vm.pageSize = CONFIG.pageSize;
        vm.cityId = authService.getCityId();//获取当前城市
        vm.list=[];
        vm.totalCount=0;

        vm.cityIdName = vm.cityId;
        vm.sourceSelect = [{
            "value": 0,
            "name": "全部"
        }, {
            "value": 1,
            "name": "58"
        },{
            "value": 2,
            "name": "赶集"
        },{
            "value": 3,
            "name": "百姓"
        }];
        vm.source = 0; //默认全部
        vm.typeSelect = [{
            "value": 0,
            "name": "全部"
        }, {
            "value": 1,
            "name": "店铺转让"
        },{
            "value": 2,
            "name": "出租招商"
        },{
            "value": 3,
            "name": "找店"
        }];
        vm.type=0; //默认全部

        vm.query=query;
        vm.cityChanged=cityChanged;
        vm.sourceChanged=sourceChanged;
        vm.typeChanged=typeChanged;
        vm.detail=detail;
        vm.querybutton = querybutton;
        ///////////////////////

        init();

        function init() {
            //initialize query params
            vm.cityselect=districtService.getCityName();         //获取城市
            query();                         //查询数据
        }

        function querybutton() {
            vm.currentPage = 1;
            query();
        }

        function query() {
            var queryParam = {
                cityId : vm.cityId,
                source : vm.source,
                type : vm.type
            };
            spiderInfoService.querySpiderInfo(sessionId,queryParam,vm.currentPage-1,vm.pageSize).then(
                function (result) {
                        vm.list=result.objects;
                        vm.totalCount = result.totalCount;
                        console.log(vm.list,"list");
                        console.log(queryParam,"queryParam")
                },
                function () {

                })
        }

        // $window.onpopstate = function () {
        //     // 获得存储在该历史记录点的currentPage对象
        //     var currentPage = $window.history.state;
        //
        //     if (currentPage == null) {
        //         vm.currentPage = 1;
        //     } else {
        //         vm.currentPage = currentPage.currentPage;
        //     }
        //     if(vm.isIdentify)
        //         query()
        // };

        function cityChanged(cityId) {
            vm.cityId=cityId;
            console.log(vm.cityId)
        }

        function sourceChanged(source) {
            vm.source = source;
        }

        function typeChanged(type) {
            vm.type = type;
        }



        function detail(index) {
            console.log(vm.list[index].detail,"list");
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/partial/detailInfo.html',
                controllerAs: 'vm',
                controller: 'detailInfoController',
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/DetailInfoController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }],
                    data: function () {
                        return vm.list[index].detail;
                    }

                }
            });
            modalInstance.result.then(function () {
                modalInstance.dismiss();
            }, function () {

            });
        }
    }
});
