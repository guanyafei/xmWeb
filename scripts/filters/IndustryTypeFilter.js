/**
 * Created by xjs on 2016/8/1.
 */

(function() {
    angular.module('xwWeb')
        .filter('industryTypeFilter', function() {
            return function(input) {
                var output = {
                    "1":"个人",
                    "2":"加盟",
                    "3":"直营"
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return output[input] ? output[input] : '';
            }
        })
})();
