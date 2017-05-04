(function() {
  angular.module('xwWeb')
    .filter('emptyTransfer', function() {
      return function(input) {
        var emptyTransferTypes = {
          "1":"可以空转",
          "2":"不可空转"
        }
        input = typeof input != "undefined" ? input.toString() : "";
        return emptyTransferTypes[input] ? emptyTransferTypes[input] : '';
      }
    })
})();
