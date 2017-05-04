/**
 * Created by Administrator on 2017/3/9.
 */
define([
    'angular',
    'services/JsonRpcService'
], function(angular) {
    return angular.module('xwWeb')
        .$register.factory('spiderInfoService', ['jsonRpcService', spiderInfoService]);

    function spiderInfoService(jsonRpcService){
        return {
            querySpiderInfo: querySpiderInfo
        };

        function querySpiderInfo(sessionId, queryParam, pageNo, pageSize) {
            return jsonRpcService.request('spider_querySpiderInfo',{
                sessionId: sessionId,
                queryParam: queryParam,
                pageNo: pageNo,
                pageSize:pageSize
            })
        }
    }
});
