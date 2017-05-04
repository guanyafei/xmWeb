define([
  'angular',
  'services/JsonRpcService'
], function(angular) {
  return angular.module('xwWeb')
    .$register.factory('postService', postService);

  postService.$inject = ['jsonRpcService'];

  function postService(jsonRpcService) {
    return {
      lock: lock,//锁定
      post: post,//发布
      postAndTake: postAndTake,//发布并领取
      search: search,//搜索
      take: take,//领取
      get: get,//详情
      update: update,//完善商机
      checkMobileToExistsOther:checkMobileToExistsOther, //当前号码是否是其他商机的其他号码时
        checkMobileToExists:checkMobileToExists//判断其他号码字段的号码
    };


    function lock(sessionId, mobile, contact, pluginId) {
      return jsonRpcService.request('opportunity_lock', {
        sessionId: sessionId,
        mobile: mobile,
        contact: contact,
        pluginId: pluginId
      })
    }

    function post(sessionId, mobile, contact, pluginId,title, description, values) {
      return jsonRpcService.request('opportunity_add', {
        sessionId: sessionId,
        mobile: mobile,
        contact: contact,
        pluginId: pluginId,
        title:title,
        description: description,
        values: values
      })
    }

        function postAndTake(sessionId, mobile, contact, pluginId,title, description, values) {
          return jsonRpcService.request('business_postAndTake', {
            sessionId: sessionId,
            mobile: mobile,
            contact: contact,
            pluginId: pluginId,
            title:title,
            description: description,
            values: values
          })
        }

        function search(sessionId, query, cursor, pageNo, pageSize) {
          return jsonRpcService.request('opportunity_search', {
            sessionId: sessionId,
            query: query,
            cursor: cursor,
            pageNo: pageNo,
            pageSize: pageSize
          })
        }

        function take(sessionId, opportunityId) {
          return jsonRpcService.request('business_take', {
            sessionId: sessionId,
            opportunityId: opportunityId
          })
        }

        function get(sessionId, opportunityId) {
          return jsonRpcService.request('opportunity_getInfo', {
            sessionId: sessionId,
            opportunityId: opportunityId
          })
        }

        function update(sessionId, opportunityId, content) {
          return jsonRpcService.request('opportunity_update', {
            sessionId: sessionId,
            id: opportunityId,
            content: content
          })
        }

       function checkMobileToExistsOther(mobile,pluginId){
           return jsonRpcService.request("opportunity_checkMobileToExists",{
               mobile:mobile,
               pluginId:pluginId
           })
       }

      function checkMobileToExists(mobile,pluginId){
          return jsonRpcService.request("opportunity_checkMobileToExistsOther",{
              mobile:mobile,
              pluginId:pluginId
          })
      }
  }
});
