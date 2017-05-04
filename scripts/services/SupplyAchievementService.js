/**
 * Created by Xjs on 2016/6/24.
 */
define([
    'angular',
    'services/JsonRpcService'
], function(angular) {
    return angular.module('xwWeb')
        .$register.factory('supplyAchievementService', supplyAchievementService);

    userService.$inject = ['jsonRpcService'];

    function supplyAchievementService(jsonRpcService) {
        return {
            supplyAchievement: supplyAchievement,
            getBusinessUser: getBusinessUser
        }

        function supplyAchievement(sessionId, amount, contractId, remark, userId) {
            return jsonRpcService.request('supply_supplyAchievement', {
                sessionId: sessionId,
                amount: amount,
                contractId: contractId,
                remark: remark,
                userId: userId
            })
        }
        function getBusinessUser(sessionId, contractId) {
            return jsonRpcService.request('supply_getBusinessUser', {
                sessionId: sessionId,
                contractId: contractId
            })
        }
    }
});
