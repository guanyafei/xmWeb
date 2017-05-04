/**
 * Created by Administrator on 2017/1/9.
 */
define([
    'angular',
    'services/JsonRpcService'
], function (angular) {
    return angular.module("xwWeb")
        .$register.factory('AdvertisementService', ['jsonRpcService', AdvertisementService]);

    function AdvertisementService(jsonRpcService) {
        return {
            getAdByChannel:getAdByChannel,
            getAdvertisement: getAdvertisement
        }

        //获取广告信息列表
        function getAdByChannel(sessionId,city,channel) {
            return jsonRpcService.request('advertisement_getAdByChannel', {
                sessionId: sessionId,
                city: city,
                channel: channel
            });
        }

        //获取单个广告信息
        function getAdvertisement(sessionId,city,id) {
            return jsonRpcService.request('advertisement_getAdvertisement', {
                sessionId: sessionId,
                city: city,
                id: id
            });
        }
    }
})
