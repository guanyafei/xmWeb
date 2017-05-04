(function () {
    angular.module('xwWeb')
        .filter('contactLen', function () {
            return function (input) {
                input = typeof input != "undefined" ? input.toString() : "";
                  output=input.substring(0,7);
                  return output;
            }
        });
})();
