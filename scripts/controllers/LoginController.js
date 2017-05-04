define([
    'angular',
    '../services/AuthService',
    '../services/ErrorMessageService',
    '../services/ErrorService',
    '../services/baseData.service'
], function (angular) {
    return angular.module('xwWeb')
        .registerController('loginController', ['baseDataService','CONFIG', '$location', 'authService', 'errorService', loginController]);

    function loginController(baseDataService, CONFIG, $location, authService, errorService) {
        var homePage = CONFIG.homePage;
        var vm = this;
        vm.title = "登录";
        vm.username = "";
        vm.password = "";
        vm.deviceType=getOs();
        vm.loginDevice={
            "platform":4,
            "ip":"192.168.1.158",
            "deviceId":"",
            "deviceType":2,
            "deviceLabel":vm.deviceType
        };
        vm.errorMessage = "";
        vm.login = login;

        init();


        function getOs()
        {
            var OsObject = "";
            if(navigator.userAgent.indexOf("MSIE")>0) {
                return "MSIE";
            }
            if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
                return "Firefox";
            }
            if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
                return "Safari";
            }
            if(isCamino=navigator.userAgent.indexOf("Camino")>0){
                return "Camino";
            }
            if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
                return "Gecko";
            }
        }
        function init() {
           /* console.log("lalal",vm.loginDevice);*/
            var sessionId = authService.getSessionId();
            if (sessionId) {
                authService.hasLoggedIn(sessionId).then(function () {
                    $location.path(homePage);
                }, function () {
                    authService.clearSession();
                });
            }
        } 
 
        function login() {
            if (vm.username == "" || vm.password == "") {
                vm.errorMessage = "用户名或密码不能为空";
            } else {
                authService.login(vm.username, vm.password ,vm.loginDevice ).then(function (result) {
                    return authService.storeSession(result).then(function () {
                        baseDataService.init(result).then(function () {
                            console.log("请求成功");
                        }).catch(function (err) {
                            errorService.processError(err);
                        });
                        $location.path(homePage);
                    }).catch(function (error) {
                        alert(error + ",请稍后尝试");
                    });
                }).catch(function (err) {
                    errorService.processError(err);
                });
            }
        }
    }
});
