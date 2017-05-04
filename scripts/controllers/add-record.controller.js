define([
	'angular',
	'../services/AuthService',
	'../services/ErrorService',
	'../services/resource-history.service',
	'../services/appeal.service'
], function(angular) {
	'use strict';
	angular.module('xwWeb')
		.registerController('AddRecordController', AddRecordController);

	AddRecordController.$inject = ['resource', 'authService', 'resourceHistoryService', 'appealService','$uibModalInstance','$window']

	function AddRecordController(resource, authService, resourceHistoryService, appealService,$uibModalInstance,$window) {
		var sessionId = authService.getSessionId();
		var vm = this;

		console.info("ppppiiiiii",resource);

		//		vm.resourceHistoryModal = resourceHistoryModal; //确认记录列表
		vm.add = add; //增加确认记录
		vm.appealAdd = appealAdd; //添加申诉
		vm.cancel = cancel;

		init();

		//////////////////////////////////////////

		function init() {
			resourceHistoryModal(resource);
		}

		function resourceHistoryModal(resource) {

			/**
			 * 确认记录列表
			 * @param sessionId  sessionId
			 * @param resourceId  资源Id
			 * @param pageNo       页码
			 * @param pageSize     页行数
			 * @return              记录列表
			 */
			var resourceId = resource.id,
				pageNo = 0,
				pageSize = 100;
			resourceHistoryService.list(sessionId, resourceId, pageNo, pageSize).then(
				function(result) {
					console.log(result);
					vm.resourceHistoryItems = result.objects;
				},
				function(error) {
					console.log(error);
				}
			)
			vm.active = 0;
			vm.resourceHistoryModalResource = resource;
		}

		function add() {
			/**
			 * 增加确认记录
			 * @param sessionId    用户sessionId
			 * @param resourceId   资源Id
			 * @param content      记录内容
			 * @return              记录Id
			 */
			var resourceId = vm.resourceHistoryModalResource.id,
				content = vm.confirmationRecordContent;
			resourceHistoryService.add(sessionId, resourceId, content).then(
				function(result) {
					$uibModalInstance.close();
				},
				function(error) {
					console.log(error);
					$window.alert(error.message);
				}
			)
		}

		function appealAdd() {
			/**
			 * 添加申诉
			 *
			 * @param sessionId 用户session
			 * @param source    来源类型。0=资源
			 * @param bizId     业务信息id。当source=0时，bizId填写资源Id。
			 * @param reason    申诉理由
			 */
			var source = 0,
				bizId = vm.resourceHistoryModalResource.id,
				reason = vm.appealContent;
			appealService.add(sessionId, source, bizId, reason).then(
				function(result) {
					$uibModalInstance.close();
				},
				function(error) {
					console.log(error);
					$window.alert(error.message);
				}
			)
		}

		function cancel(){
			$uibModalInstance.close();
		}

	}
});
