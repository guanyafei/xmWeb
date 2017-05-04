/**
 * Created by Administrator on 2017/1/9.
 */
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
    '../services/AdvertisementService',
    '../services/PaginationService',
    '../services/UtilService'
], function(angular) {

    'use strict';

    return angular.module('xwWeb')
        .registerController('aboutAdsController', ['CONFIG', 'authService', 'serviceService', 'errorService', 'districtService', 'industryService','AdvertisementService', '$window', 'paginationService', '$uibModal', '$stateParams','utilService', 'userService', '$cookies', aboutAdsController]);

    function aboutAdsController(CONFIG, authService, serviceService, errorService, districtService, industryService,AdvertisementService, $window, paginationService, $uibModal, $stateParams, utilService, userService, $cookies) {
        var sessionId = authService.getSessionId();
        var vm = this;
        var pageFlag = false;

        //基本参数
        var user = $cookies.getObject(sessionId);

        //查询参数
        vm.currentPage = 1; //必须是1，插件会自动调用当前页数来显示
        vm.pageSize = CONFIG.pageSize;
        vm.cityId = authService.getCityId();//获取当前城市


        //默认状态为服务中
        //vm.cityId=1101;
        vm.cityIdName=vm.cityId;
        vm.channelSelect = [{
            "value": "11",
            "name": "首页"
        }, {
            "value": "12",
            "name": "转店频道"
        }, {
            "value": "13",
            "name": "招租频道"
        }, {
            "value": "14",
            "name": "找店频道"
        }, {
            "value": "15",
            "name": "消费频道"
        }, {
            "value": "16",
            "name": "招聘频道"
        }, {
            "value": "17",
            "name": "经营频道"
        }];
        vm.channel = "12";
        vm.channelName="12";


        //向外部提供的方法
        vm.query=query;
        vm.cityChanged=cityChanged;
        vm.channelChanged=channelChanged;
        ///////////////////////

        init();

        function init() {
            //initialize query params
            vm.cityselect=districtService.getCityName();         //获取城市
            query(vm.cityId,vm.channel);                         //查询广告数据
        }

        function query(cityId,channel) {
            vm.cityIdName=cityId;
            vm.channelName=channel;
            var channel=parseInt(channel);
            AdvertisementService.getAdByChannel(sessionId,cityId,channel).then(function (result) {
                    if(result){
                        vm.advertisementList=result;

                    }

                    console.log("广告位情况",vm.advertisementList);
                },
                function (error) {

                })
        }

        function cityChanged(cityId) {
            vm.cityId=cityId;
        }

        function channelChanged(channel) {
            vm.channel=channel;
        }
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


