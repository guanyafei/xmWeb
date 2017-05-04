define([
	'angular',
	'services/JsonRpcService'
], function(angular) {
	return angular.module('xwWeb')
		.$register.factory('resourceHistoryService', resourceHistoryService);

	resourceHistoryService.$inject = ['jsonRpcService'];

	function resourceHistoryService(jsonRpcService) {

		var service = {
			list: list,
			add: add
		};

		return service;

		//////////////////////////////////////////////////

		/**
		 * 确认记录列表
		 * @param sessionId  sessionId
		 * @param resourceId  资源Id
		 * @param pageNo       页码
		 * @param pageSize     页行数
		 * @return              记录列表
		 */
		function list(sessionId, resourceId, pageNo, pageSize) {
			console.log(sessionId, resourceId, pageNo, pageSize);
			return jsonRpcService.request('resourceHistory_list', {
				sessionId: sessionId,
				resourceId: resourceId,
				pageNo: pageNo,
				pageSize: pageSize
			});
		}

		/**
		 * 增加确认记录
		 * @param sessionId    用户sessionId
		 * @param resourceId   资源Id
		 * @param content      记录内容
		 * @return              记录Id
		 */
		function add(sessionId,resourceId,content) {
			console.log(sessionId,resourceId,content);
			return jsonRpcService.request('resourceHistory_add', {
				sessionId: sessionId,
				resourceId: resourceId,
				content: content
			});
		}
	}
});