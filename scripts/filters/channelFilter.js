/**
 * Created by Administrator on 2017/1/10.
 */
(function() {
    angular.module('xwWeb')
        .filter('channelName', function() {
            return function(input) {
                var statuses = {
                    "11":"首页",
                    "12":"转店频道",
                    "13":"招租频道",
                    "14":"找店频道",
                    "15":"招聘频道",
                    "16":"消费频道",
                    "17":"经营频道"
                }
                input = typeof input != "undefined" ? input.toString() : "";
                return statuses[input] ? statuses[input] : '';
            }
        })
})();
