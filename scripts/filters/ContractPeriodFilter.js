/**
 * Created by xjs on 2016/8/8.
 */

(function() {
    angular.module('xwWeb')
        .filter('contractPeriodFilter', function() {
            return function(input) {
                var output = {
                    "0":"未知",
                    "6":"半年",
                    "12":"1年",
                    "24":"2年",
                    "36":"3年",
                    "48":"4年",
                    "60":"5年",
                    "72":"6年",
                    "84":"7年",
                    "96":"8年",
                    "108":"9年",
                    "120":"10年",
                    "132":"11年",
                    "144":"12年",
                    "156":"13年",
                    "168":"14年",
                    "180":"15年"
                }
                input = typeof input != "undefined" ? input.toString() : "";
                return output[input] ? output[input] : input+"年";
            }
        })
})();
