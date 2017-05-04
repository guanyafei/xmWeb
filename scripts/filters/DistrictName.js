(function () {
    angular.module('xwWeb')
        .filter('districtName', function () {
            return function (input) {
                var districtsObj = {} ;
                var districts = JSON.parse(localStorage.getItem("districts"));

                if(!districts) {
                    //alert("请重新登陆");
                    return;
                }

                angular.forEach(districts, function (value, key) {
                    if(value.code.toString().length == 6 || value.code.toString().length == 8) {
                        districtsObj[value.code] = value.name;
                    }
                });

                if((input != null) && (typeof input != "undefined")) {
                    input = typeof input != "undefined" ? input : "";
                    return districtsObj[input] ? districtsObj[input] : '';
                } else {
                    console.log("请选择");
                }
            }
        })
})();
