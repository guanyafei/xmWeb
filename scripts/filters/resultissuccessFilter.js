/**
 * Created by Administrator on 2016/11/3.
 */
(function() {
    angular.module('xwWeb')
        .filter('resultissuccessFilter', function() {
            return function(input) {
                var mode = {
                    "0": "成功",
                    "1":"失败",
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return mode[input] ? mode[input] : '';
            }
        })
})();
