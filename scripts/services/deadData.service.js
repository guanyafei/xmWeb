/**
 * Created by candice on 2016/10/26.
 */
(function () {
    angular.module('xwWeb')
        .$register.factory('deadDataService', deadDataService)


        deadDataService.$inject = [];

        function deadDataService() {
            return {
                getTransferTypes: getTransferTypes, //获取转店类型
                getInformationSourceSelect: getInformationSourceSelect, //获取转店信息来源
                getLeaseInfomationSourcesSelect: getLeaseInfomationSourcesSelect, //获取找店信息来源
                getBusinessStatusSelect: getBusinessStatusSelect, //经营状态
                getFacilitiesSelect: getFacilitiesSelect, //获取物业配套的数据
                getContractPeriodSelect: getContractPeriodSelect, //获取剩余合同期
                getRentMeasureSelect: getRentMeasureSelect, //获取租金单位
                getIndustryTypeSelect: getIndustryTypeSelect,//获取找点经营类型
                getTypeSelect: getTypeSelect, //获取找点首选类型
                getAreasSelect: getAreasSelect, //获取面积区域选择。
                getRequireOptional: getRequireOptional

            };

            function getTransferTypes() {
                return [
                    {
                        "value": 1,
                        "name": "店铺转让"
                    },
                    {
                        "value": 2,
                        "name": "出租招商"
                    }
                ];
            };

            function getInformationSourceSelect() {
                return [
                    {
                        "value": 1,
                        "name": "公司网站"
                    },
                    {
                        "value": 2,
                        "name": "收费续费"
                    },
                    {
                        "value": 3,
                        "name": "户外"
                    } ,
                    {
                        "value": 4,
                        "name": "58同城"
                    } ,
                    {
                        "value": 5,
                        "name": "其他分类网站"
                    } ,
                    {
                        "value": 6,
                        "name": "主动来电"
                    } ,
                    {
                        "value": 7,
                        "name": "独家信息"
                    } ,
                    {
                        "value": 8,
                        "name": "报纸客户"
                    } ,
                    {
                        "value":9,
                        "name": "商户发布"
                    } ,
                    {
                        "value": 0,
                        "name": "其他"
                    }
                ];
            };

            function getLeaseInfomationSourcesSelect() {
                return [
                    {
                        "value":1,
                        "name":"个人"
                    },
                    {
                        "value":2,
                        "name":"接听电话"
                    },
                    {
                        "value":3,
                        "name":"客户提供"
                    },
                    {
                        "value":4,
                        "name":"公司网站"
                    },
                    {
                        "value":5,
                        "name":"58同城"
                    },
                    {
                        "value":6,
                        "name":"其他分类网站"
                    },
                    {
                        "value":7,
                        "name":"商户发布"
                    },
                    {
                        "value":0,
                        "name":"其他"
                    }
                ];
            };

            function getBusinessStatusSelect() {
                return [
                    {
                        "value": 1,
                        "name": "营业中"
                    },
                    {
                        "value": 2,
                        "name": "未营业"
                    }
                ];
            }

            function getFacilitiesSelect() {
                return [
                    {
                        "value":1,
                        "name":"可明火",
                        "check":false
                    },
                    {
                        "value":2,
                        "name":"上下水",
                        "check":false
                    },
                    {
                        "value":3,
                        "name":"380V",
                        "check":false
                    },
                    {
                        "value":4,
                        "name":"煤气管道",
                        "check":false
                    },
                    {
                        "value":5,
                        "name":"排烟管道",
                        "check":false
                    },
                    {
                        "value":6,
                        "name":"排污管道",
                        "check":false
                    },
                    {
                        "value":7,
                        "name":"停车位",
                        "check":false
                    },
                    {
                        "value":8,
                        "name":"产权",
                        "check":false
                    },
                    {
                        "value":9,
                        "name":"证件齐全",
                        "check":false
                    }
                ]
            }

            function getContractPeriodSelect() {
                return [
                    {
                        "value":0,
                        "name":"请选择"
                    },{
                        "value":1,
                        "name":"半年"
                    },
                    {
                        "value":2,
                        "name":"一年"
                    },
                    {
                        "value":3,
                        "name":"两年"
                    },
                    {
                        "value":4,
                        "name":"三年"
                    },
                    {
                        "value":5,
                        "name":"四年"
                    },
                    {
                        "value":6,
                        "name":"五年"
                    },
                    {
                        "value":7,
                        "name":"六年"
                    },
                    {
                        "value":8,
                        "name":"七年"
                    },
                    {
                        "value":9,
                        "name":"八年"
                    },
                    {
                        "value":10,
                        "name":"九年"
                    },
                    {
                        "value":11,
                        "name":"十年"
                    },
                    {
                        "value":12,
                        "name":"十一年"
                    },
                    {
                        "value":13,
                        "name":"十二年"
                    },
                    {
                        "value":14,
                        "name":"十三年"
                    },
                    {
                        "value":15,
                        "name":"十四年"
                    },
                    {
                        "value":16,
                        "name":"十五年"
                    }
                ]
            }

            function getRentMeasureSelect() {
                return [
                    {
                        "value":0,
                        "name":"元/月"
                    },
                    {
                        "value":1,
                        "name":"元/天"
                    },
                    {
                        "value":2,
                        "name":"万元/年"
                    },
                    {
                        "value":3,
                        "name":"元/平方米*月"
                    },
                    {
                        "value":4,
                        "name":"元/平方米*天"
                    },
                ];
            }

            function getIndustryTypeSelect() {
                return  [
                    {
                        "value":1,
                        "name":"个人"
                    },
                    {
                        "value":2,
                        "name":"加盟"
                    },
                    {
                        "value":3,
                        "name":"直营"
                    },
                ]
            }

            function getTypeSelect() {
                return [
                    {
                        "value":0,
                        "name":"全部"
                    },
                    {
                        "value":1,
                        "name":"店铺转让"
                    },
                    {
                        "value":2,
                        "name":"出租招商"
                    },
                ]
            }

            function getAreasSelect() {
                return [
                    {"value": "1", "name": "0-20平米", "minArea": 0, "maxArea": 20},
                    {"value": "2", "name": "20-50平米", "minArea": 20, "maxArea": 50},
                    {"value": "3", "name": "50-100平米", "minArea": 50, "maxArea": 100},
                    {"value": "4", "name": "100-200平米", "minArea": 100, "maxArea": 200},
                    {"value": "5", "name": "200-300平米", "minArea": 200, "maxArea": 300},
                    {"value": "6", "name": "300-500平米", "minArea": 300, "maxArea": 500},
                    {"value": "7", "name": "500-800平米", "minArea": 500, "maxArea": 800},
                    {"value": "8", "name": "800-1200平米", "minArea": 800, "maxArea": 1200},
                    {"value": "9", "name": "1200-1500平米", "minArea": 1200, "maxArea": 1500},
                    {"value": "10", "name": "1500-2000平米", "minArea": 1500, "maxArea": 2000},
                    {"value": "11", "name": "2000-3000平米", "minArea": 2000, "maxArea": 3000},
                    {"value": "12", "name": "3000-4000平米", "minArea": 3000, "maxArea": 4000},
                    {"value": "13", "name": "4000-5000平米", "minArea": 4000, "maxArea": 5000},
                    {"value": "14", "name": "5000-6000平米", "minArea": 5000, "maxArea": 6000},
                    {"value": "15", "name": "6000-7000平米", "minArea": 6000, "maxArea": 7000},
                    {"value": "16", "name": "7000-8000平米", "minArea": 7000, "maxArea": 8000},
                    {"value": "17", "name": "8000-9000平米", "minArea": 8000, "maxArea": 9000},
                    {"value": "18", "name": "9000-10000平米", "minArea": 9000, "maxArea": 10000},
                    {"value": "19", "name": "10000-11000平米", "minArea": 10000, "maxArea": 11000},
                    {"value": "20", "name": "11000-12000平米", "minArea": 11000, "maxArea": 12000},
                    {"value": "21", "name": "12000-13000平米", "minArea": 12000, "maxArea": 13000},
                    {"value": "22", "name": "13000平米以上", "minArea": 13000, "maxArea": 999999}
                ]
            }

            function getRequireOptional() {
                return [
                    {
                        "code": 0,
                        "name":'人流旺，位置佳',
                        "state": false
                    },{
                        "code": 1,
                        "name":'周边有大型社区，高档住宅',
                        "state": false
                    },{
                        "code": 2,
                        "name":'周边有写字楼群',
                        "state": false

                    },{
                        "code": 3,
                        "name":'周边商业氛围浓',
                        "state": false
                    },{
                        "code": 4,
                        "name":'交通便利、停车方便',
                        "state": false
                    },{
                        "code": 5,
                        "name":'有充足停车位',
                        "state": false
                    },{
                        "code": 6,
                        "name":'繁华街道底商或临街店铺',
                        "state": false
                    },{
                        "code": 7,
                        "name":'环境优雅，装修高档',
                        "state": false
                    },{
                        "code": 8,
                        "name":'接受上下两层',
                        "state": false
                    },{
                        "code": 9,
                        "name":'证件齐全，无法律纠纷',
                        "state": false
                    },{
                        "code": 10,
                        "name":'空铺最好',
                        "state": false
                    },{
                        "code": 11,
                        "name":'设备齐全，接手即可营业',
                        "state": false
                    },{
                        "code": 12,
                        "name":'无转让费或转让费少',
                        "state": false
                    },{
                        "code": 13,
                        "name":'整个市区都可以',
                        "state": false
                    },{
                        "code": 14,
                        "name":'中介勿扰，不出中介费',
                        "state": false
                    }
                ]
            }
        }
})()
