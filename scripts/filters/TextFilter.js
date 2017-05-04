(function() {
    angular.module('xwWeb')
        .filter('textFilter', function() {
            return function(input){
                var output = input.replace(/联系我时，请说是在(.*)上看到的，谢谢！/,"");
                // input.replace(/联系我时，请说是在58同城上看到的，谢谢！/,"");
                return output;
            }
        })
})();
