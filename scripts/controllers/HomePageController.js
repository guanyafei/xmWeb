/**
 * Created by Administrator on 2016/7/29.
 */
/**
 * Created by Xjs on 2016/7/13.
 */

define([
    'angular',
    '../services/AccuseService',
    '../services/AuthService',
    '../services/ErrorService',
    '../services/UtilService'
], function (angular) {
    angular.module("xwWeb")
        .registerController("homePageController", homePageController);

    homePageController.$inject = ['$interval', '$document'];
    var step = 0;

    function homePageController($interval, $document) {
        $interval(function () {
            $document.find("slider").removeClass("slider-active");
            step++;
            step=step%5;
            $document.find("slider").eq(step).addClass("slider-active");
        }, 1000);
    }
})
