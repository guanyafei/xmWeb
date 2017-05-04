/**
 * Created by xiajingsi on 2016/6/22.
 */

define([
    'angular',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/UserService'
], function(angular) {

    'use strict';

    return angular.module('xwWeb')
        .registerController('customerBusinessSearchController', ['$rootScope', '$cookies', '$sce', 'errorService', 'userService', 'authService', customerBusinessSearchController]);

    function customerBusinessSearchController($rootScope, $cookies, $sce, errorService, userService, authService) {
        var vm = this;
        var sessionId = authService.getSessionId();
        var user = $cookies.getObject(sessionId);
        $rootScope.title = "用户业务查询";
        var iframeUrl = "http://report.xw18.cn:8081/WebReport/ReportServer?reportlet=xw%2Flist%2F%5B7528%5D%5B6237%5D%5B4e1a%5D%5B52a1%5D%5B5217%5D%5B8868%5D.cpt&code=" + sessionId;
        init();

        //基础参数
        vm.showWarning = false;
        vm.isIdentify = false;
        vm.pageTitle = "用户业务查询";

        function init() {
            //confirm identity, cant use business hall without identity validation
            userService.getUserInfo(sessionId, user.id).then(function (result) {
                    var verify = result['certificates'];
                    if (verify.length == 0) {
                        vm.showWarning = true;
                    } else {
                        for (var i = 0; i < verify.length; i++) {
                            if (verify[i] == 5) {
                                vm.isIdentify = true;
                                vm.currentProjectUrl = $sce.trustAsResourceUrl(iframeUrl);
                                console.log(vm.currentProjectUrl, "vm.currentProjectUrl");
                            } else if (i == verify.length - 1) {
                                vm.showWarning = true;
                            }
                        }
                    }
                },
                function (error) {
                    errorService.processError(error);
                });
        }

    }
});
