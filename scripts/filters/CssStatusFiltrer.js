/**
 * Created by Xjs on 2016/6/24.
 */

(function() {
    angular.module('xwWeb')
        .filter('cssStatusFilter', function() {
            return function(input) {
                var cssStatus = {
                    "0": "正在服务中",
                    "1": "申请放弃",
                    "2": "已放弃",
                    "3": "已结束服务"
                }
                input = typeof input != "undefined" ? input.toString() : "";
                return cssStatus[input] ? cssStatus[input] : '';
            }
        })
})();
