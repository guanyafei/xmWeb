/**
 * Created by Administrator on 2016/11/1.
 */
/**
 * Created by Xiajingsi on 2016/6/23.
 * 评价
 */

(function() {
    angular.module('xwWeb')
        .filter('examplesortFilter', function() {
            return function(input) {
                var mode = {
                    "0": "普通案例",
                    "1":"忠诚案例",
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return mode[input] ? mode[input] : '';
            }
        })
})();

