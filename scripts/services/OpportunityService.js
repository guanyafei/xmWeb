/**
 * Created by Leo Long on 2016/4/19.
 */
define([
    'angular',
    'services/JsonRpcService'
], function(angular) {
    'use strict';

    OpportunityService.$inject = ['jsonRpcService'];
    return angular.module('xwWeb')
        .$register.factory('OpportunityService', OpportunityService);

    function OpportunityService(jsonRpcService) {
        return {
            getList : getList,
            getInfo : getInfo,
            search : search,
            query : query,
            queryTransfer: queryTransfer,
            update: update,
            addOppExperiences: addOppExperiences,
            addOppMessage: addOppMessage
        };

        function query(sessionId,queryParam,pageNo,pageSize){
            return jsonRpcService.request('opportunity_oppQuery', {
                sessionId: sessionId,
                queryParam: queryParam,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function queryTransfer(sessionId,transferOppQueryParam,pageNo,pageSize){
                    return jsonRpcService.request('opportunity_transferOppQuery', {
                        sessionId: sessionId,
                        transferOppQueryParam: transferOppQueryParam,
                        pageNo: pageNo,
                        pageSize: pageSize
                    })
                }

        function search(sessionId,queryParams,pageNo, pageSize) {
            return jsonRpcService.request('opportunity_searchOpp', {
                sessionId: sessionId,
               /* key: key,*/
                queryParams:queryParams,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function getList(sessionId, validity, pageNo, pageSize) {
            return jsonRpcService.request('opportunity_list', {
                sessionId: sessionId,
                validity: validity,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function getInfo(sessionId,opportunityId){
            return jsonRpcService.request('opportunity_getInfo', {
                sessionId: sessionId,
                opportunityId: opportunityId
            })
        }

        function update(sessionId, id, content, clientType) {
            return jsonRpcService.request('opportunity_update', {
                sessionId: sessionId,
                id: id,
                content: content,
                clientType: clientType
            })
        }

        function addOppExperiences(sessionId,opportunityId,serviceId){
            return jsonRpcService.request('opportunity_addOppExperiences', {
                sessionId: sessionId,
                opportunityId: opportunityId,
                serviceId:serviceId

            })
        }

        function addOppMessage(sessionId,type,opportunityId, message){
            return jsonRpcService.request('opportunity_addOppMessage', {
                sessionId: sessionId,
                type: type,
                opportunityId: opportunityId,
                message: message
            })
        }

    }
});
