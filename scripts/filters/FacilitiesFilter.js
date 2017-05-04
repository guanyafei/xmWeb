/**
 * Created by xjs on 2016/8/1.
 */

(function() {
    angular.module('xwWeb')
        .filter('facilitiesFilter', function() {
            return function(input) {
                var output = {
                    "1":"可明火",
                    "2":"上下水",
                    "3":"380V",
                    "4":"煤气管道",
                    "5":"排烟管道",
                    "6":"排污管道",
                    "7":"停车位",
                    "8":"产权",
                    "9":"证件齐全"
                }
                input = typeof input != "undefined" ? input.toString() : "";
                return output[input] ? output[input] : '';
            }
        })
})();
