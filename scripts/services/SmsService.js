/**
 * Created by Administrator on 2017/3/6.
 */
define([
    'angular',
    'services/JsonRpcService'
], function(angular){
    'use strict';

    smsService.$inject=['jsonRpcService'];
    return angular.module('xwWeb')
        .$register.factory('smsService', smsService);

    function smsService(jsonRpcService){
        return {
            getSmsNum: getSmsNum,
            sendSms: sendSms,
            queryCustomer: queryCustomer,
            searchCustomer: searchCustomer,
            // 缓存，便于senMessageController和invalidSendMessageController之间共享数据
            cacheSmsServiceData: {
                selectedCustoms: [],
                cacheResourceList: [],
                totalCount: 0,
                queryParam: {},
                cacheAllSelect: {}
            }
        };

        function getSmsNum(sessionId){
            return jsonRpcService.request('sms_getSmsNum',{
                sessionId: sessionId
            })
        }

        function sendSms(sessionId, oppIds, content, type){
            return jsonRpcService.request('sms_sendSms', {
                sessionId: sessionId,
                oppIds: oppIds,
                content: content,
                type: type
            })
        }

        function queryCustomer(sessionId, queryParam, pageNo, pageSize){
            return jsonRpcService.request('sms_queryCustomer', {
                sessionId: sessionId,
                queryParam: queryParam,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function searchCustomer (sessionId, searchParam, pageNo, pageSize){
            return jsonRpcService.request('sms_searchCustomer', {
                sessionId: sessionId,
                searchParam: searchParam,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }
    }
});
