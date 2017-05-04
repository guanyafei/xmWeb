/**
 * Created by Xiajingsi on 2016/6/17.
 */
define([
    'angular',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/ServiceService',
    '../services/DistrictService',
    '../services/IndustryService',
    '../services/PaginationService',
    '../services/UtilService'
], function(angular) {

    'use strict';

    return angular.module('xwWeb')
        .registerController('serviceHallController', ['CONFIG', 'authService', 'serviceService', 'errorService', 'districtService', 'industryService', '$window', 'paginationService', '$uibModal', '$stateParams','utilService', 'userService', '$cookies', serviceHallController]);

    function serviceHallController(CONFIG, authService, serviceService, errorService, districtService, industryService, $window, paginationService, $uibModal, $stateParams, utilService, userService, $cookies) {
        var sessionId = authService.getSessionId();
        var vm = this;
        var pageFlag = false;

        //基本参数
        var user = $cookies.getObject(sessionId);
        vm.allPluginId = "all:all";
        vm.transferPluginId = "xw:transfer";
        vm.sitingPluginId = "xw:siting";
        vm.recruitmentPluginId = "xw:recruitment";
        vm.reservationPluginId = "xw:reservation";
        vm.submitted = false;
        vm.districtsSelect = [];
        vm.isIdentify = false;
        vm.showWarning = false;
        vm.keywords = '';


        //查询参数
        vm.currentPage = 1; //必须是1，插件会自动调用当前页数来显示
        vm.pageSize = CONFIG.pageSize;
        var pluginId, districtParam,  industryIdParam;
        var cityId = authService.getCityId();
        vm.serviceHallQueryCriteria = 'query';

        //默认状态为服务中
        vm.pluginIdSelect = [{
            "value": "all:all",
            "name": "类型"
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
        vm.industryId = "0"; //行业，0表示全部
        vm.districtId = "0"; //区域，0表示全部,字符串类型要与select里面的数据对应。
        vm.businessAreaId = "0";
        vm.smallIndustryId = "0";

        vm.orderBySelect = [{
            "value": "1",
            "name": "签约时间倒序"
        }, {
            "value": "2",
            "name": "结束时间倒序"
        }];

        vm.orderBy = "1"; //默认按最近签约

        //查询结果
        vm.totalCount = 0;
        vm.numPages = 1;
        vm.serviceList = [];

        //向外部提供的方法
        vm.loadSmallIndustries = loadSmallIndustries; //获取小行业
        vm.loadBusinessAreas = loadBusinessAreas; //获取商圈
        vm.serviceHallSearch = serviceHallSearch; //无表单验证，无浏览器回退记录
        vm.serviceHallSearchBySearch = serviceHallSearchBySearch; //搜索条用的获取服务列表方法,不记录浏览器回退,有表单验证
        vm.pageFlip = pageFlip; //添加无刷新改链接后的获取服务列表方法,记录浏览器回退
        vm.take = take;//领取服务

        loadIndustries(); //加载行业
        loadDistricts(cityId); //加载商圈




        ///////////////////////

        init();

        function init() {
            //initialize query params
            vm.industry = industryService.getIndustries();
            vm.district = districtService.getDistricts(cityId);

            //confirm identity, cant use business hall without identity validation
            userService.getUserInfo(sessionId, user.id).then(function (result) {
                    var verify = result['certificates'];
                    if (verify.length == 0) {
                        vm.showWarning = true;
                    } else {
                        for (var i = 0; i < verify.length; i++) {
                            if (verify[i] == 5) {
                                vm.isIdentify = true;
                                pageFlip(); //获取服务列表，同分页的一样
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

        function serviceHallSearchBySearch(valid) {
            vm.submitted = true;
            if (!valid) {
                return;
            }
            pageFlag = true;
            serviceHallSearch(serviceHallQueryCriteria);
        }

        function pageFlip() {
            paginationService.paginationPushStatus(vm.currentPage, '我的服务');
            serviceHallSearch(vm.serviceHallQueryCriteria);
        }

        function serviceHallSearch(serviceHallQueryCriteria) {
            vm.serviceHallQueryCriteria = serviceHallQueryCriteria;
            pluginId = vm.pluginId;

            //可选择大行业
            if (parseInt(vm.smallIndustryId) && vm.smallIndustryId != 0) {
                industryIdParam = parseInt(vm.smallIndustryId);
            } else if (parseInt(vm.industryId) && vm.industryId != 0) {
                industryIdParam = parseInt(vm.industryId);
            } else {
                industryIdParam = 0;
            }

            if (parseInt(vm.businessAreaId) && vm.businessAreaId != 0) {
                districtParam = parseInt(vm.businessAreaId);
            } else if (parseInt(vm.districtId) && vm.districtId != 0) {
                districtParam = parseInt(vm.districtId);
            } else {
                districtParam = cityId;
            }

            if (serviceHallQueryCriteria == "search") {
                pluginId = 'all:all';
                industryIdParam = 0;
                districtParam = cityId;
            } else if (serviceHallQueryCriteria == "query") {
                vm.keywords = '';
            } else {

            }

            serviceService.serviceHallSearch(sessionId, pluginId, industryIdParam, districtParam, vm.keywords, parseInt(vm.orderBy), vm.currentPage - 1, vm.pageSize).then(function(result) {
                vm.serviceList = result["objects"];
                vm.totalCount = result.totalCount;
            }, function(error) {
                errorService.processError(error);
            })

        }

        function loadIndustries() {
            vm.industriesSelect = industryService.getIndustries();
        }

        function loadSmallIndustries(industryId) {
            vm.smallIndustriesSelect = industryService.getSmallIndustries(industryId);
        }

        function loadDistricts(cityId) {
            vm.districtsSelect = districtService.getDistricts(cityId);
            //vm.districtsSelect.unshift({"c": "0", "n": "全部"})
        }

        function loadBusinessAreas(districtId) {
            vm.businessAreasSelect = districtService.getBusinessAreas(districtId);
            //vm.businessAreasSelect.unshift({"c": "0", "n": "全部"})
        }



        //浏览器后退触发事件
        $window.onpopstate = function() {
            // 获得存储在该历史记录点的currentPage对象
            var currentPage = $window.history.state;
            if (currentPage == null) {
                vm.currentPage = 1;
            } else {
                vm.currentPage = currentPage.currentPage;
            }

            //点击sidebar的条目，如果访问过则触发的浏览器后退事件。
            if(vm.isIdentify) {
                serviceHallSearch();
            }
        };

        /***********刘开2016-06-03******************************/
        /**
         * 客服领取服务
         *
         * @param sessionId  客服session
         * @param serviceId  服务Id
         * @return           客服服务ID
         */

        function take(myService) {

            var serviceId = myService.id;
            var serviceObjIndex;
            for (var i = 0, length = vm.serviceList.length; i < length; i ++ ) {
                if(myService.id == vm.serviceList[i].id) {
                    serviceObjIndex = i;
                }
            }
            serviceService.take(sessionId, serviceId).then(
                function() {
                    utilService.showPrompt("领取服务成功，请在我的服务中进行服务");
                    vm.serviceList.splice(serviceObjIndex, 1);
                },
                function(error) {
                    errorService.processError(error);
                }
            )
        }

        /***********************************************************/
    }
});

var foo= (function() {
    var secret = "secrect";
    return {
        get_secret: function () {
            return secret;
        },
        new_secret: function (new_secret) {
            // 通过定义的接口来修改 secret
            secret = new_secret;
        }
    }
}());

var foo = ( function() {
    var secret = 'secret';
    // “闭包”内的函数可以访问 secret 变量，而 secret 变量对于外部却是隐藏的
    return {
        get_secret: function () {
            // 通过定义的接口来访问 secret
            return secret;
        },
        new_secret: function ( new_secret ) {
            // 通过定义的接口来修改 secret
            secret = new_secret;
        }
    };
} () );



var foo = ( function() {
    var secret = 'secret';
    // “闭包”内的函数可以访问 secret 变量，而 secret 变量对于外部却是隐藏的
    return {
        get_secret: function () {
            // 通过定义的接口来访问 secret
            return secret;
        },
        new_secret: function ( new_secret ) {
            // 通过定义的接口来修改 secret
            secret = new_secret;
        }
    };
} () );


var foo = ( function() {
    var secret = 'secret';
    // “闭包”内的函数可以访问 secret 变量，而 secret 变量对于外部却是隐藏的
    return {
        get_secret: function () {
            // 通过定义的接口来访问 secret
            return secret;
        },
        new_secret: function ( new_secret ) {
            // 通过定义的接口来修改 secret
            secret = new_secret;
        }
    };
} () );


