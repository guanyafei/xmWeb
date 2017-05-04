define([
    'angular',
    '../services/AuthService',
    '../services/UserService',
    '../services/ErrorService',
    '../services/baseData.service'
], function (angular) {
    return angular.module('xwWeb')
        .registerController('cityController', ['baseDataService', '$rootScope', '$location', 'authService', 'userService', 'errorService', '$timeout', cityController]);

    function cityController(baseDataService, $rootScope, $location, authService, userService, errorService, $timeout) {
        var sessionId = authService.getSessionId();
        var vm = this;
        $rootScope.$on('$locationChangeSuccess', function (evt, newUrl, oldUrl) {
            vm.originUrl = oldUrl;
        });

        vm.change = change;
        vm.cities = baseDataService.getCityByPinyin();

        console.log(vm.cities, "vm.cities");

        vm.hotCities = [
            {
                "id": "1101",
                "name": "北京"
            },
            {
                "id": "3101",
                "name": "上海"
            },
            {
                "id": "4401",
                "name": "广州"
            },
            {
                "id": "4403",
                "name": "深圳"
            },
            {
                "id": "3301",
                "name": "杭州"
            },
            {
                "id": "5001",
                "name": "重庆"
            }
        ];

        function change(cityId) {
            userService.setCity(sessionId, cityId).then(function () {
                authService.restoreSession(sessionId);
                if(vm.originUrl){
                    var index = vm.originUrl.indexOf("#/");
                    if( vm.originUrl.slice(index + 1) == '/city') {
                        $location.path('/business');
                    } else {
                        $location.path(vm.originUrl);
                    }
                } else {
                    $location.path('/business');
                }



            }, function (error) {
                errorService.processError(error);
            });
        }


    }
});
