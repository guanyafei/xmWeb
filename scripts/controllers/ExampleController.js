define([
    'angular',
    '../services/AuthService',
    '../services/BusinessService',
    '../services/ExampleService',
    '../services/IndustryService',
    '../services/DistrictService',
    '../services/ErrorService',
    '../services/OpportunityService',
    '../services/ServiceService',
    '../services/UtilService'
], function (angular) {
    angular.module('xwWeb')
        .registerController('exampleController', ['$scope', 'CONFIG', 'authService', 'exampleService','industryService','districtService', 'errorService', 'serviceService', 'utilService', exampleController]);

    function exampleController($scope, CONFIG, authService, exampleService,industryService, districtService,errorService, serviceService, utilService) {


        var vm = this;
        var sessionId = authService.getSessionId();
        vm.defaultPicUrl = CONFIG.postDefaultPic;

        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.totalCount = 0;
        vm.exampleList = [];//案例列表
        vm.pluginId  = $scope.pluginId;
        vm.cityId="";
        vm.pageNo="";


        vm.businessId = $scope.businessId;
        var cityId = $scope.opportunityCityId;

        vm.orderbySelected=[
            {
                'value':0,
                'name':"忠诚靠前星级倒序，时间倒序"
               /* "name":"检索字段案例对应的商机的信息编号"*/
            },
            {
                'value':1,
                'name':"创建时间倒序"
            },
            {
                'value':2,
                'name':"创建时间顺序"
            }
        ];



        vm.industryId = "";
        vm.smallIndustryId = "";
        vm.districtId="";//区域id
        vm.minArea="";//最小面积 平米
        vm.maxArea="";//最大面积 平米
        vm.minRent="";//最小租金 元/月
        vm.maxRent="";//最大租金 元/月
        vm.orderby=0;

        vm.key="";
        vm.number="";
        vm.opportunityId="";

        vm.startrent=false;
        vm.startarea=false;

        vm.exampleinfo="";//获取案例和备注
        vm.query=true;  //用来判断点击的是查询还是搜索

/*console.log("qqqqqqqqqq",Math.floor(30.1));*/
        vm.getList = getList;//获取案例列表
        vm.queryExample = queryExample;//获取案例列表
        vm.searchExample = searchExample;//获取案例列表
        vm.recommendExample = recommendExample;//推荐案例
        vm.viewServiceAndEvaluate = viewServiceAndEvaluate;//查看服务和评价
        vm.closeDetail = closeDetail;
        vm.loadSmallIndustries=loadSmallIndustries;//得到小行业
        vm.loadBusinessAreas=loadBusinessAreas;//得到小商圈
        vm.viewexampleinfo=viewexampleinfo;//获取案例备注
        vm.eKey=eKey;
        vm.pageto=pageto;//翻页
        ///////////////////////////////////////

        init();              //初始化大行业

        function pageto(){

            if(vm.pluginId=="xw:siting" || vm.pluginId=="xw:transfer" )
            {
                if(vm.query){
                    queryExample(true); //转店和找店，第一次为true，搜索的时候也调用这个函数  true表示搜索字段，表单正确
                }else{
                    searchExample(true);    //翻页是判断调用的是查询还是搜索
                }

            }else{
                getList();    //招聘和消费
            }
        }


        function getList(){
            exampleService.getList(sessionId, vm.pluginId, cityId, vm.currentPage - 1, vm.pageSize).then(function (result) {

                vm.totalCount = result.totalCount;
                vm.exampleList = result.objects;
                for(var i = 0, length = vm.exampleList.length; i < length; i ++ ) {
                    getSeviceDetail(vm.exampleList[i].serviceId, vm.exampleList[i]);
                    viewServiceAndEvaluate(vm.exampleList[i].serviceId, vm.exampleList[i]);
                }
            }, function (error) {
                errorService.processError(error);
            });
        }


        /*新接口*/
        function  init(){
            vm.industry = industryService.getIndustries(vm.pluginId);
            vm.district = districtService.getDistricts(cityId);
            pageto();
        }
        //fetch subindustries accord to industry id
        function loadSmallIndustries(industryId){
            vm.smallIndustry = industryService.getSmallIndustries(industryId, vm.pluginId);
            vm.smallIndustryId = "";
        }
        //小商圈
        function loadBusinessAreas(districtId){
            vm.businessArea = districtService.getBusinessAreas(districtId);
            vm.businessAreaId = "";
        }

        function getparams(){
            var params={
                orderby:vm.orderby//0:检索字段案例对应的商机的信息编号;1:创建时间倒序;2:创建时间顺序 必填
            }
            if(vm.industryId && vm.smallIndustryId)
            {
                params['industryId']=parseInt(vm.smallIndustryId);
            }

            if(vm.industryId && !vm.smallIndustryId)
            {
                params['industryId']=parseInt(vm.industryId);
            }
            if(vm.districtId && !vm.businessAreaId)
            {
                params['districtId']=parseInt(vm.districtId);
            }
            if(vm.districtId && vm.businessAreaId)
            {
                params['districtId']=parseInt(vm.businessAreaId);
            }
            if(vm.minArea && vm.maxArea)
            {
                params['minArea']=parseInt(vm.minArea);
                params['maxArea']=parseInt(vm.maxArea);
            }
            if(vm.maxArea && !vm.minArea )
            {
                params['minArea']=0;
                params['maxArea']=parseInt(vm.maxArea*100);
            }
            if(vm.minRent && vm.maxRent)
            {
                params['minRent']=parseInt(vm.minRent*100);
                params['maxRent']=parseInt(vm.maxRent*100);
            }
            if(vm.maxRent && !vm.minRent )
            {
                params['minRent']=0;
                params['maxRent']=parseInt(vm.maxRent*100);
            }
            return params;
        }
        function  getsearchParams(){
            var params={};
            if(vm.key)
            {
                params['key']=vm.key;
            }
            if(vm.number)
            {
                params['number']=vm.number.toString();
            }
            if(vm.opportunityId)
            {
                params['opportunityId']=vm.opportunityId;
            }
            return params;
        }

        function queryExample(isValid){

            console.log("vm.maxRent:",vm.maxRent);
            if((vm.minArea && !vm.maxArea) || (vm.minRent && !vm.maxRent) || !isValid || (vm.minArea > vm.maxArea) || (vm.minRent > vm.maxRent)){
                return;
            }
            vm.query=true;
            var params=getparams();
            console.log("params:",params);
            exampleService.queryExample(sessionId,cityId, vm.pluginId,params,  vm.currentPage - 1, vm.pageSize).then(function (result) {

                vm.totalCount = result.totalCount;
                vm.exampleList = result.objects;

                for(var i=0;i< vm.exampleList.length;i++)
                {
                    vm.exampleList[i].month=Math.floor(vm.exampleList[i].cycle/30);
                    vm.exampleList[i].day=vm.exampleList[i].cycle%30;
                }

            }, function (error) {
                console.log("888");
                errorService.processError(error);
            });
        }

        function searchExample(isValid){
            console.log(isValid);
            if(isValid){
                vm.query=false;
                var searchParams=getsearchParams();
                exampleService.searchExample(sessionId,cityId, vm.pluginId,searchParams,  vm.currentPage - 1, vm.pageSize).then(function (result) {

                    vm.totalCount = result.totalCount;
                    vm.exampleList = result.objects;
                    for(var i=0;i< vm.exampleList.length;i++)
                    {
                        vm.exampleList[i].month=Math.floor(vm.exampleList[i].cycle/30);
                        vm.exampleList[i].day=vm.exampleList[i].cycle%30;
                    }
                }, function (error) {
                    errorService.processError(error);
                });
            }

        }


        //获取服务详情
        function getSeviceDetail(serviceId, exampleObj) {
            serviceService.getServiceDetail(sessionId, serviceId).then(function (result) {
                exampleObj.serviceEetail = result;

                if(result.item.length > 0) {
                    exampleObj.requirement = result.item;
                }
                if(result.startAt) {
                    exampleObj.startAt = result.startAt;
                }
                if(result.endAt) {
                    exampleObj.endAt = result.endAt;
                }
                exampleObj.cycle = utilService.cycle(exampleObj.startAt, exampleObj.endAt);

            }).catch(function (error) {
                errorService.processError(error);
            });
            serviceService.getService(sessionId, serviceId).then(function (result) {
                exampleObj.rating = result;
            }).catch(function (error) {
                errorService.processError(error);
            });
        }
        //获取案例备注
  /*      function getexampleDetail(serviceId, exampleId) {
            serviceService.getExampleRemark(sessionId, exampleId).then(function (result) {
                vm.exampleInfo = result;
                console.log("vm.exampleInfo:",vm.exampleInfo);
            }).catch(function (error) {
                errorService.processError(error);
            });
        }*/
        //推荐案例
        function recommendExample(example, exampleId) {
            exampleService.recommendExample(sessionId, exampleId, vm.businessId).then(function () {
                example.hasRecommended = true;
                utilService.showPrompt("推荐成功");
            }).catch(function (error) {
                errorService.processError(error);
            })
        }



        function viewServiceAndEvaluate(serviceId, exampleObj) {
            //exampleObj.loaded判断的作用：如果加载过则不再加载
            if(exampleObj.expand != true && exampleObj.loaded != true ){
                exampleObj.expand = true;
                exampleObj.loaded = true;
                exampleService.get(sessionId, serviceId).then(function (result) {
                    exampleObj.procedure = result.procedure;
                }).catch(function (error) {
                    errorService.processError(error);
                })
            } if(exampleObj.expand != true && exampleObj.loaded == true) {
                exampleObj.expand = true;
            }
        }


        function viewexampleinfo( exampleObj,exampleId) {
            //exampleObj.loaded判断的作用：如果加载过则不再加载
            if(exampleObj.expand != true && exampleObj.loaded != true ){
                exampleObj.expand = true;
                exampleObj.loaded = true;

                exampleService.getExampleRemark(sessionId, exampleId).then(function (result) {
                    vm.exampleinfo=result;

                }).catch(function (error) {
                    errorService.processError(error);
                })
            } if(exampleObj.expand != true && exampleObj.loaded == true) {
                exampleObj.expand = true;
            }
        }

        function closeDetail(exampleObj) {
            exampleObj.expand = false;
        }

        //数字e做处理
        function eKey(e){
            var event =e || window.event;
            if(event.keyCode== 69)
            {
                vm.e_num=true;
            }else{
                vm.e_num=false;
            }
        }
    }
});
