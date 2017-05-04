define([
	'angular',
	'services/JsonRpcService'
], function(angular) {
	return angular.module('xwWeb')
		.$register.factory('appealService', appealService);

	appealService.$inject = ['jsonRpcService'];

	function appealService(jsonRpcService) {

		var service = {
			add: add
		};

		return service;

		//////////////////////////////////////////////////

		/**
		 * 添加申诉
		 *
		 * @param sessionId 用户session
		 * @param source    来源类型。0=资源
		 * @param bizId     业务信息id。当source=0时，bizId填写资源Id。
		 * @param reason    申诉理由
		 */
		function add(sessionId,source,bizId,reason) {
			console.log(sessionId,source,bizId,reason);
			return jsonRpcService.request('appeal_add', {
				sessionId: sessionId,
				source: source,
				bizId: bizId,
				reason: reason
			});
		}
	}
});