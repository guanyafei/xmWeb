/**
 * Created by xjs on 2016/10/20.
 */
define([
    'angular',
    'services/JsonRpcService',
    'services/AuthService',
    'services/ErrorService',
    'services/UtilService'
], function (angular) {
    return angular.module('xwWeb')
        .$register.factory('baseDataService', baseDataService);

    baseDataService.$inject = ['$q', '$location', "jsonRpcService", "authService", 'errorService'];

    function baseDataService($q, $location, jsonRpcService, authService, errorService) {
        var districtDefer = $q.defer(), industryDefer = $q.defer();
        //districtsNum: 城市区域商圈的总数，districts：所有的城市区域商圈
        //industryNum: 大行业小行业总数， industry： 所有的大行业小行业se
        var districtsNum, districts, industryNum, industry;
        if(!window.localStorage && window.localStorage.getItem) {
            //alert("您的浏览器已经老了，请升级")
            alert("您的浏览器可以升级下哦！");
        }

        return {
            init: init,
            listDistrict: listDistrict,
            listIndustry:listIndustry,
            getCityByPinyin: getCityByPinyin,
            getCityName: getCityName,
            getCitysDistricts: getCitysDistricts,//获取城市对应的区域
            getDistrictsBusinessArea: getDistrictsBusinessArea, //获取区域对应的商圈
            getDistrictAndBusinessArea: getDistrictAndBusinessArea, //获取所有的区域和商圈
            getIndustrysSmallIndustry: getIndustrysSmallIndustry, //获取大行业对应的小行业
            getBigIndustry: getBigIndustry //获取大行业

        };


        function init(sessionId) {
            if(!sessionId) {
                sessionId = authService.getSessionId();
            }

            //获取所有的城市区域和商圈
            var promise1 = listDistrict(sessionId).then(function (result) {
                districtsNum = result.totalCount;
                districts = result.objects;
                localStorage.setItem("districts", JSON.stringify(districts));
                districtDefer.resolve(districts);
            }).catch(function (err) {
                errorService.processError(err);
                districtDefer.reject(err);
            });

            //获取所有的大行业小行业
            var promise2 = listIndustry(sessionId).then(function (result) {
                industryNum = result.totalCount;
                industry = result.objects;
                localStorage.setItem("industry", JSON.stringify(industry));
                industryDefer.resolve(industry);
            }).catch(function (err) {
                errorService.processError(err);
                industryDefer.reject(err);
            });

            return $q.all([promise1, promise2]);
        }

        /**
         * 从接口获取所有的城市区域和商圈
         * @param sessionId
         * @returns {*} 返回promise
         */
        function listDistrict(sessionId) {
            return jsonRpcService.request('baseData_listDistrict', {
                sessionId: sessionId
            });
        }

        /**
         * 从接口获取所有大行业小行业
         * @param sessionId
         * @returns {*} 返回promise
         */
        function listIndustry(sessionId) {
            return jsonRpcService.request('baseData_listIndustry', {
                sessionId: sessionId
            });
        }

        /**
         * 获取开通服务城市的拼音排序
         * @returns {{}} 按拼音排序后的对象。
         */
        function getCityByPinyin() {
            var cityByPinyin = {};
            var districts = JSON.parse(localStorage.getItem("districts"));

            if(!districts) {
                init().then(function () {
                    districts = JSON.parse(localStorage.getItem("districts"));
                    angular.forEach(districts, function (value, key) {
                        if(value.code.toString().length == 4 && value.pinyin) {
                            //按拼音的顺序分类。
                            var letter = value.pinyin.substr(0,1);
                            if(!cityByPinyin[letter]) {

                                cityByPinyin[letter] = [];
                            }
                            cityByPinyin[letter].push(value);
                        }
                    });
                    return cityByPinyin;
                })
            } else {
                angular.forEach(districts, function (value, key) {
                    if(value.code.toString().length == 4 && value.pinyin) {
                        //按拼音的顺序分类。
                        var letter = value.pinyin.substr(0,1);
                        if(!cityByPinyin[letter]) {

                            cityByPinyin[letter] = [];
                        }
                        cityByPinyin[letter].push(value);
                    }
                });

                //对字母进行排序，先转换成数组再蒋数据转为对象。
                var transferCityByPinyin = [];
                for(var key in cityByPinyin) {
                    transferCityByPinyin.push([key, cityByPinyin[key]]);
                }

                transferCityByPinyin.sort(function (a, b) {
                    return a[0].charCodeAt(0) - b[0].charCodeAt(0);
                });

                cityByPinyin = {}; //清空之前的对象，付給排序后的值
                angular.forEach(transferCityByPinyin, function(value, index) {
                    cityByPinyin[value[0]] = value[1];
                });

                return cityByPinyin;
            }

        }

        /**
         * 获取所有已开通服务的城市对象， 主要是查询的时候选择需要和filter需要，
         * @returns {Array} 所有已开通服务的城市对象
         */
        function getCityName() {
            var cities  = [];
            var districts = JSON.parse(localStorage.getItem("districts"));
            //判断localStorage中是否存在districts，如果不存在再调用初始化方法。
            if(!districts) {
                init().then(function () {
                    districts = JSON.parse(localStorage.getItem("districts"));
                    angular.forEach(districts, function (value, key) {
                        if(value.code.toString().length == 4 ) {
                            cities.push(value);
                        }
                    });

                    localStorage.setItem("cityName", JSON.stringify(cities));
                    return cities;
                });
            } else {
                angular.forEach(districts, function (value, key) {
                    if(value.code.toString().length == 4 ) {
                        cities.push(value);
                    }
                });

                localStorage.setItem("cityName", JSON.stringify(cities));
                return cities;

            }
        }

        /**
         * 获取城市和对应的区域, 动态获取不需要保存在localStorage中
         * @param cityId 城市id
         * @returns {Array} 该城市所对应的区域
         */
        function getCitysDistricts(cityId) {
            var citysDistricts  = [];
            var districts = JSON.parse(localStorage.getItem("districts"));

            //判断localStorage中是否存在districts，如果不存在再调用初始化方法。
            if(!districts) {
                init().then(function () {
                    districts = JSON.parse(localStorage.getItem("districts"));
                    angular.forEach(districts, function (value, key) {
                        if((value.code.toString().substr(0, 4) == cityId) && value.code.toString().length == 6) {
                            citysDistricts.push(value);
                        }
                    });

                    return citysDistricts;
                });
            } else {
                angular.forEach(districts, function (value, key) {
                    if((value.code.toString().substr(0, 4) == cityId) && value.code.toString().length == 6 ) {
                        citysDistricts.push(value);
                    }
                });

                return citysDistricts;
            }
        }

        /***
         * 动态获取所有区域和对应的商圈
         * @param districtsId 区域的id
         * @returns {*} 改区域对应的商圈
         */
        function getDistrictsBusinessArea(districtsId) {
            var districtsBusinessArea  = [];
            var districts = JSON.parse(localStorage.getItem("districts"));
            //判断localStorage中是否存在districts，如果不存在再调用初始化方法。
            if(!districts) {
                init().then(function () {
                    districts = JSON.parse(localStorage.getItem("districts"));
                    angular.forEach(districts, function (value, key) {
                        if((value.code.toString().substr(0, 6) == districtsId) && value.code.toString().length == 8) {
                            districtsBusinessArea.push(value);
                        }
                    });

                    return districtsBusinessArea;
                });
            } else {
                angular.forEach(districts, function (value, key) {
                    if((value.code.toString().substr(0, 6) == districtsId) && value.code.toString().length == 8 ) {
                        districtsBusinessArea.push(value);
                    }
                });

                return districtsBusinessArea;
            }
        }

        /**
         * 获取所有区域和商圈
         * @returns {Array} 获取所有区域和商圈
         */
        function getDistrictAndBusinessArea() {
            var districtsAndBusinessArea  = [];
            var districts = JSON.parse(localStorage.getItem("districts"));
            //判断localStorage中是否存在districts，如果不存在再调用初始化方法。
            if(!districts) {
                init().then(function () {
                    districts = JSON.parse(localStorage.getItem("districts"));
                    angular.forEach(districts, function (value, key) {
                        if((value.code.toString().length == 6) || value.code.toString().length == 8) {
                            districtsAndBusinessArea.push(value);
                        }
                    });

                    return districtsAndBusinessArea;
                });
            } else {
                angular.forEach(districts, function (value, key) {
                    if((value.code.toString().length == 6) || value.code.toString().length == 8) {
                        districtsAndBusinessArea.push(value);
                    }
                });

                return districtsAndBusinessArea;
            }
        }


        /**
         * 获取所有的大行业
         * @returns {Array} 所有行业中的大行业
         */
        function getBigIndustry(pluginId) {
            var bigIndusty = [];

            var industry = JSON.parse(localStorage.getItem("industry"));
            //判断localStorage中是否存在districts，如果不存在再调用初始化方法。
            if(!industry) {
                init().then(function () {
                    industry = JSON.parse(localStorage.getItem("industry"));
                    //物业类的行业，即行业表“shop_industry_name”字段不为空的行业与小行业。
                    //经营类的行业，即行业表“engage_name”字段不为空的行业与小行业。
                    if(pluginId && (pluginId == "xw:transfer" || pluginId == 'xw:siting')) {
                        angular.forEach(industry, function (value, key) {
                            if(value.code.toString().length == 2 && value.shopIndustryName != '') {
                                value.name = value.shopIndustryName;//物业类的name是shopIndustryName
                                bigIndusty.push(value);
                            }
                        });
                    } else if (pluginId && pluginId != "xw:transfer" &&  pluginId != 'xw:siting') {
                        angular.forEach(industry, function (value, key) {
                            if(value.code.toString().length == 2 && value.engageName != '') {
                                value.name = value.engageName;//物业类的name是shopIndustryName
                                bigIndusty.push(value);
                            }
                        });
                    } else {
                        angular.forEach(industry, function (value, key) {
                            if(value.code.toString().length == 2) {
                                bigIndusty.push(value);
                            }
                        });
                    }

                    return bigIndusty;
                });
            } else {
                if(pluginId && (pluginId == "xw:transfer" || pluginId == 'xw:siting')) {
                    angular.forEach(industry, function (value, key) {
                        if(value.code.toString().length == 2 && value.shopIndustryName != '') {
                            value.name = value.shopIndustryName;//物业类的name是shopIndustryName
                            bigIndusty.push(value);
                        }
                    });
                } else if (pluginId && pluginId != "xw:transfer" &&  pluginId != 'xw:siting') {
                    angular.forEach(industry, function (value, key) {
                        if(value.code.toString().length == 2 && value.engageName != '') {
                            value.name = value.engageName;//物业类的name是shopIndustryName
                            bigIndusty.push(value);
                        }
                    });
                } else {
                    angular.forEach(industry, function (value, key) {
                        if(value.code.toString().length == 2) {
                            bigIndusty.push(value);
                        }
                    });
                }

                return bigIndusty;
            }
        }

        /**
         * 获取大行业对应的小行业
         * @param industryId 大行业id
         * @returns {Array} 大行业对应的小行业
         */
        function getIndustrysSmallIndustry(industryId, pluginId) {
            var industrysSmallIndustry  = [];
            var industry = JSON.parse(localStorage.getItem("industry"));
            //判断localStorage中是否存在districts，如果不存在再调用初始化方法。
            if(!industry) {
                init().then(function () {
                    industry = JSON.parse(localStorage.getItem("industry"));
                    //物业类的行业，即行业表“shop_industry_name”字段不为空的行业与小行业。
                    //经营类的行业，即行业表“engage_name”字段不为空的行业与小行业。
                    if(pluginId && pluginId == "xw:transfer" || pluginId == 'xw:siting') {
                        angular.forEach(industry, function (value, key) {
                            if((value.code.toString().substr(0, 2) == industryId) && value.code.toString().length == 4 && value.shopIndustryName != '') {
                                value.name = value.shopIndustryName
                                industrysSmallIndustry.push(value);
                            }
                        });

                    } else if (pluginId && pluginId != "xw:transfer" &&  pluginId != 'xw:siting') {
                        angular.forEach(industry, function (value, key) {
                            if((value.code.toString().substr(0, 2) == industryId) && value.code.toString().length == 4 && value.engageName != '') {
                                value.name = value.engageName;
                                industrysSmallIndustry.push(value);
                            }
                        });

                    } else {
                        angular.forEach(industry, function (value, key) {
                            if((value.code.toString().substr(0, 2) == industryId) && value.code.toString().length == 4 ) {
                                industrysSmallIndustry.push(value);
                            }
                        });
                    }

                    return industrysSmallIndustry;
                });
            } else {
                if(pluginId && pluginId == "xw:transfer" || pluginId == 'xw:siting') {
                    angular.forEach(industry, function (value, key) {
                        if((value.code.toString().substr(0, 2) == industryId) && value.code.toString().length == 4 && value.shopIndustryName != '') {
                            value.name = value.shopIndustryName
                            industrysSmallIndustry.push(value);
                        }
                    });

                } else if (pluginId && pluginId != "xw:transfer" &&  pluginId != 'xw:siting') {
                    angular.forEach(industry, function (value, key) {
                        if((value.code.toString().substr(0, 2) == industryId) && value.code.toString().length == 4 && value.engageName != '') {
                            value.name = value.engageName;
                            industrysSmallIndustry.push(value);
                        }
                    });

                } else {
                    angular.forEach(industry, function (value, key) {
                        if((value.code.toString().substr(0, 2) == industryId) && value.code.toString().length == 4 ) {
                            industrysSmallIndustry.push(value);
                        }
                    });
                }

                return industrysSmallIndustry;
            }
        }
    }
});
