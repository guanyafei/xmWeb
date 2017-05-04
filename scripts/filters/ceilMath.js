(function() {
    angular.module('xwWeb')
        .filter('ceilMath', function() {
            return function(input) {
                return Math.ceil(input)?Math.ceil(input):0;
            }
        })
})();
