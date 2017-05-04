/**
 * Created by xjs on 2016/8/1.
 */

(function() {
    angular.module('xwWeb')
        .filter('rentMeasureFilter', function() {
            return function(input) {
                var output = {
                    "0":"元/月",
                    "1":"元/天",
                    "2":"万元/年",
                    "3":"元/平米*月",
                    "4":"元/平米*天"
                    // "5":"面议"
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return output[input] ? output[input] : '';
            }
        })
})();
