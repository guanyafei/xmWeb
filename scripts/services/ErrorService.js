define([
    'angular',
    'services/UtilService'
], function (angular) {
    return angular.module('xwWeb')
        .$register.factory('errorService', ['CONFIG', 'utilService', '$http', errorService]);

    function errorService(CONFIG, utilService, $http) {
        var notLoginCode = CONFIG.notLoginCode;
        var indexUrl = CONFIG.indexUrl;

        return {
            processError: processError
        };

        function processError(error) {
            utilService.errorCodeParse().then(function (errorMessage) {
                if (error.code == notLoginCode) {
                    alert("用户没有登录/或者Session过期");
                    //utilService.showPrompt("用户没有登录/或者Session过期");
                    window.location.href = indexUrl;
                } else {
                    if (errorMessage[error.code.toString()]) {
                        alert(errorMessage[error.code.toString()]);
                    } else {
                        alert(error.code);
                    }
                }
            })
        }
    }
});
