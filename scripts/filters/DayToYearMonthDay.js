/**
 * Created by xjs on 2016/7/28.
 */
(function () {
    angular.module('xwWeb')
        .filter('dayToYearMonthDay', function () {
            return function (input) {
                if (typeof input == "undefined") {
                    return "";
                }

                var result = "";

                if (input / 365 >= 1) {
                    result += Math.floor(input / 365) + "年";

                    var month = Math.floor((input - Math.floor(input / 365) * 365)/ 30);
                    if(month > 0) {
                        result += month + "个月";
                    }

                    var day = Math.floor(input - Math.floor(input / 365) * 365);
                    if (day % 30 >= 1) {
                        result += Math.floor(day % 30) + "天";
                    }
                } else if(input / 30 >= 1){
                    result += Math.floor(input / 30) + "个月";

                    if (input % 30 >= 1) {
                        result += Math.floor(input % 30) + "天";
                    }
                }

                return result;
            }
        })
})();