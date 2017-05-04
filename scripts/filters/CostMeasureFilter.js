(function() {
    angular.module('xwWeb')
        .filter('costMeasureFilter', function() {
            return function(input) {
                var output = {
                    "1":"元",
                    "2":"万元"
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return output[input] ? output[input] : '';
            }
        })
})();
