(function() {
  angular.module('xwWeb')
    .filter('businessStatus', function() {
      return function(input) {
        var statuses = {
          "0": "未领取",
          "1":"业务中",
          "2":"签约中",
          "3":"已成交",
          "4":"已联系"
        }
        input = typeof input != "undefined" ? input.toString() : "";
        return statuses[input] ? statuses[input] : '';
      }
    })
})();
