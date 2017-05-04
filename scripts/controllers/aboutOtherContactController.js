/**
 * Created by Administrator on 2016/4/25.
 */
define([
    'angular'
], function(angular) {
    'use strict';

    aboutOtherContactController.$inject = ["$scope","Gooncheck",'$uibModalInstance'];

    return angular.module('xwWeb')
        .registerController('aboutOtherContactController', aboutOtherContactController);

    function aboutOtherContactController($scope,Gooncheck,$uibModalInstance){
        var vm = this;
         vm.Gooncheck=Gooncheck;

        vm.Goon=Goon;
        vm.cancel=cancel;

        function Goon(){
/*            vm.Gooncheck=true;*/
            $rootScope.checkMobileToExistsResult=true;
            $uibModalInstance.close();
        }

        function cancel(){
           /* vm.Gooncheck=false;*/
            $rootScope.checkMobileToExistsResult=false;
            $uibModalInstance.dismiss();

        }

    }
});

