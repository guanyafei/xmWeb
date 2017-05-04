(function () {
    angular.module('xwWeb')
        .filter('industryName', function () {
            return function (input) {
                var industriesObj = {};
                var industry = JSON.parse(localStorage.getItem("industry"));
                if(!industry) {
                    //alert("请重新登陆");
                    return;
                }

                angular.forEach(industry, function (value, key) {
                    industriesObj[value.code] = value.name;
                });

                if ((input != null) && (typeof input != "undefined")) {
                    input = typeof input != "undefined" ? input : "";
                    return industriesObj[input] ? industriesObj[input] : '';
                } else {
                }
            }
        })
})();


