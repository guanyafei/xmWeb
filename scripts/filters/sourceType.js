(function() {
    angular.module('xwWeb')
        .filter('sourceType', function() {
            return function(input) {
                var sourceTypes = {
                    "0":"全部",
                    "1":"58",
                    "2":"赶集",
                    "3":"百姓"
                };
                input = typeof input != "undefined" ? input.toString() : "";
                return sourceTypes[input] ? sourceTypes[input] : '';
            }
        })
})();
