/**
 * Created by Xiajingsi on 2016/6/13.
 */
define([
    'angular'
], function(angular) {
    return angular.module('xwWeb')
        .$register.factory('utilService', utilService);

    utilService.$inject = ['rootScope', '$timeout', '$http', '$q'];

    function utilService($rootScope, $timeout, $http, $q) {
        $rootScope.prompt = false;

        return {
            showPrompt: showPrompt,
            cycle: cycle,
            errorCodeParse: errorCodeParse,
            getHintForErrMesg: getHintForErrMesg,
            binarySearch: binarySearch
        };

        /***
         * @param text 传入的自定义字符串，或者后台传回来的错误码：error.code
         */
        function showPrompt(text) {
            errorCodeParse().then(function (errorMessage) {
                if(errorMessage[text]){
                    $rootScope.promptText = errorMessage[text];
                } else {
                    $rootScope.promptText = text;
                }

                if($rootScope.prompt == false) {
                    $rootScope.prompt = true;
                    $timeout(function () {
                        $rootScope.prompt = false;
                    }, 2000);
                }
            });
        }

        /**
         * @param startAt 开始时间
         * @param endAt 结束时间
         * @returns {*} 相差多少月多少天
         */
        function cycle(startAt, endAt) {
            var cycleMonth = Math.floor((endAt -startAt)/(1000*60*60*24*30));
            var cycleDay;
            var cycleStr;
            if(cycleMonth == 0) {
                cycleDay = (endAt - startAt)/(1000*60*60*24);
                if(cycleDay == 0) {
                    cycleStr = "1天";
                } else {
                    cycleStr = cycleDay + "天";
                }
            } else {
                cycleDay = (endAt - startAt)/(1000*60*60*24) - cycleMonth*30;
                if(cycleDay == 0) {
                    cycleStr = cycleMonth + "个月";
                } else {
                    cycleStr = cycleMonth + "个月" + cycleDay + "天";
                }
            }
            return cycleStr;
        }

        /**
         *
         * @returns {Promise} 解析完成后的错误码
         */
        function errorCodeParse() {
            var deffered = $q.defer();
            $http({
                method: 'GET',
                url: './data/errorcode.json'
            }).then(function (result) {
                deffered.resolve(result.data);
            }).catch(function (error) {
                deffered.reject(error)
            });

            return deffered.promise;
        }

        /***
         *
         * @param code 错误码或者错误或者错误信息
         */
        function getHintForErrMesg(err) {
            errorCodeParse().then(function (errorMessage) {
                if(errorMessage[err]){
                    return errorMessage[err];
                } else if(err.code){
                    return errorMessage[err.code];
                } else {
                    return err;
                }
            }).catch(function (err) {
                alert(err);
            });
        }

        function binarySearch(arr, findVal) {
            var low = 0, high = arr.length - 1, mid = 0;
            while(low <= high) {
                mid = parseInt((low + high)/2);
                if(arr[mid].code == findVal) {
                    return mid;
                }
                if(arr[mid].code > findVal) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }

            return -1;
        }

        function getPluginIdType(){
            return {
                "all:all": "全部",
                "xw:transfer": "转店",
                "xw:siting": "找店",
                "xw:recruitment": "招聘",
                "xw:reservation": "消费"
            }
        }


    }
});
