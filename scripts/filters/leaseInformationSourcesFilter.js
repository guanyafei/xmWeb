/**
 * Created by Administrator on 2016/8/16.
 */
/**
 * Created by xjs on 2016/8/1.
 */
(function() {
    angular.module('xwWeb')
        .filter('leaseInformationSourceFilter', function() {
            return function(input) {
                var output = {
                    "0":"其它",
                    "1":"个人",
                    "2":"接听电话",
                    "3":"客户提供",
                    "4":"公司网站",
                    "5":"58同城",
                    "6":"其他分类网站",
                    "7":"商户发布"
                }
                input = typeof input != "undefined" ? input.toString() : "";
                return output[input] ? output[input] : '';
            }
        })
})();
