/**
 * Created by xiajingsi on 2016/4/27.
 */
define([
    'angular',
    'services/JsonRpcService'
], function (angular) {
    return angular.module('xwWeb')
        .$register.factory('priceService', ['jsonRpcService', priceService]);

    function priceService(jsonRpcService) {
        return {
            get: get,
            getByChannel: getByChannel,
            getByOpportunity: getByOpportunity
        };

        function get(pluginId, param) {
            return jsonRpcService.request('price_get', {
                pluginId: pluginId,
                param: param
            })
        }

        function getByChannel(sessionId, channel, status, pageNo, pageSize) {
            return jsonRpcService.request('price_getByChannel', {
                sessionId: sessionId,
                channel: channel,
                status: status,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function getByOpportunity(opportunityId, param) {
            return jsonRpcService.request('price_getByOpportunity', {
                opportunityId: opportunityId,
                param: param
            })
        }


    }
});
