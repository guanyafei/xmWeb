/**
 * Created by Xiajingsi on 2016/4/20. 服务方式过滤器
 */
(function() {
    angular.module('xwWeb')
        .filter('reqTypeFilter', function() {
            return function(input) {
                var type = {
                    "0": "全部",
                    "1": "店铺转让",
                    "2": "出租招商"
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return type[input] ? type[input] : '';
            }
        })
})();

