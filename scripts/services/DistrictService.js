define([
    'angular',
    'services/baseData.service'
], function (angular) {
    return angular.module('xwWeb')
        .$register.factory('districtService', districtService);

    districtService.$inject = [baseDataService];

    function districtService(baseDataService) {

        return {
            getCityName: getCityName,
            getDistricts: getDistricts,//获取城市的区域
            getBusinessAreas: getBusinessAreas//获取区域的商圈
        };
        function getCityName() {
            return baseDataService.getCityName();
        }

        function getDistricts(cityId) {
            return baseDataService.getCitysDistricts(cityId);
        }

        function getBusinessAreas(districtId) {
            return baseDataService.getDistrictsBusinessArea(districtId);
        }
    }
});
