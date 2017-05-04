/**
 * Created by xjs on 2016/7/13.
 */
define([
    'angular',
    'services/JsonRpcService'
], function (angular) {
    return angular.module("xwWeb")
        .$register.factory('accuseService', ['jsonRpcService', accuseService]);

    function accuseService(jsonRpcService) {
        return {
            add: add
        }

        function add(sessionId, type, targetId, reason, description) {
            return jsonRpcService.request('accuse_add', {
                sessionId: sessionId,
                type: type,
                targetId: targetId,
                reason: reason,
                description: description
            })
        }
    }
})
