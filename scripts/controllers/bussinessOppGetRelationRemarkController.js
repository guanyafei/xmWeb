/**
 * Created by Administrator on 2017/2/22.
 */
'use strict';
define([
    'angular',
    '../services/AuthService',
    '../services/OpportunityService',
    '../services/ErrorService',
    '../directives/scrollThumb/ScrollThumbDirective',
    '../services/IndustryService',
    '../services/BusinessService',
    '../services/UserService',
    '../services/RemarkService'
], function (angular) {
    bussinessOppGetRelationRemarkController.$inject = ['remarkService', '$stateParams', 'businessService', "authService", "errorService", 'userService'];

    return angular.module('xwWeb')
        .registerController('bussinessOppGetRelationRemarkController', bussinessOppGetRelationRemarkController);

    function bussinessOppGetRelationRemarkController(remarkService, $stateParams, businessService, authService, errorService, userService) {
        var vm = this;
        vm.oppId = $stateParams.oppId ? $stateParams.oppId : 0;
        vm.businessId = $stateParams.businessId ? $stateParams.businessId : 0;
        vm.list = [];
        vm.pageSize = 30;
        vm.currentPage = 1;
        vm.totalCount = 0;
        vm.remarkContent = "";
        vm.RelationRemark = RelationRemark;
        vm.getContent = "";
        vm.getAvatar = "";

        ///////////////////////////////

        var sessionId = authService.getSessionId();
        init();

        function init() {
            if (vm.businessId != 0) {
                businessService.get(sessionId, vm.businessId).then(function (result) {
                    vm.oppId = result.opportunityId;
                    RelationRemark();
                }, function () {
                });
            } else {
                RelationRemark();
            }

            userService.getProfile(sessionId).then(function (result) {
                vm.userId = result.id;
            })

        }

        function RelationRemark() {
            remarkService.RelationRemark(sessionId, vm.oppId, vm.currentPage - 1, vm.pageSize)
                .then(
                    function (data) {
                        vm.totalCount = data.totalCount;
                        vm.list = data['objects'];
                        vm.getContent = vm.totalCount ? "" : "暂无关联备注";
                        // vm.userId = data.userId;
                        // userService.getUserInfo(sessionId, vm.userId).then(function (result) {
                        //     vm.getAvatar = result.userAvatarUrl;
                        // }, function () {
                        //
                        // });
                    },function(){

                    })


        }
    }
});
