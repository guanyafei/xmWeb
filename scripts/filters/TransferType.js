(function() {
  angular.module('xwWeb')
    .filter('transferType', function() {
      return function(input) {
        var transferTypes = {
          "0":"全部",
          "1":"店铺转让",
          "2":"出租招商",
            "3":"找店"
        };
        input = typeof input != "undefined" ? input.toString() : "";
        return transferTypes[input] ? transferTypes[input] : '';
      }
    })
})();
