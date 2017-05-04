(function (){
    angular.module('xwWeb')
        .filter('typeFilter', function() {
            return function(input){
                var reg = /^[0-9]{11}$/;
                var flag = reg.test(input);
                return flag;
            }
        })
})();
