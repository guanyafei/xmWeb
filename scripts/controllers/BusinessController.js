define([
    'angular',
    '../services/AuthService',
    '../services/BusinessService',
    '../services/PostService',
    '../services/ErrorService',
    '../services/UtilService',
    '../services/baseData.service'
], function (angular) {
    return angular.module('xwWeb')
        .registerController('businessController', ['baseDataService','$rootScope','$stateParams','CONFIG', '$uibModal', 'authService', 'businessService','postService', 'errorService', 'utilService', '$location',  businessController]);

    function businessController(baseDataService,$rootScope, $stateParams,CONFIG, $uibModal, authService, businessService,postService, errorService, utilService,$location) {
        var sessionId = authService.getSessionId();
        var vm = this;
        //页面所需基本数
        vm.tryservice=$stateParams.serviceId;
        vm.allPluginId = "all:all";
        vm.transferPluginId = "xw:transfer";
        vm.sitingPluginId = "xw:siting";
        vm.recruitmentPluginId = "xw:recruitment";
        vm.reservationPluginId = "xw:reservation";
        vm.defaultPicUrl = CONFIG.postDefaultPic;
        vm.transferGet = vm.transferTotal = 0;
        vm.sitingGet = vm.sitingTotal = 0;
        vm.recruitmentGet = vm.recruitmentTotal = 0;
        vm.reservationGet = vm.reservationTotal = 0;
        vm.currentMilliseconds = new Date().getTime();
        vm.ifShow = false;

        vm.takeTimeOrder = 0;//按领取时间排序
        vm.finishTimeOrder = 1;//按结束时间排序
        vm.inBusiness = 1;//业务中
        vm.inContract = 2;//签约中
        vm.finished = 3;//已成交
        vm.closed = 4;//已关闭

        //查询参数
        vm.status = vm.inBusiness;
        vm.pluginId = vm.allPluginId;
        vm.orderType = vm.takeTimeOrder;
        vm.currentPage = 1;
        vm.pageSize = CONFIG.pageSize;

        //查询结果
        vm.totalCount = 0;
        vm.list = [];
        vm.postagain=false;
        vm.cityId = authService.getCityId();


        //对象方法
        vm.getList = getList;
        vm.changePlugin = changePlugin;
        vm.changeStatus = changeStatus;
        vm.changeOrderType = changeOrderType;
        vm.isDanger = isDanger;//是否快过期
        vm.giveUp = giveUp;//放弃业务
        vm.invalid = invalid;//信息无效
        vm.take = take;//重新领取业务
        vm.accuseAdd = accuseAdd; //举报
        vm.postpone = postpone;//业务延期
        vm.improvePost = improvePost;//完善信息
        vm.show = show;
        vm.hide=hide;

        // layer.open({
        //     type: 4,
        //     content: $('#id') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        // });
        function show(business) {
            business.ifShow=true;
        }

        function hide(business) {
            business.ifShow=false;
        }

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



        function take(business) {
            postService.take(sessionId, business.opportunityId).then(function (result) {
                var businessId = result;
            /*    $location.path("/businessDetail/" + businessId + "/0");*/
                alert("领取成功");
                business.postagain=true;
            }, function (error) {
                alert(error.message);
            })
        }

        // 举报
        function accuseAdd(oppId) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/partial/accuseInfo.html',
                controllerAs: 'vm',
                controller: 'accuseController',
                /*scope: $scope,*/
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

        getList();//获取列表

        function getList() {
            businessService.getList(sessionId, vm.pluginId, vm.status, vm.orderType, vm.currentPage - 1, vm.pageSize).then(function (result) {
                vm.totalCount = result.totalCount;
                vm.list = result.objects;
            }, function (error) {
                errorService.processError(error);
            });
        }

        function changePlugin(pluginId) {
            vm.pluginId = pluginId;
            getList();
        }

        function changeStatus(status) {
            vm.status = status;
            getList();
        }

        function changeOrderType(orderType) {
            vm.orderType = orderType;
            getList();
        }

        function isDanger(milliseconds) {
            if (Math.floor((milliseconds - vm.currentMilliseconds) / 1000 / 3600 / 24) <= 2) {
                return true;
            }
            return false;
        }

        function giveUp(id) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: "sm",
                templateUrl: 'views/partial/giveUpBusiness.html',
                controllerAs: 'vm',
                controller: 'giveUpBusinessController',
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/GiveUpBusinessController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }],
                    businessId: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function () {
                $rootScope.$emit('quotaChanged');
                getList();
            }, function () {

            });
        }

        function invalid(id) {
            var modalInstance = $uibModal.open({
                animation: true,
                size: "sm",
                templateUrl: 'views/partial/invalidBusiness.html',
                controllerAs: 'vm',
                controller: 'invalidBusinessController',
                resolve: {
                    loadController: ['$q', function ($q) {
                        var deferred = $q.defer();
                        require(["controllers/InvalidBusinessController"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }],
                    businessId: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function () {
                $rootScope.$emit('quotaChanged');
                getList();
            }, function () {
            });
        }

        function postpone(businessId) {
            businessService.postpone(sessionId, businessId).then(function (result) {
                utilService.showPrompt("延期成功！");
            }).catch(function (err) {
                errorService.processError(err);
            })
        }

        function improvePost(opportunityId, businessId) {
            $location.path("/post/" + opportunityId + "/" + businessId + "/0");
        }
    }
});
