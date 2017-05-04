define([
	'angular',
	'services/JsonRpcService'
], function(angular) {
	return angular.module('xwWeb')
		.$register.factory('serviceService', ['jsonRpcService', serviceService]);

	function serviceService(jsonRpcService) {
		return {
			getServingList: getServingList, //获取业务服务列表
			getServingListNew: getServingListNew,
			getMerchant: getMerchant, //通过服务Id获取商户信息
			getPhone: getPhone, //返回某服务客服电话
			getService: getService, //获取服务详情
			getServiceDetail: getServiceDetail, //获取服务详情（新）
			abort: abort,
			cancelAbort: cancelAbort,
			take: take,
            serviceHallSearch: serviceHallSearch,//服务大厅的查询
            getCss: getCss,
		}

		function getServingList(sessionId, pageNo, pageSize) {
			return jsonRpcService.request('service_getServingList', {
				sessionId: sessionId,
				pageNo: pageNo,
				pageSize: pageSize
			})
		}

		function getServingListNew(sessionId, pluginId, status, query, pageNo, pageSize) {
			return jsonRpcService.request('service_getServingList', {
				sessionId: sessionId,
				pluginId: pluginId,
				status: status,
				query: query,
				pageNo: pageNo,
				pageSize: pageSize
			})
		}

		function getMerchant(sessionId, serviceId) {
			return jsonRpcService.request('service_getMerchant', {
				sessionId: sessionId,
				serviceId: serviceId
			})
		}

		function getPhone(sessionId, id) {
			return jsonRpcService.request('service_getPhone', {
				sessionId: sessionId,
				id: id
			})
		}

		function getService(sessionId, serviceId) {
			return jsonRpcService.request('service_get', {
				sessionId: sessionId,
				id: serviceId
			})
		}

		function getServiceDetail(sessionId, serviceId, cssId) {
			return jsonRpcService.request('service_getServiceDetail', {
				sessionId: sessionId,
				serviceId: serviceId,
				cssId: cssId
			})
		}


		function abort(sessionId, cssId) {
			return jsonRpcService.request('service_abort', {
				sessionId: sessionId,
				id: cssId
			});
		}

		function cancelAbort(sessionId, cssId) {
			return jsonRpcService.request('service_cancelAbort', {
				sessionId: sessionId,
				id: cssId
			});
		}

        function serviceHallSearch(sessionId, pluginId, industryId, districtId, keywords,orderBy, pageNo,pageSize) {
			return jsonRpcService.request('service_search', {
				sessionId: sessionId,
                pluginId: pluginId,
                industryId: industryId,
                districtId:districtId,
                keywords: keywords,
                orderBy:orderBy,
                pageNo:pageNo,
                pageSize: pageSize
			});
		}


		/********************************************************/
		/**
		 * 客服领取服务
		 *
		 * @param sessionId  客服session
		 * @param serviceId  服务Id
		 * @return           客服服务ID
		 */
		function take(sessionId, serviceId) {
			return jsonRpcService.request('service_take', {
				sessionId: sessionId,
				serviceId: serviceId
			})
		}

		/************************************************************/

        function getCss(sessionId, serviceId) {
            return jsonRpcService.request('service_getCSS', {
                sessionId: sessionId,
                serviceId: serviceId
            })

        }
	}
});
