(function() {
    angular.module('xwWeb')
        .filter('shop_status', function() {
            return function(input) {
                var shop_status = {
                    "1":"新铺",
                    "2":"空铺",
                    "3":"营业中"
                };
                if(input != null ) {
                    input = typeof input != "undefined" ? input.toString() : "";
                    return shop_status[input] ? shop_status[input] : '';
                } else {
                    console.log(input);
                }

            }
        })
})();
