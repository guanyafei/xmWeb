/**
 * Created by Administrator on 2016/8/10.
 */
(function() {
    angular.module('xwWeb')
        .filter('dealStatusFilter', function() {
            return function(input) {
                var status = {
                    "30":"1个月",
                    "60":"2个月",
                    "90":"3个月",
                    "180":"半年",
                    "365":"1年"
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return cycle[input] ? cycle[input] : '';
            }
        })
})();
