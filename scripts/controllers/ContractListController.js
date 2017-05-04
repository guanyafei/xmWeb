/**
 * Created by candice on 2017/2/15.
 * @author candice
 * @file
 * @data 2017/2/15
 */

/**
 * Created by candice on 2017/2/14.
 * @author candice
 * @file
 * @data 2017/2/14
 */

define([
    'angular',
    '../services/UtilService',
    '../services/AuthService',
    '../services/BusinessService'
],function (angular) {
    return angular.module("xwWeb")
        .registerController("ContractListController", ["businessService", "utilService", "authService", "$window", "$location", ContractListController]);
    function ContractListController(businessService, utilService, authService, $window, $location) {
        var vm = this;
        var sessionId = authService.getSessionId();
        vm.pageNo = 0;
        vm.pageSize = 50;
        vm.currentPage = 1;

        vm.pageFlip = pageFlip;
        query();

        function query() {
            businessService.getContacts(sessionId, vm.currentPage - 1, vm.pageSize).then(function (result) {
                vm.totalCount = result.totalCount;
                vm.contracts = result.objects;
            }).catch(function (err) {
                utilService.showPrompt(err);
            });
        }


        //分页
        function pageFlip() {
            vm.list = [];
            $window.history.pushState({"currentPage": vm.currentPage}, '业务大厅', $location.absUrl());
            query();
        }

        $window.onpopstate = function () {
            // 获得存储在该历史记录点的currentPage对象
            var currentPage = $window.history.state;

            if (currentPage == null) {
                vm.currentPage = 1;
            } else {
                vm.currentPage = currentPage.currentPage;
            }
            if(vm.isIdentify)
                query()
        };



    }
})

