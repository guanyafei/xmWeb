/**
 * Created by Administrator on 2016/11/3.
 */
(function() {
    angular.module('xwWeb')
        .filter('endreasonFilter', function() {
            return function(input) {
                var mode = {

                    "1":"服务到期",
                    "2": "人工推荐成交",
                    "3":"宣传推广成交",
                    "4": "自己转出去了",
                    "5":"房东收回",
                    "6": "店铺不转了",
                    "7":"手机空号或停机",

                };
                input = typeof input != "undefined" ? input.toString() : "";
                return mode[input] ? mode[input] : '';
            }
        })
})();
