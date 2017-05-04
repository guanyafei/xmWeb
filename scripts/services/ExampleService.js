define([
    'angular',
    'services/JsonRpcService'
], function (angular) {
    angular.module('xwWeb')
        .$register.factory('exampleService', ['jsonRpcService', exampleService]);

    function exampleService(jsonRpcService) {
        return {
            getList: getList,
            get: get,
            setServiceExample: setServiceExample,
            recommendExample: recommendExample,
            queryExample:queryExample,
            searchExample:searchExample,
            getExampleRemark: getExampleRemark//获取案例备注（新）
        }

        function getList(sessionId, pluginId, cityId, pageNo, pageSize) {
            return jsonRpcService.request('example_getList', {
                sessionId: sessionId,
                pluginId: pluginId,
                cityId: cityId,
                pageNo: pageNo,
                pageSize: pageSize
            })
        }

        function get(sessionId, serviceId) {
            return jsonRpcService.request('example_get', {
                sessionId: sessionId,
                serviceId: serviceId
            })
        }

        function setServiceExample(sessionId, serviceId, photos, procedure) {
            return jsonRpcService.request('example_set2', {
                sessionId: sessionId,
                serviceId: serviceId,
                photos: photos,
                procedure: procedure
            })
        }

        function recommendExample(sessionId, exampleId, businessId) {
            return jsonRpcService.request('example_recommendExample', {
                sessionId: sessionId,
                exampleId: exampleId,
                businessId: businessId
            })
        }
        function queryExample(sessionId,cityId,pluginId,params,pageNo,pageSize){
            return jsonRpcService.request("example_queryExample",{
                sessionId:sessionId,
                cityId:cityId,
                pluginId:pluginId,
                params:params,
                pageNo:pageNo,
                pageSize:pageSize
            })
        }

        function searchExample(sessionId,cityId,pluginId,searchParams,pageNo,pageSize){
            return jsonRpcService.request("example_searchExample",{
                sessionId:sessionId,
                cityId:cityId,
                pluginId:pluginId,
                searchParams:searchParams,
                pageNo:pageNo,
                pageSize:pageSize
            })
        }
        function getExampleRemark(sessionId, exampleId) {
            return jsonRpcService.request('example_getExampleRemark', {
                sessionId: sessionId,
                exampleId: exampleId
            })
        }
    }
});
