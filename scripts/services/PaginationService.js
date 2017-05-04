/**
 * Created by Xiajingsi on 2016/5/26.
 */
define([
    'angular',
], function (angular) {
    return angular.module('xwWeb')
        .$register.factory('paginationService', paginationService);

    paginationService.$inject = ['$location', '$window'];

    function paginationService($location, $window) {
        return {
            paginationPushStatus:paginationPushStatus
        };

        /**
         * 把当前页面放入浏览器的status
         * @param currentPage 当前页面
         * @param title 当前页面的名字
         */
        function paginationPushStatus(currentPage, title) {
            $window.history.pushState({"currentPage": currentPage}, title, $location.absUrl());
        }

        //浏览器后退触发事件
        // $window.onpopstate = function () {
        //     // 获得存储在该历史记录点的currentPage对象
        //     var currentPage = $window.history.state;
        //     if (currentPage == null) {
        //         vm.currentPage = 1;
        //     } else {
        //         vm.currentPage = currentPage.currentPage ? currentPage.currentPage : 1;
        //     }
        //
        //     if(vm.pluginId == vm.sitingPluginId) {
        //         matchTransfer()
        //     } else if (vm.pluginId == vm.transferPluginId){
        //         matchSiting()
        //     }
        //
        // };
    }
});
