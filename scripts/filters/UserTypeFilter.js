/**
 * Created by xjs on 2016/8/8.
 */
(function() {
    angular.module('xwWeb')
        .filter('userTypeFilter', function() {
            return function(input) {
                var validity = {
                    "0":"其他",
                    "1":"职业型",
                    "2":"自由型",
                    "3":"中介",
                    "4":"事业型",
                    "5":"系统管理账号"
                }
                input = typeof input != "undefined" ? input.toString() : "";
                return validity[input] ? validity[input] : '';
            }
        })
})();
