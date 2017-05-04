(function () {
    angular.module('xwWeb')
        .filter('cityName', function () {
            return function (input) {
                var cities = {};
                var districts = JSON.parse(localStorage.getItem("districts"));
                if(!districts) {
                    //alert("请重新登陆");
                    return;
                }

                angular.forEach(districts, function (value, key) {
                    if(value.code.toString().length == 4 ) {
                        cities[value.code] = value.name;
                    }
                });

                input = typeof input != "undefined" ? input : "";
                return cities[input] ? cities[input] : '';
            }
        });
})();


