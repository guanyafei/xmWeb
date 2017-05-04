define([
    'angular',
    'services/JsonRpcService'
], function (angular) {
    return angular.module('xwWeb')
        .$register.factory('resourceService', ['jsonRpcService', resourceService]);

    function resourceService(jsonRpcService) {
        return {
            add: add,
            getResourceList: getResourceList,
            getResourceInfo: getResourceInfo,
            matchTransfer: matchTransfer,
            matchSiting: matchSiting,
            getResourceInfo: getResourceInfo,
            matchSitingBySystem: matchSitingBySystem,
            matchTransferBySystem:matchTransferBySystem,
            searchSiting:searchSiting,
            searchTransfer:searchTransfer,
 /*         matchSitingTransferByCondition:matchSitingTransferByCondition,*/
            matchSitingTransfer:matchSitingTransfer,
            search:search,
            querySitingTransfer:querySitingTransfer,
            getSitingDetail:getSitingDetail,
            getTransferDetail:getTransferDetail
    };

        function searchSiting(sessionId,resourceId,mobile){
            return jsonRpcService.request('resource_searchSiting', {
                sessionId: sessionId,
                resourceId: resourceId,
                mobile: mobile
            })
        }

        function searchTransfer(sessionId,resourceId,mobile){
            return jsonRpcService.request('resource_searchTransfer', {
                sessionId: sessionId,
                resourceId: resourceId,
                mobile: mobile
            })
        }

        function matchTransferBySystem(sessionId,serviceId,type,pageNo,pageSize){
            return jsonRpcService.request('resource_matchTransferBySystem', {
                sessionId: sessionId,
                serviceId: serviceId,
                type: type,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function matchSitingBySystem(sessionId,serviceId,type,pageNo,pageSize){
            return jsonRpcService.request('resource_matchSitingBySystem', {
                sessionId: sessionId,
                serviceId: serviceId,
                type: type,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function add(sessionId, mobile, name) {
            return jsonRpcService.request('resource_add', {
                sessionId: sessionId,
                mobile: mobile,
                name: name
            })
        }

        function getResourceList(sessionId, mobile, pageNo, pageSize) {
            return jsonRpcService.request("resource_getList", {
                sessionId: sessionId,
                mobile: mobile,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function getResourceInfo(sessionId, resourceId) {
            return jsonRpcService.request("resource_getInfo", {
                sessionId: sessionId,
                resourceId: resourceId
            })
        }

        function matchTransfer(sessionId, serviceId, resourceMatch, pageNo, pageSize) {
            return jsonRpcService.request("resource_matchTransfer", {
                sessionId: sessionId,
                serviceId: serviceId,
                resourceMatch: resourceMatch,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function matchSiting(sessionId, serviceId, resourceMatch, pageNo, pageSize) {
            return jsonRpcService.request("resource_matchSiting", {
                sessionId: sessionId,
                serviceId: serviceId,
                resourceMatch: resourceMatch,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function getResourceInfo(sessionId, resourceId) {
            return jsonRpcService.request("resource_getInfo", {
                sessionId: sessionId,
                resourceId: resourceId
            })
        }

        function matchSitingTransferByCondition(sessionId,pluginId,condition,type,pageNo,pageSize){
            return jsonRpcService.request("resource_matchSitingTransferByCondition", {
                sessionId: sessionId,
                pluginId: pluginId,
                condition:condition,
                type:type,
                pageNo:pageNo,
                pageSize:pageSize
            })
        }

        function matchSitingTransfer(sessionId,opportunityId,type,pageNo,pageSize){
            return jsonRpcService.request("resource_matchSitingTransfer", {
                sessionId: sessionId,
                opportunityId: opportunityId,
                type:type,
                pageNo:pageNo,
                pageSize:pageSize
            })
        }

        function search(sessionId,pluginId,searchParams,pageNo,pageSize){
            return jsonRpcService.request("resource_search", {
                sessionId: sessionId,
                pluginId:pluginId,
                searchParams:searchParams,
                pageNo:pageNo,
                pageSize:pageSize
            })
        }

        function querySitingTransfer(sessionId,cityId,pluginId,queryParams,pageNo,pageSize){
            return jsonRpcService.request("resource_querySitingTransfer", {
                sessionId: sessionId,
                cityId: cityId,
                pluginId:pluginId,
                queryParams:queryParams,
                pageNo:pageNo,
                pageSize:pageSize
            })
        }

        //获取找店信息详情
        function getSitingDetail(sessionId,opportunityId){
            return jsonRpcService.request("resource_getSitingDetail", {
                sessionId: sessionId,
                opportunityId: opportunityId
            })
        }
        ////获取转店信息详情
        function getTransferDetail(sessionId,opportunityId){
            return jsonRpcService.request("resource_getTransferDetail", {
                sessionId: sessionId,
                opportunityId: opportunityId
            })
        }
    }
});
