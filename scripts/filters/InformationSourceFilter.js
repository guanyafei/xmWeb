/**
 * Created by xjs on 2016/8/1.
 */
(function() {
    angular.module('xwWeb')
        .filter('informationSourceFilter', function() {
            return function(input) {
                var output = {

                    "0":"其它",
                    "1":"公司网站",
                    "2":"收费续费",
                    "3":"户外",
                    "4":"58同城",
                    "5":"其他分类网站",
                    "6":"主动来电",
                    "7":"独家信息",
                    "8":"报纸客户",
                    "9":"商户发布"
                }
                input = typeof input != "undefined" ? input.toString() : "";
                return output[input] ? output[input] : '';
            }
        })
})();
