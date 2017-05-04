/**
 * Created by candice on 2017/2/14.
 * @author candice
 * @file
 * @data 2017/2/14
 */

define([
    'angular',
    '../services/UtilService',
    '../services/baseData.service'
],function (angular) {
    return angular.module("xwWeb")
        .registerController("IndustryModalController", ["baseDataService", "utilService", IndustryModalController]);
    function IndustryModalController(baseDataService, utilService) {
        var vm = this;

        vm.choiseIndustry = [];
        getIndustry();//行业模态框数据的组装
        vm.addChoiseIndustry = addChoiseIndustry;
        vm.delChoiseIndustryItem = delChoiseIndustryItem;

        function getIndustry() {
            if(!localStorage.getItem("industry")) {
                baseDataService.init().then(function () {
                }).catch(function () {
                    utilService.showPrompt("获取行业出错")
                })
            }

            var industry = JSON.parse(localStorage.getItem("industry"));
            var targetIndustryDataFormat = [], j = 0;
            for (var i = 0, len = industry.length  ; i < len; i ++) {
                if(industry[i].code.toString().length == 2) {
                    targetIndustryDataFormat[j] = industry[i];
                    j ++;
                }
            }

            console.log(targetIndustryDataFormat, "targetIndustryDataFormat before");
            for(var i = 0, len = industry.length  ; i < len; i ++) {
                for(var j = 0, length = targetIndustryDataFormat.length; j < length; j ++) {
                    targetIndustryDataFormat[j].subIndustry
                    if(industry[i].code.toString().length == 4 && industry[i].code.toString().substr(0, 2) == targetIndustryDataFormat[j].code) {
                        targetIndustryDataFormat[j].subIndustry = targetIndustryDataFormat[j].subIndustry ? targetIndustryDataFormat[j].subIndustry : [];
                        var subIndustryLen = targetIndustryDataFormat[j].subIndustry ? targetIndustryDataFormat[j].subIndustry.length : 0;
                        targetIndustryDataFormat[j].subIndustry[subIndustryLen] = industry[i];
                    }
                }
            }

            console.log(targetIndustryDataFormat, "targetIndustryDataFormat after");

            vm.allIndustry = targetIndustryDataFormat;
        }

        function addChoiseIndustry(industry, index) {
            //industry.choise = !industry.choise;
            if(vm.choiseIndustry.length >= 10) {
                utilService.showPrompt("不能超过十个");
                return;
            }

            industry.index = index;
            var choiseIndustryTemp =  vm.choiseIndustry;
            // 选择大行业后，已选择的小行业都要删掉，且颜色变回之前的颜色。
            if(industry.subIndustry) {
                if(industry.choise) {
                    for(var i = 0, len = vm.choiseIndustry.length; i < len; i ++) {
                        if(industry.code == vm.choiseIndustry[i].code) {
                            vm.choiseIndustry.splice(i, 1);
                            industry.choise = false;
                            i--;
                        }
                    }
                } else {

                    for(var i = 0, length = vm.choiseIndustry.length; i < vm.choiseIndustry.length; i ++) {
                        if(industry.code == vm.choiseIndustry[i].code.toString().substring(0,2)) {
                            industry.subIndustry[vm.choiseIndustry[i].index].choise = false;
                            vm.choiseIndustry.splice(i, 1);
                            i --;
                        }
                    }
                    vm.choiseIndustry.push(industry);
                    industry.choise = true;
                }
            } else {//选的小行业，要判断大行业是不是已经选到了，还要判断是加在已选择的数组中还是要在已选择数组中去掉
                //如果它是已选择状态则去掉已选择状态，并在已选择列表中删除。
                if(industry.choise) {
                    for(var i = 0; i < vm.choiseIndustry.length; i ++) {
                        if(industry.code == vm.choiseIndustry[i].code) {
                            vm.choiseIndustry.splice(i, 1);
                        }
                    }
                    industry.choise = !industry.choise;
                } else {
                    //判断大行业是不是在已选择的列表中,如果再，则不做操作，如果不在则加入到列表
                    var flag = false;
                    for(var i = 0; i < vm.choiseIndustry.length; i ++) {
                        if(vm.choiseIndustry[i].code.toString().length == 2 && industry.code.toString().substring(0, 2) == vm.choiseIndustry[i].code) {
                            flag = true;
                            return;
                        }
                    }
                    if(!flag) {
                        vm.choiseIndustry.push(industry);
                        industry.choise = !industry.choise;
                    }

                }
            }

        }

        function delChoiseIndustryItem(item) {
            if(item.code.toString().length == 2) {
                vm.allIndustry[item.index].choise = false;
            } else {
                for(var i = 0; i < vm.allIndustry.length; i ++) {
                    if(item.code.toString().substring(0,2) == vm.allIndustry[i].code) {
                        vm.allIndustry[i].subIndustry[item.index].choise = false;
                    }
                }
            }

            //删除数组，对应项状态和页面样式要修改。
            for(var i = 0; i < vm.choiseIndustry.length; i ++) {
                if(vm.choiseIndustry[i].code == item.code) {
                    vm.choiseIndustry.splice(i, 1);
                    return;
                }
            }
        }
    }
})
