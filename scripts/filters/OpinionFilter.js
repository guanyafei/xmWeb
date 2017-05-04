/**
 * Created by Xiajingsi on 2016/6/23.
 * 评价
 */

(function() {
    angular.module('xwWeb')
        .filter('opinionFilter', function() {
            return function(input) {
                var mode = {
                    "-1": "未评价",
                    "0":"非常满意",
                    "1":"满意",
                    "2":"一般",
                    "3":"不满意",
                    "4":"非常不满意"
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return mode[input] ? mode[input] : '';
            }
        })
})();

