define([
  'angular',
  'services/JsonRpcService'
], function(angular) {
  angular.module('xwWeb')
    .$register.factory('remarkService', remarkService);

  remarkService.$inject = ['jsonRpcService'];

  function remarkService(jsonRpcService) {
    return {
      getList: getList,
      add: add,
        batchDelete:batchDelete,
        RelationRemark:RelationRemark

    }

    function getList(sessionId, opportunityId, pageNo, pageSize) {
      return jsonRpcService.request('remark_getList', {
        sessionId: sessionId,
        opportunityId: opportunityId,
        pageNo: pageNo,
        pageSize: pageSize
      })
    }

    function add(sessionId, opportunityId, type, content) {
      return jsonRpcService.request('remark_add', {
        sessionId: sessionId,
        opportunityId: opportunityId,
        type: type,
        content: content
      })
    }

    function batchDelete(sessionId, oppRemarkIds) {
      return jsonRpcService.request('remark_batchDelete', {
        sessionId: sessionId,
          oppRemarkIds: oppRemarkIds
      })
    }

      function RelationRemark(sessionId, oppId, pageNo, pageSize){
          return jsonRpcService.request('remark_getRelationRemark', {
              sessionId: sessionId,
              oppId: oppId,
              pageNo: pageNo,
              pageSize: pageSize

          })
      }
  }
});
