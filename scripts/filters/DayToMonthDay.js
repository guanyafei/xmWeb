/**
 * Created by xjs on 2016/7/18.
 * 天转月天
 */

(function () {
    angular.module('xwWeb')
        .filter('dayToMonthDay', function () {
            return function (input) {
                if (typeof input == "undefined") {
                    return "";
                }
                console.log("input", input);
                var result = "";
                if (input / 30 >= 1) {
                    result += Math.floor(input / 30) + "个月";
                }
                if (input % 30 >= 1) {
                    result += Math.floor(input % 30) + "天";
                }
                return result;
            }
        })
})();