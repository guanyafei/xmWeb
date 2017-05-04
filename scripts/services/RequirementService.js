define([
    'angular',
    'services/JsonRpcService'
], function (angular) {
    return angular.module('xwWeb')
        .$register.factory('requirementService', ['jsonRpcService', requirementService]);

    function requirementService(jsonRpcService) {
        return {
            getList: getList,
            getRequirementDetail: getRequirementDetail,
            update: update,
            refresh: refresh,
            matchSiting:matchSiting,
            matchTransfer:matchTransfer,
            searchTransfer:searchTransfer,
            searchSiting:searchSiting,
            getInfo : getInfo
        };

        function searchSiting(sessionId,resourceId,mobile){
            return jsonRpcService.request('requirement_searchSiting', {
                sessionId: sessionId,
                resourceId: resourceId,
                mobile: mobile
            })
        }

        function searchTransfer(sessionId,resourceId,mobile){
            return jsonRpcService.request('requirement_searchTransfer', {
                sessionId: sessionId,
                resourceId: resourceId,
                mobile: mobile
            })
        }

        function getInfo(requirementId){
            return jsonRpcService.request('requirement_get', {
                requirementId: requirementId
            })
        }

        function matchSiting(sessionId,resourceId,pageNo,pageSize){
            return jsonRpcService.request('requirement_matchSiting', {
                sessionId: sessionId,
                resourceId: resourceId,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function matchTransfer(sessionId,resourceId,pageNo,pageSize){
            return jsonRpcService.request('requirement_matchTransfer', {
                sessionId: sessionId,
                resourceId: resourceId,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function getList(sessionId, serviceId, status, pageNo, pageSize) {
            return jsonRpcService.request('requirement_list', {
                sessionId: sessionId,
                serviceId: serviceId,
                status: status,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function getRequirementDetail(requirementId) {
            return jsonRpcService.request('requirement_get', {
                requirementId: requirementId
            })
        }

        function update(sessionId, requirementId, pluginId, content) {
            return jsonRpcService.request('requirement_update', {
                sessionId: sessionId,
                requirementId: requirementId,
                pluginId: pluginId,
                content: content
            })
        }

        function refresh(sessionId, requirementId) {
            return jsonRpcService.request('requirement_refresh', {
                sessionId: sessionId,
                requirementId: requirementId
            })
        }
    }
})
