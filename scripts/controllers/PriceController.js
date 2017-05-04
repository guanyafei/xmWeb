define([
    'angular',
    '../services/AuthService',
    '../services/BusinessService',
    '../services/PostService',
    '../services/ErrorService',
    '../services/PriceService',
    '../services/OpportunityService',
    '../services/UtilService',
    '../services/AdvertisementService',

], function (angular) {
    angular.module('xwWeb')
        .registerController('priceController', ['$uibModal', 'OpportunityService','$stateParams', '$location', 'authService', 'businessService', 'postService', 'errorService', 'priceService', 'utilService', 'AdvertisementService', priceController]);

    function priceController( $uibModal, OpportunityService,$stateParams, $location, authService, businessService, postService, errorService, priceService, utilService, AdvertisementService) {
        var sessionId = authService.getSessionId();
        var vm = this;
        var modalInstance;
        vm.offlineReason = '';
        vm.pageName = "price";
        vm.businessId = $stateParams.businessId;
        vm.serveByResult = 1;//按结果
        vm.serveByCycle = 2;//按周期
        vm.transferPluginId = "xw:transfer";
        vm.sitingPluginId = "xw:siting";
        vm.recruitmentPluginId = "xw:recruitment";
        vm.reservationPluginId = "xw:reservation";
        vm.advertisingSelect = [];
        // vm.advertisingSelect = [
        //     {"name": "1.焦点广告", "value": 1},
        //     {"name": "2.右侧图文广告", "value": 2},
        //     {"name": "3.精选图文广告", "value": 3},
        //     {"name": "4.右侧最新标题广告", "value": 4},
        //     {"name": "5.精选左侧广告位", "value": 5},
        //     {"name": "6.精选商铺广告位", "value": 6},
        //     {"name": "7A.横幅广告", "value": 7},
        //     {"name": "7B.横幅广告", "value": 8},
        //     {"name": "7C.横幅广告", "value": 9},
        //     {"name": "8.最热图文广告", "value": 10},
        //     {"name": "9.最热框架广告", "value": 11},
        //     {"name": "10.1F行业大图广告", "value": 12},
        //     {"name": "11.1F行业左侧广告位", "value": 13},
        //     {"name": "12.1F行业推荐广告位", "value": 14},
        //     {"name": "13.1F行业标题广告位", "value": 15},
        //     {"name": "14.热门转让广告位", "value": 16},
        //     {"name": "15.低价急转广告位", "value": 17}
        // ];
        //店铺转让
        vm.shopTransfer = 1;
        //店铺转让周期选项
        vm.shopTransferCycleSelect = [
            {"name": "15天", "value": 15},
            {"name": "30天", "value": 30}
        ];
        vm.tansferCycleSelect = [
            {"name": "15天", "value": 15},
            {"name": "30天", "value": 30},
            {"name": "其它时间", "value": vm.cycle}
        ];
        //出租招商;
        vm.attractInvestment = 2;
        //出租招商周期选项
        vm.attractInvestmentCycleSelect = [
            {"name": "1个月", "value": 30},
            {"name": "2个月", "value": 60},
            {"name": "3个月", "value": 90},
            {"name": "半年", "value": 180},
            {"name": "一年", "value": 365}
        ];
        //找店周期选项
        vm.sitingCycleSelect = [
            {"name": "10天", "value": 10},
            {"name": "1个月", "value": 30},
            {"name": "2个月", "value": 60},
            {"name": "3个月", "value": 90},
            {"name": "半年", "value": 180},
            {"name": "一年", "value": 365}
        ];
        //招聘周期选项
        vm.recruitmentCycleSelect = [
            {"name": "3个月", "value": 90},
            {"name": "半年", "value": 180},
            {"name": "一年", "value": 365}
        ];

        //报价相关基础数据
        //转店-按结果，转让费范围对应的价格，大于100万为转让费的1.5%
        vm.transferServeByResultPrices = [
            {"min": 0, "max": 40000, "price": 2000},
            {"min": 40000, "max": 80000, "price": 2500},
            {"min": 80000, "max": 100000, "price": 3000},
            {"min": 100000, "max": 150000, "price": 3500},
            {"min": 150000, "max": 200000, "price": 4000},
            {"min": 200000, "max": 250000, "price": 4500},
            {"min": 250000, "max": 300000, "price": 5000},
            {"min": 300000, "max": 350000, "price": 5800},
            {"min": 350000, "max": 400000, "price": 6800},
            {"min": 400000, "max": 500000, "price": 7800},
            {"min": 500000, "max": 800000, "price": 8800},
            {"min": 800000, "max": 1000000, "price": 9800}
        ];
        //转店-按时间，广告位ID-价格/15天
        vm.transferServeByCyclePrices = {
            "1": 5000,
            "2": 4000,
            "3": 4000,
            "4": 1000,
            "5": 4500,
            "6": 3000,
            "7": 3500,
            "8": 3250,
            "9": 3000,
            "10": 2500,
            "11": 2000,
            "12": 3000,
            "13": 3000,
            "14": 1500,
            "15": 1000,
            "16": 750,
            "17": 750
        };
        //找店-按结果，面积范围对应的价格
        vm.sitingServeByResultPrices = [
            {"min": 0, "max": 20, "price": 2000},
            {"min": 20, "max": 50, "price": 2500},
            {"min": 50, "max": 100, "price": 3000},
            {"min": 100, "max": 200, "price": 3500},
            {"min": 200, "max": 300, "price": 4000},
            {"min": 300, "max": 500, "price": 4500},
            {"min": 500, "max": 800, "price": 5000},
            {"min": 800, "max": 1200, "price": 6000},
            {"min": 1200, "max": 1500, "price": 7000},
            {"min": 1500, "max": 2000, "price": 8000},
            {"min": 2000, "max": 3000, "price": 9000},
            {"min": 3000, "max": 4000, "price": 10000},
            {"min": 4000, "max": 5000, "price": 11000},
            {"min": 5000, "max": 6000, "price": 12000},
            {"min": 6000, "max": 7000, "price": 13000},
            {"min": 7000, "max": 8000, "price": 14000},
            {"min": 8000, "max": 9000, "price": 15000},
            {"min": 9000, "max": 10000, "price": 16000},
            {"min": 10000, "max": 11000, "price": 17000},
            {"min": 11000, "max": 12000, "price": 18000},
            {"min": 12000, "max": 13000, "price": 19000},
            {"min": 13000, "max": 999999, "price": 20000}
        ];
        //找店-按结果，特殊行业不按面积计算
        vm.sitingSpecialIndustryPrices = {
            "1903": 4000,//药店
            "2202": 6000,//幼儿园
            "1401": 6000,//网吧
            "1902": 8000,//诊所
            "1901": 8000,//医院
            "1102": 5000,//食堂
            "1525": 3500,//档口摊位
            "1412": 12000//健身房
        };
        //找店-按时间，天-价格
        vm.sitingServeByCyclePrices = {
            "30": 5000,
            "60": 10000,
            "90": 15000,
            "180": 30000,
            "365": 60000
        };
        //招聘，天-价格
        vm.recruitmentPrices = {
            "90": 500,
            "180": 1200,
            "365": 2000
        }
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.totalCount = 0;
        vm.detail = {};//业务详情
        vm.pluginId = "";//插件ID
        vm.opportunityId = 0;//商机ID
        vm.opportunity = {};//商机

        vm.transferType = 0;//转店类型
        vm.transferFee = 0;//转让费，单位元

        vm.minArea = 0;//找店最小面积
        vm.maxArea = 0;//找店最大面积
        vm.sitingIndustryId = 0;//找店行业

        vm.mode = 0;//服务方式
        vm.cycle = 0;//周期
        vm.advertising = 0;//广告位
        vm.price = 0;//价格
        vm.discountedPrice = '';//优惠价格
        vm.isNeedPrepay = 0;//是否需要预付
        vm.prepayPrice = "";//预付金额
        vm.rate = 0;//返点比例
        vm.submitted = false;
        vm.errorMessage = "";
        vm.transferCycle = 30;//默认转租的天数为30
        vm.cityId = authService.getCityId();

        vm.get = get;//获取业务详情
        vm.getPrice = getPrice;
        vm.changeMode = changeMode;//修改服务模式
        vm.bargain = bargain;//报价
        vm.selectTransferCycle = selectTransferCycle;//转店天数选择
        vm.getTransferPrice = getTransferPrice;//获取转店价格
        vm.close = close; //关闭查看最近报价
        vm.getAdDesc = getAdDesc; //广告位情况


        get();

        function get() {
            businessService.get(sessionId, vm.businessId).then(function (result) {
                vm.detail = result;
                vm.bargainInfo = result;
                vm.lastBarganTime = result.lastBarganTime;
                vm.pluginId = vm.detail.pluginId;
                var channel, status = 1; //status 关闭 1:正常,0:关闭
                if(vm.pluginId == vm.recruitmentPluginId) {
                    vm.mode =  vm.serveByCycle
                }
                vm.opportunityId = vm.detail.opportunityId;

                OpportunityService.getInfo(sessionId, vm.opportunityId).then(function (result) {
                    vm.oppInfo = result;
                    if(!result.merchantId) {
                        vm.nonRegister = true;
                        certainSendMessage();
                        return ;
                    }
                    vm.merchantId = result.merchantId;


                    //频道{12:转店频道,13:招租频道,14:找店频道}
                    if(vm.pluginId == vm.transferPluginId && vm.oppInfo.content.type == 1) {
                        channel = 12;
                    } else if (vm.pluginId == vm.transferPluginId && vm.oppInfo.content.type == 2 ) {
                        channel = 13;
                    } else if (vm.pluginId == vm.sitingPluginId) {
                        channel = 14;
                    }

                    if(vm.pluginId == vm.transferPluginId || vm.pluginId == vm.sitingPluginId) {
                        priceService.getByChannel(sessionId, channel, status, vm.currentPage -1 , vm.pageSize * 10).then(function (result) {
                            vm.advertisingSelect = result.objects;
                            vm.advertising = vm.advertisingSelect[0].id;
                        }).catch(function (error) {
                            errorService.processError(error);
                        });
                    }
                }).catch(function (error) {
                    errorService.processError(error);
                });

                if (vm.pluginId == vm.transferPluginId) {
                    vm.mode = vm.serveByResult;
                    //获取商机详情
                    postService.get(sessionId, vm.opportunityId).then(function (result) {
                        vm.opportunity = result;
                        vm.transferType = result.content.type;
                        if ((!result.content.transferFee || result.content.transferFee == 0) && result.content.type == 1) {
                            alert("转让费为空，不能签约，请完善信息后再报价");
                            $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                            return;
                        }
                        if(result.pluginId == vm.transferPluginId  && !result.content.shopName) {
                            alert("店名为空，不能签约，请完善信息后再报价");
                            $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                            return;
                        }
                        //vm.transferFee = result.content.transferFee / 100;//wcb
                        vm.transferFee = result.content.transferFee;//xjs
                        getPrice(true)//xjs
                    });
                } else if (vm.pluginId == vm.sitingPluginId) {
                    vm.mode = vm.serveByResult;
                    //获取商机详情
                    postService.get(sessionId, vm.opportunityId).then(function (result) {
                        vm.sitingIndustryId = result.content.industryId;
                        vm.minArea = result.content.minArea;
                        vm.maxArea = result.content.maxArea;
                        getPrice(true);//xjs
                    });
                } else if (vm.pluginId == vm.recruitmentPluginId) {
                    vm.cycle = 90;
                    getPrice(true)//xjs
                } else if (vm.pluginId == vm.reservationPluginId) {
                    vm.rate = 10;
                    vm.cycle = 180;
                }

            }, function (error) {
                errorService.processError(error);
            });
        }

        function changeMode(valid) {
            if (vm.mode == vm.serveByResult) {
                vm.advertising = vm.advertisingSelect[0].id;;
                vm.cycle = 0;
            } else {
                if (vm.pluginId == vm.transferPluginId) {
                    vm.advertising = vm.advertisingSelect[0].id;
                    vm.cycle = 30;
                } else if (vm.pluginId == vm.sitingPluginId) {
                    vm.advertising = vm.advertisingSelect[0].id;
                    vm.cycle = 30;
                } else if (vm.pluginId == vm.recruitmentPluginId) {
                    vm.advertising = 0;
                    vm.cycle = 90;
                }
            }
            getPrice(valid)
        }

        function getTransferPrice(isValid) {
            if(vm.price < 0 || !isValid) {
                return ;
            }
            getPrice(true);
        }

        function getPrice(valid) {
            if(!valid) {
                return;
            }

            if(vm.pluginId == vm.transferPluginId || vm.pluginId == vm.sitingPluginId) {
                var params;
                if (vm.mode == vm.serveByResult) {//按结果
                    params = {
                        mode: vm.serveByResult,
                    };

                } else {//按周期
                    if((vm.advertisingDays > vm.cycle) && vm.needAdver == 1 ) {
                        utilService.showPrompt("广告时间不能大于服务时间");
                        return
                    }
                    params = {
                        mode: vm.serveByCycle
                    };

                    if(vm.cycle) {
                        params['days'] = parseInt(vm.cycle);
                    } else {
                        params['days'] = 1;
                    }
                }

                if(vm.needAdver == 1) {
                    params.advertising = vm.advertising;
                    if(vm.advertisingDays) {
                        params.advertisingDays = vm.advertisingDays;
                    } else {
                        params.advertisingDays = 1;
                    }
                }

                priceService.getByOpportunity(vm.opportunityId, params).then(function (result) {
                    vm.price = result/100;
                }, function (error) {
                    errorService.processError(error);
                })

            } else if (vm.pluginId == vm.recruitmentPluginId){
                var params = {
                    days: vm.cycle
                };
                priceService.getByOpportunity(vm.opportunityId, params).then(function (result) {
                    vm.price = result/100;
                }, function (error) {
                    errorService.processError(error);
                });
            }

            // switch(vm.pluginId)
            // {
            //     //确定焦点广告是否返回正确的价钱
            //     case vm.transferPluginId:
            //         var params;
            //         if (vm.mode == vm.serveByResult) {//按结果
            //             params = {
            //                 mode: vm.serveByResult,
            //                 transferFee: vm.transferFee
            //             };
            //
            //         } else {//按周期
            //             if(vm.advertisingDays > vm.cycle) {
            //                 utilService.showPrompt("广告时间不能大于服务时间");
            //                 return
            //             }
            //             params = {
            //                 mode: vm.serveByCycle
            //             };
            //
            //             if(vm.cycle) {
            //                 params['days'] = parseInt(vm.cycle);
            //             } else {
            //                 params['days'] = 1;
            //             }
            //         }
            //
            //         if(vm.needAdver == 1) {
            //             params.advertising = vm.advertising;
            //             if(vm.advertisingDays) {
            //                 params.advertisingDays = vm.advertisingDays;
            //             } else {
            //                 params.advertisingDays = 1;
            //             }
            //         }
            //         priceService.get(vm.pluginId, params).then(function (result) {
            //             vm.price = result/100;
            //         }, function (error) {
            //             errorService.processError(error);
            //         })
            //         break;
            //     case vm.sitingPluginId:
            //         var params;
            //         if (vm.mode == vm.serveByResult) {//按结果
            //             params = {
            //                 mode: vm.serveByResult,
            //                 area: vm.maxArea
            //             };
            //             if (vm.sitingSpecialIndustryPrices[vm.sitingIndustryId]) {//特殊行业
            //                 params.industry = vm.sitingIndustryId;
            //             }
            //
            //         } else {//按周期
            //             if(vm.sitingNeedAdver == 1 && vm.advertisingDays && vm.advertisingDays > vm.cycle) {
            //                 utilService.showPrompt("广告时间不能大于服务时间");
            //                 return;
            //             }
            //             params = {
            //                 mode: vm.serveByCycle,
            //                 days: vm.cycle
            //             };
            //         }
            //
            //         if(vm.sitingNeedAdver == 1) {
            //             params.advertising = vm.advertising;
            //             if(vm.advertisingDays) {
            //                 params.advertisingDays = vm.advertisingDays;
            //             } else {
            //                 params.advertisingDays = 1;
            //             }
            //         }
            //
            //         priceService.get(vm.pluginId, params).then(function (result) {
            //             vm.price = result/100;
            //         }, function (error) {
            //             errorService.processError(error);
            //         });
            //         break;
            //     case vm.recruitmentPluginId:
            //         var params = {
            //             days: vm.cycle
            //         };
            //         priceService.get(vm.pluginId, params).then(function (result) {
            //             vm.price = result/100;
            //         }, function (error) {
            //             errorService.processError(error);
            //         });
            //         break;
            //     default:
            //        return;
            // }
        }

        //业务报价
        function bargain(isValid) {
            vm.submitted = true;
            if (!isValid) {
                return;
            }

            var priceInfo = {};

            if (vm.pluginId == vm.transferPluginId) {
                priceInfo = {
                    mode: parseInt(vm.mode),
                    discountPrice: vm.discountedPrice * 100
                };

                if (vm.mode == vm.serveByResult) {
                    priceInfo['transferFee'] = vm.transferFee * 100;
                } else if (vm.mode == vm.serveByCycle) {
                    if(vm.needAdver == 1 && vm.advertisingDays && vm.advertisingDays > vm.cycle) {
                        utilService.showPrompt("广告时间不能大于服务时间");
                        return;
                    }
                    if(vm.cycle) {
                        priceInfo['days'] = parseInt(vm.cycle);
                    } else {
                        priceInfo['days'] = 1;
                    }
                }
                if(vm.needAdver == 1) {
                    priceInfo['advertising']= vm.advertising;
                    if(vm.advertisingDays) {
                        priceInfo['advertisingDays'] = parseInt(vm.advertisingDays);
                    } else {
                        priceInfo['advertisingDays']= 1;
                    }
                }

                if (vm.isNeedPrepay) {
                    priceInfo['prepayPrice'] = vm.prepayPrice * 100;
                }
            } else if (vm.pluginId == vm.sitingPluginId) {
                priceInfo = {
                    mode: parseInt(vm.mode),
                    discountPrice: vm.discountedPrice * 100
                };

                priceInfo['area'] = parseInt(vm.maxArea);
                priceInfo['industry'] = parseInt(vm.sitingIndustryId);
                if (vm.mode == vm.serveByCycle) {
                    if(vm.sitingNeedAdver == 1 && vm.advertisingDays && vm.advertisingDays > vm.cycle) {
                        utilService.showPrompt("广告时间不能大于服务时间");
                        return;
                    }
                    priceInfo['days'] = parseInt(vm.cycle);
                }

                if (vm.isNeedPrepay) {
                    priceInfo['prepayPrice'] = vm.prepayPrice * 100;
                }

                if(vm.sitingNeedAdver == 1) {
                    priceInfo['advertising']= vm.advertising;
                    if(vm.advertisingDays) {
                        priceInfo['advertisingDays'] = parseInt(vm.advertisingDays);
                    } else {
                        priceInfo['advertisingDays']= 1;
                    }
                }
            } else if (vm.pluginId == vm.recruitmentPluginId) {
                priceInfo = {
                    days: parseInt(vm.cycle),
                    discountPrice: vm.discountedPrice * 100
                }
            } else if (vm.pluginId == vm.reservationPluginId) {
                priceInfo = {
                    days: parseInt(vm.cycle),
                    rate: parseInt(vm.rate)
                }
            }

            if(vm.discountedPrice == '' && vm.pluginId != vm.reservationPluginId) {
                priceInfo.discountPrice = vm.price * 100;
            }

            businessService.bargain(sessionId, vm.businessId, priceInfo).then(function () {
                if(vm.offlineRecept == 1) {
                    businessService.autoPayByOfflineMode(sessionId, vm.businessId, vm.offlineReason).then(function() {
                        alert("签约成功");
                    }, function () {
                        alert("签约成功！\n 注意：线下已收款失败。请让客户确认签约，并选择线下支付，完成签约！")
                    });
                } else {
                    alert("签约成功");
                }
                get();
            }, function (error) {
                errorService.processError(error);
            });
        }

        function selectTransferCycle() {
            if(vm.transferCycle) {
                vm.cycle = parseInt(vm.transferCycle);
                getPrice(true);
            } else {
                alert("请填入天数")
            }
        }

        function certainSendMessage() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: "sm",
                    templateUrl: 'views/partial/certainSendMessage.html',
                    controllerAs: 'vm',
                    controller: 'giveUpBusinessController',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/CertainSendMessageController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }],
                        businessId: function () {
                            return vm.businessId;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    modalInstance.dismiss();
                }, function () {

                });
        }

        function close() {
            modalInstance.dismiss();
        }

        function getAdDesc(channel) {
            AdvertisementService.getAdvertisement(sessionId,vm.cityId,channel).then(function (result) {
                vm.adDesc = result
            }).catch(function (err) {
                errorService.processError(err);
            });
        }


        function calcPrice() {
            if (vm.pluginId == vm.transferPluginId) {
                if (vm.mode == vm.serveByResult) {//按结果
                    for (var i = 0; i < vm.transferServeByResultPrices.length; i++) {
                        var minTransferFee = vm.transferServeByResultPrices[i]['min'];
                        var maxTransferFee = vm.transferServeByResultPrices[i]['max'];
                        if (vm.transferFee > minTransferFee && vm.transferFee <= maxTransferFee) {
                            vm.price = vm.discountedPrice = vm.transferServeByResultPrices[i]['price'];
                            return;
                        }
                    }
                    vm.price = vm.discountedPrice = Math.floor(vm.transferFee * 0.015);
                } else {//按周期
                    var unitPrice = vm.transferServeByCyclePrices[vm.advertising];//每15天的单价
                    var dayOf15Cycle = vm.cycle / 15;
                    vm.price = vm.discountedPrice = unitPrice * dayOf15Cycle;
                }
            } else if (vm.pluginId == vm.sitingPluginId) {
                if (vm.sitingSpecialIndustryPrices[vm.sitingIndustryId]) {//特殊行业
                    vm.price = vm.discountedPrice = vm.sitingSpecialIndustryPrices[vm.sitingIndustryId];
                } else if (vm.mode == vm.serveByResult) {//按结果
                    for (var i = 0; i < vm.sitingServeByResultPrices.length; i++) {
                        var minArea = vm.sitingServeByResultPrices[i]['min'];
                        var maxArea = vm.sitingServeByResultPrices[i]['max'];
                        if (vm.minArea == minArea && vm.maxArea == maxArea) {
                            vm.price = vm.discountedPrice = vm.sitingServeByResultPrices[i]['price'];
                            return;
                        }
                    }
                } else {//按周期
                    vm.price = vm.discountedPrice = vm.sitingServeByCyclePrices[vm.cycle];
                }
            } else if (vm.pluginId == vm.recruitmentPluginId) {
                vm.price = vm.discountedPrice = vm.recruitmentPrices[vm.cycle];
            }
        }
    }
});
