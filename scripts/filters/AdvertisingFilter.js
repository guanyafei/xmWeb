/**
 * Created by xjs on 2016/7/18.
 */

(function() {
    angular.module('xwWeb')
        .filter('advertisingFilter', function() {
            return function(input) {
                var cycle = {
                    "1": "1.焦点广告",
                    "2": "2.右侧图文广告",
                    "3": "3.精选图文广告",
                    "4": "4.右侧最新标题广告",
                    "5": "5.精选左侧广告位",
                    "6": "6.精选商铺广告位",
                    "7": "7A.横幅广告",
                    "8": "7B.横幅广告",
                    "9": "7C.横幅广告",
                    "10": "8.最热图文广告",
                    "11": "9.最热框架广告",
                    "12": "10.1F行业大图广告",
                    "13": "11.1F行业左侧广告位",
                    "14": "12.1F行业推荐广告位",
                    "15": "13.1F行业标题广告位",
                    "16": "14.热门转让广告位",
                    "17": "15.低价急转广告位"
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return cycle[input] ? cycle[input] : '';
            }
        })
})();
