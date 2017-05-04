/**
 * Created by Administrator on 2016/5/4.
 */
define([
    'angular',
    '../services/ErrorService',
    '../services/AuthService',
    '../services/RequirementService',
    '../services/IndustryService',
    '../services/ShopService',
    '../services/PostService',
    '../services/UtilService'


], function (angular) {
    return angular.module('xwWeb')
        .registerController('requirementUpdateController', ['utilService', '$timeout', 'CONFIG', '$scope', 'Upload','$stateParams', 'requirementService','$uibModal',  'errorService', 'authService','postService', 'industryService', 'shopService', requirementUpdateController]);

    function requirementUpdateController(utilService, $timeout, CONFIG, $scope, Upload, $stateParams, requirementService,$uibModal, errorService, authService,postService, industryService, shopService) {
        //基础参数
        var vm = this;
        var sessionId = authService.getSessionId();
        var requirementId = $stateParams.requirementId;
        var shopId = $stateParams.shopId;

        vm.allPluginId = "all:all";
        vm.transferPluginId = "xw:transfer";
        vm.sitingPluginId = "xw:siting";
        vm.recruitmentPluginId = "xw:recruitment";
        vm.reservationPluginId = "xw:reservation";
        vm.submitted = false;
        vm.smallIndustryId = '';
        vm.checkMobileToExistsResult=false;
        vm.Gooncheck = false;
        var suitableIndustryContainer = 'suitableIndustryContainer';


        vm.shopTransferType = 1;//店铺转让类型
        vm.attractInvestmentType = 2;//出租招商
        vm.emptyTransferSelect = [
            {
                "value": 1,
                "name": "是"
            },
            {
                "value": 2,
                "name": "否"
            }
        ];
        vm.businessStatusSelect = [
            {
                "value": 1,
                "name": "营业中"
            },
            {
                "value": 2,
                "name": "未营业"
            }
        ];
        vm.rentsSelect = [
            {"value": "1", "name": "0-5000元/月", "minRent": 0, "maxRent": 5000},
            {"value": "2", "name": "5000-10000元/月", "minRent": 5000, "maxRent": 10000},
            {"value": "3", "name": "10000-20000元/月", "minRent": 10000, "maxRent": 20000},
            {"value": "4", "name": "20000-40000元/月", "minRent": 20000, "maxRent": 40000},
            {"value": "5", "name": "40000-60000元/月", "minRent": 40000, "maxRent": 60000},
            {"value": "6", "name": "60000元/月以上", "minRent": 60000, "maxRent": 14100653}
        ];

        //转店信息来源
        vm.informationSourceSelect = [
            {
                "value": 1,
                "name": "公司网站"
            },
            {
                "value": 2,
                "name": "收费续费"
            },
            {
                "value": 3,
                "name": "户外"
            } ,
            {
                "value": 4,
                "name": "58同城"
            } ,
            {
                "value": 5,
                "name": "其他分类网站"
            } ,
            {
                "value": 6,
                "name": "主动来电"
            } ,
            {
                "value": 7,
                "name": "独家信息"
            } ,
            {
                "value": 8,
                "name": "报纸客户"
            } ,
            {
                "value":9,
                "name": "商户发布"
            } ,
            {
                "value": 10,
                "name": "其他"
            }
        ];

        //找店信息来源
        vm.leaseInfomationSourcesSelect=[
            {
                "value":1,
                "name":"个人"
            },
            {
                "value":2,
                "name":"接听电话"
            },
            {
                "value":3,
                "name":"公司网站"
            },
            {
                "value":4,
                "name":"58同城"
            },
            {
                "value":5,
                "name":"其他分类网站"
            },
            {
                "value":6,
                "name":"商户发布"
            },
            {
                "value":7,
                "name":"其他"
            }
        ];

        //物业配套
        vm.facilitiesSelect=[
            {
                "value":1,
                "name":"可明火",
                "check":false
            },
            {
                "value":2,
                "name":"上下水",
                "check":false
            },
            {
                "value":3,
                "name":"380V",
                "check":false
            },
            {
                "value":4,
                "name":"煤气管道",
                "check":false
            },
            {
                "value":5,
                "name":"排烟管道",
                "check":false
            },
            {
                "value":6,
                "name":"排污管道",
                "check":false
            },
            {
                "value":7,
                "name":"停车位",
                "check":false
            },
            {
                "value":8,
                "name":"产权",
                "check":false
            },
            {
                "value":9,
                "name":"证件齐全",
                "check":false
            }
        ];

        /*剩余合同期*/
        vm.contractPeriodSelect=[
            {
                "value":0,
                "name":"请选择"
            },{
                "value":1,
                "name":"半年"
            },
            {
                "value":2,
                "name":"一年"
            },
            {
                "value":3,
                "name":"两年"
            },
            {
                "value":4,
                "name":"三年"
            },
            {
                "value":5,
                "name":"四年"
            },
            {
                "value":6,
                "name":"五年"
            },
            {
                "value":7,
                "name":"六年"
            },
            {
                "value":8,
                "name":"七年"
            },
            {
                "value":9,
                "name":"八年"
            },
            {
                "value":10,
                "name":"九年"
            },
            {
                "value":11,
                "name":"十年"
            },
            {
                "value":12,
                "name":"十一年"
            },
            {
                "value":13,
                "name":"十二年"
            },
            {
                "value":14,
                "name":"十三年"
            },
            {
                "value":15,
                "name":"十四年"
            },
            {
                "value":16,
                "name":"十五年"
            }
        ];
        vm.personner=1;//个人
        vm.league=2;//加盟
        vm.directSale=3;//直营

        //找店经营类型
        vm.industryTypeSelect=[
            {
                "value":vm.personner,
                "name":"个人"
            },
            {
                "value":vm.league,
                "name":"加盟"
            },
            {
                "value":vm.directSale,
                "name":"直营"
            },
        ];
        vm.rentMeasureSelect=[
            {
                "value":0,
                "name":"元/月"
            },
            {
                "value":1,
                "name":"元/天"
            },
            {
                "value":2,
                "name":"万元/年"
            },
            {
                "value":3,
                "name":"元/平方米*月"
            },
            {
                "value":4,
                "name":"元/平方米*天"
            },
        ];
        //找店首选类型
        vm.typeSelect=[
            {
                "value":vm.all,
                "name":"全部"
            },
            {
                "value":vm.shopTransferType,
                "name":"店铺转让"
            },
            {
                "value":vm.attractInvestmentType,
                "name":"出租招商"
            },
        ];

        //参数
        vm.suitableIndustryIds = [];
        vm.rentId = '';
        vm.check=[];
        $scope.suitableIndustryIds = vm.suitableIndustryIds;

        //查询结果
        vm.detail = {};
        vm.photos = [];
        vm.requirement = {};
        vm.shop = {};
        vm.facilities="";
        vm.doorWidth="";
        vm.industryType="";
        vm.minRent="";
        vm.maxRent="";
        vm.rentMeasure=0;
        vm.contractPeriod=0;
        var imageMoveLeft = 'left';//图片左移动
        var imageMoveRight = 'right';//图片有右移动


        vm.choiseIndustry = [];
        getIndustry();//行业模态框数据的组装
        vm.addChoiseIndustry = addChoiseIndustry;
        vm.delChoiseIndustryItem = delChoiseIndustryItem;

        //外部方法
        vm.getRequirement = getRequirement;//获取需求详情
        vm.update = update;//修改需求
        vm.loadSmallIndustries = loadSmallIndustries;
        vm.addIndustriesId = addIndustriesId;
        vm.uploadFile =uploadFile;
        vm.removeThumb = removeThumb;
        vm.addFacilities=addFacilities;//添加物业配置
        vm.checkMobileToExists=checkMobileToExists;
        vm.selectAllFacilities = selectAllFacilities;//物业配套全选
        vm.removeSelectedItem = removeSelectedItem;//适合经营删除
        vm.imageMove = imageMove;

        //初始化方法
        getRequirement();//获取需求详情
        getShopInfo();//获取店铺信息

        /////////////////////////////////

        //添加物业配套
        function addFacilities(value){
            var selectedNum = 0;
            var has=false;
            vm.facilitiesSelect[value-1].check=!vm.facilitiesSelect[value-1].check;
            if(vm.facilities.length==0)
            {
                vm.facilities.push(value);
            }else {
                for(var i=0;i<vm.facilities.length;i++)
                {
                    if(vm.facilities[i]==value)
                    {
                        vm.facilities.splice(i,1);
                        break;
                    }else{
                        if(i==vm.facilities.length-1)
                        {
                            has=true;
                        }
                    }
                }
            }
            if(has)
            {
                vm.facilities.push(value);
            }

            //判断是否要去掉全选的勾或者勾上全选的勾
            angular.forEach(vm.facilitiesSelect, function (value , key) {
                if(value.check == true) {
                    selectedNum += 1
                }
            });

            if(selectedNum == vm.facilitiesSelect.length) {
                vm.selectAllFacilitiesStatus = 1;
            } else {
                vm.selectAllFacilitiesStatus = 0;
            }
        }
        /*物业配置初始化*/
        function facilitiesInit(){

            /*初始化checkbox是否被选中*/
            for(var i=1;i<=vm.facilitiesSelect.length;i++)
            {
                for(var j=0;j<vm.facilities.length;j++)
                {
                    if(vm.facilities[j]==vm.facilitiesSelect[i-1].value){
                        vm.facilitiesSelect[i-1].check=true;
                    }
                }
            }
        }

        /*其他号码是否已存在商机*/
        function checkMobileToExists(){
            if(!vm.requirement.content.otherContact){
                vm.checkMobileToExistsResult=false;
                return;
            }
            postService.checkMobileToExists(vm.requirement.content.otherContact,vm.requirement.pluginId).then(function(result){
                vm.checkMobileToExistsResult=result;
            },function(error){
                if(error.code==-30602)
                {
                    alert("参数错误");
                }
            });
        }

        function getRequirement() {
            requirementService.getRequirementDetail(requirementId).then(function (result) {
                vm.requirement = result;
                vm.requirement.content.cost = parseFloat((vm.requirement.content.cost/1000000).toFixed(2));
                vm.requirement.content.rent = parseInt((vm.requirement.content.rent/100).toFixed(0));
                $scope.suitableIndustryIds = vm.requirement.content.suitableIndustryIds;
                if(vm.requirement.content.suitableIndustryIds) {
                    choiseIndustryInit(vm.requirement.content.suitableIndustryIds);
                }
                loadIndustries(vm.requirement.pluginId);

                if(vm.requirement.pluginId == vm.transferPluginId) {
                    vm.photos = vm.requirement.content.photos;
                    transferInit();
                    vm.facilities=vm.requirement.content.facilities;//物业配置初始化
                    facilitiesInit();
                    console.log(vm.requirement.content.contractPeriod,"yoyilalamtt");
                    if(vm.requirement.content.contractPeriod==6){
                        vm.contractPeriod=1
                    }else if(vm.requirement.content.contractPeriod==0)
                    {
                        vm.contractPeriod=0;
                    }else {
                        vm.contractPeriod=(vm.requirement.content.contractPeriod/12)+1;
                    }

                    if(vm.requirement.content.rentMeasure) {
                        vm.rentMeasure= vm.requirement.content.rentMeasure;
                    }

                }
                if(vm.requirement.pluginId == vm.sitingPluginId) {
                    vm.doorWidth=parseFloat((vm.requirement.content.doorWidth/100).toFixed(2));
                    vm.facilities=vm.requirement.content.facilities;//物业配置初始化
                    /*vm.contractPeriod=(vm.requirement.content.contractPeriod/12)+1;*/
                    if(vm.requirement.content.contractPeriod==6){
                        vm.contractPeriod=1
                    }else if(vm.requirement.content.contractPeriod==0)
                    {
                        vm.contractPeriod=0;
                    }else {
                        vm.contractPeriod=(vm.requirement.content.contractPeriod/12)+1;
                    }

                    vm.industryType=vm.requirement.content.industryType;
                    facilitiesInit();
                    if(vm.requirement.content.minRent==0){
                        vm.minRent="";
                        vm.rentMeasure=0;
                    }else{
                        vm.minRent = vm.requirement.content.minRent/100;
                        vm.rentMeasure=vm.requirement.content.rentMeasure;
                    }
                    if(vm.requirement.content.maxRent==0){
                        vm.maxRent="";
                        vm.rentMeasure=0;
                    }else{
                        vm.maxRent = vm.requirement.content.maxRent/100;
                        vm.rentMeasure=vm.requirement.content.rentMeasure;
                    }
                }

            }, function (error) {
                errorService.processError(error);
            })
        }

        function transferInit() {
            $timeout(function () {
                initPhoto('transferThumbContainer');
            }, 1);
        }

        function update(isvalid) {
            vm.submitted = true;
            if (!isvalid) {
                return
            }
            if(vm.minRent>vm.maxRent)
            {
                alert("最小租金不能大于最大租金");
                return;
            }else {


                var params = getParams(vm.requirement.pluginId);

       /*         if(vm.checkMobileToExistsResult){
                    var modalInstance = $uibModal.open({
                        animation: true,
                        size: "sm",
                        templateUrl: 'views/partial/otherContact.html',
                        controllerAs: 'vm',
                        controller: 'aboutOtherContactController',
                        resolve: {
                            loadController: ['$q', function ($q) {
                                var deferred = $q.defer();
                                require(["controllers/aboutOtherContactController"], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }],
                            Gooncheck: function () {
                                return vm.Gooncheck;
                            }
                        }
                    });
                    modalInstance.result.then(function (result) {
                        //更新商机
                        if(vm.isRevamp){
                            requirementService.update(sessionId, requirementId, vm.requirement.pluginId, params).then(function () {
                                alert("修改成功");
                                //getRequirement();
                            }, function (error) {
                                errorService.processError(error);
                            });
                            return;
                        }

                    }, function () {
                        modalInstance.dismiss();
                    });
                }else{*/
                requirementService.update(sessionId, requirementId, vm.requirement.pluginId, params).then(function () {
                    alert("修改成功");
                    //getRequirement();
                }, function (error) {
                    errorService.processError(error);
                })

        }
        }

        function getParams(pluginId) {
            var params = {};
            params.content = {};
            $scope.suitableIndustryIds = [];
            for(var i = 0; i <  vm.choiseIndustry.length; i ++) {
                $scope.suitableIndustryIds.push(vm.choiseIndustry[i].code);
            }
            switch (pluginId) {
                case vm.transferPluginId:
                    params = {
                        contact: vm.requirement.contact,
                        title: vm.requirement.title,
                        slogan: vm.requirement.slogan,
                        description: vm.requirement.description ? vm.requirement.description: '',
                        content: {}
                    };
                    params.content = {
                        rent: vm.requirement.content.rent * 100,
                        businessStatus: vm.requirement.content.businessStatus ? vm.requirement.content.businessStatus: 0,
                        suitableIndustryIds: $scope.suitableIndustryIds ? $scope.suitableIndustryIds:[],
                        photos: vm.requirement.content.photos ? vm.requirement.content.photos : '',
                        shopName: vm.requirement.content.shopName ? vm.requirement.content.shopName: '',
                        address: vm.requirement.content.address,
                        rentMeasure : parseInt(vm.rentMeasure)
                    };
                    if(vm.requirement.content.type == 1){
                        params.content.cost = vm.requirement.content.cost * 1000000;
                        params.content.emptyTransfer = vm.requirement.content.emptyTransfer ? vm.requirement.content.emptyTransfer : 1;
                    }
                    if(vm.requirement.content.otherContact)
                    {
                        params.content.otherContact=vm.requirement.content.otherContact;
                    }

                        params.content.emptyTransfer=vm.requirement.content.emptyTransfer;

                        params.content.facilities=vm.facilities;
                    if(vm.contractPeriod==1){
                        params.content.contractPeriod=6;
                    }else if(vm.contractPeriod<1){
                        params.content.contractPeriod=0;
                    }else{
                        params.content.contractPeriod = (vm.contractPeriod-1)*12;
                    }



                    break;
                case vm.sitingPluginId:
                    params = {
                        contact: vm.requirement.contact,
                        title: vm.requirement.title,
                        slogan: vm.requirement.slogan,
                        description: vm.requirement.description
                    };

                    if(vm.minRent&&vm.maxRent>0)
                    {
                        params.content = {
                            minRent:  vm.minRent*100,
                            maxRent:  vm.maxRent*100
                        }
                    }else {
                        params.content = {
                            minRent:  0,
                            maxRent:  0
                        }
                    }

                    params.content.rentMeasure = parseInt(vm.rentMeasure);

                   if(vm.requirement.content.otherContact)
                    {
                        params.content.otherContact = vm.requirement.content.otherContact;
                    }

                    params.content.emptyTransfer = vm.requirement.content.emptyTransfer;

                    params.content.facilities = vm.facilities;

                    if(vm.contractPeriod==1){
                        params.content.contractPeriod=6;
                    }else if(vm.contractPeriod<1){
                        params.content.contractPeriod=0;
                    }else{
                        params.content.contractPeriod=(vm.contractPeriod-1)*12;
                    }

                    if(vm.doorWidth)
                    {
                        params.content.doorWidth=vm.doorWidth*100;
                    } else {
                        params.content.doorWidth = 0;
                    }
                    params.content.brandName=vm.requirement.content.brandName;

                    params.content.industryType=vm.industryType;

                    break;
                case vm.recruitmentPluginId:
                    params = {
                        contact: vm.requirement.contact,
                        slogan: vm.requirement.slogan,
                        description: vm.requirement.description ?  vm.requirement.description : '',
                        content: {}
                    };
                    break;
                default:
                    break;
            }
            return params;
        }

        //加载行业
        function loadIndustries() {
            vm.industriesSelect = industryService.getIndustries();
        }

        //加载小行业
        function loadSmallIndustries(industryId) {
            vm.smallIndustryId = "";
            vm.smallIndustriesSelect = industryService.getSmallIndustries(industryId, vm.requirement.pluginId);
        }

        //添加适合行业
        function addIndustriesId() {
            var suitableIndustryId = 0;
            if(vm.requirement.content.suitableIndustryIds.length >= 10) {
                utilService.showPrompt("适合行业不能选择超过10个");
                return;
            }
            if(vm.smallIndustryId  == '') {
                alert("请选择确定的行业");
                return;
            } else {
                suitableIndustryId = parseInt(vm.smallIndustryId);
                if($.inArray(suitableIndustryId, vm.requirement.content.suitableIndustryIds) == -1){
                    vm.requirement.content.suitableIndustryIds.push(suitableIndustryId);
                    $scope.suitableIndustryIds = vm.requirement.content.suitableIndustryIds
                } else {
                    alert("该行业已添加");
                }
            }
        }

        //获取最小租金和最大租金
        function getRentRange(rentId) {
            var rents = vm.rentsSelect;
            var rentRangeMap = {};
            for (var i = 0; i < rents.length; i++) {
                rentRangeMap[rents[i]['value']] = rents[i];
            }
            if (rentRangeMap[rentId]) {
                var rent = rentRangeMap[rentId];
                return {
                    minRent: rent['minRent'],
                    maxRent: rent['maxRent']
                }
            }
            return {
                minRent: 0,
                maxRent: 0
            }
        }

        function getShopInfo() {
            shopService.getShopInfo(sessionId, shopId).then(function (result) {
                vm.shop = result;
            }, function (error) {
                errorService.processError(error);
            })
        }

        //上传文件
        function uploadFile(file, errFiles, thumbContainer) {
            var container = thumbContainer;
            vm.f = file;
            vm.errorFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: CONFIG.uploadUrl + '?sessionId=' + sessionId,
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    if(!response.data) {
                        utilService.showPrompt("图片不能大于5M");
                    } else {
                        file.result = response.data;
                        //存储图片信息
                        var photo = {
                            id: file.result.fileId,
                            url: file.result.url
                        };
                        vm.photos.push(photo);
                        //添加缩略图节点
                        var thumb = '<thumb id="' + photo.id + '" url="' + photo.url + '?x-oss-process=image/resize,m_mfit,h_200,w_200' + '" container="' + container + '" remove="vm.removeThumb(id)" left="vm.imageMove(id, direction, container)" right="vm.imageMove(id, direction, container)"/>';
                        thumbContainer = $('#' + thumbContainer);
                        angular.element(thumbContainer).injector().invoke(function ($compile) {
                            var $scope = angular.element(thumbContainer).scope();
                            thumbContainer.append($compile(thumb)($scope));
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        });
                    }
                }, function (response) {
                    vm.uploadErrorMessage = "上传失败";
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                })
            }
        }

        function imageMove(id, direction, container) {
            var tempObj = {};
            var maxPhotoIndex = vm.photos.length - 1;
            var completeStr = '';
            var breakFlag = false;
            angular.forEach(vm.photos, function (value, index) {
                if(!breakFlag && value && value.id == id && index != 0 && direction == imageMoveLeft){
                    tempObj = vm.photos[index];
                    vm.photos[index] = vm.photos[index-1];
                    vm.photos[index-1] = tempObj;
                    breakFlag = true;
                } else if (!breakFlag && value && value.id == id && index != maxPhotoIndex && direction == imageMoveRight) {
                    tempObj = vm.photos[index];
                    vm.photos[index] = vm.photos[index+1];
                    vm.photos[index+1] = tempObj;
                    breakFlag = true;
                }
            });

            angular.forEach(vm.photos, function (photo, index) {
                if(photo) {
                    completeStr += '<thumb id="' + photo.id + '" url="' + photo.url + '" container="' + container + '" remove="vm.removeThumb(id)" left="vm.imageMove(id, direction, container)" right="vm.imageMove(id, direction, container)"/>';
                }
            });

            var thumbContainer = $('#' + container);
            angular.element(thumbContainer).injector().invoke(function ($compile) {
                var $scope = angular.element(thumbContainer).scope();
                thumbContainer.html($compile(completeStr)($scope));
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        }

        //初始化图片
        function initPhoto(thumbContainer) {
            var container = thumbContainer;
            thumbContainer = $('#' + thumbContainer);
            for (var i = 0, length = vm.photos.length; i < length; i++) {
                var id = vm.photos[i]['id'];
                var url = vm.photos[i]['url'];
                //添加缩略图节点
                var thumb = '<thumb id="' + id + '" url="' + url + '" container="' + container + '" remove="vm.removeThumb(id)" left="vm.imageMove(id, direction, container)" right="vm.imageMove(id, direction, container)"/>';
                angular.element(thumbContainer).injector().invoke(function ($compile) {
                    var $scope = angular.element(thumbContainer).scope();
                    thumbContainer.append($compile(thumb)($scope));
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
            }
        }

        //删除缩略图
        function removeThumb(id) {
            for (var i = 0, length = vm.photos.length; i < length; i++) {
                if (vm.photos[i]['id'] == id) {
                    vm.photos.splice(i, 1);
                    break;
                }
            }
        }

        function selectAllFacilities() {
            vm.facilities = [];
            if(vm.selectAllFacilitiesStatus) {
                angular.forEach(vm.facilitiesSelect, function (value, key) {
                    value.check = true;
                    vm.facilities.push(value.value);
                });
            } else {
                angular.forEach(vm.facilitiesSelect, function (value, key) {
                    value.check = false;
                });
            }
        }

        function removeSelectedItem(t,id) {
            switch(t){
                case "industry" :
                    var index = $scope.suitableIndustryIds.indexOf(id);
                    if (index > -1) {
                        $scope.suitableIndustryIds.splice(index, 1);
                    }
                    break;
                default :
                    break;
            }
        }

        //行业选择的相关处理函数
        function getIndustry() {
            if(!localStorage.getItem("industry")) {
                baseDataService.init().then(function () {
                }).catch(function () {
                    utilService.showPrompt("获取行业出错")
                })
            }

            var industry = JSON.parse(localStorage.getItem("industry"));
            var targetIndustryDataFormat = [], j = 0;
            for (var i = 0, len = industry.length  ; i < len; i ++) {
                if(industry[i].code.toString().length == 2) {
                    targetIndustryDataFormat[j] = industry[i];
                    j ++;
                }
            }

            console.log(targetIndustryDataFormat, "targetIndustryDataFormat before");
            for(var i = 0, len = industry.length  ; i < len; i ++) {
                for(var j = 0, length = targetIndustryDataFormat.length; j < length; j ++) {
                    targetIndustryDataFormat[j].subIndustry
                    if(industry[i].code.toString().length == 4 && industry[i].code.toString().substr(0, 2) == targetIndustryDataFormat[j].code) {
                        targetIndustryDataFormat[j].subIndustry = targetIndustryDataFormat[j].subIndustry ? targetIndustryDataFormat[j].subIndustry : [];
                        var subIndustryLen = targetIndustryDataFormat[j].subIndustry ? targetIndustryDataFormat[j].subIndustry.length : 0;
                        targetIndustryDataFormat[j].subIndustry[subIndustryLen] = industry[i];
                    }
                }
            }

            console.log(targetIndustryDataFormat, "targetIndustryDataFormat after");

            vm.allIndustry = targetIndustryDataFormat;
        }

        function addChoiseIndustry(industry, index) {
            //industry.choise = !industry.choise;
            if(vm.choiseIndustry.length >= 10) {
                vm.suitableIndustryMsg = "不能超过十个";
                utilService.showPrompt("不能超过十个");
                return;
            }

            industry.index = index;
            var choiseIndustryTemp =  vm.choiseIndustry;
            // 选择大行业后，已选择的小行业都要删掉，且颜色变回之前的颜色。
            if(industry.subIndustry) {
                if(industry.choise) {
                    for(var i = 0, len = vm.choiseIndustry.length; i < len; i ++) {
                        if(vm.choiseIndustry[i] && industry.code == vm.choiseIndustry[i].code) {
                            vm.choiseIndustry.splice(i, 1);
                            industry.choise = false;
                            i--;
                        }
                    }
                } else {

                    for(var i = 0, length = vm.choiseIndustry.length; i < vm.choiseIndustry.length; i ++) {
                        if(industry.code == vm.choiseIndustry[i].code.toString().substring(0,2)) {
                            industry.subIndustry[vm.choiseIndustry[i].index].choise = false;
                            vm.choiseIndustry.splice(i, 1);
                            i --;
                        }
                    }
                    vm.choiseIndustry.push(industry);
                    industry.choise = true;
                }
            } else {//选的小行业，要判断大行业是不是已经选到了，还要判断是加在已选择的数组中还是要在已选择数组中去掉
                //如果它是已选择状态则去掉已选择状态，并在已选择列表中删除。
                if(industry.choise) {
                    for(var i = 0; i < vm.choiseIndustry.length; i ++) {
                        if(industry.code == vm.choiseIndustry[i].code) {
                            vm.choiseIndustry.splice(i, 1);
                        }
                    }
                    industry.choise = !industry.choise;
                } else {
                    //判断大行业是不是在已选择的列表中,如果再，则不做操作，如果不在则加入到列表
                    var flag = false;
                    for(var i = 0; i < vm.choiseIndustry.length; i ++) {
                        if(vm.choiseIndustry[i].code.toString().length == 2 && industry.code.toString().substring(0, 2) == vm.choiseIndustry[i].code) {
                            flag = true;
                            return;
                        }
                    }
                    if(!flag) {
                        vm.choiseIndustry.push(industry);
                        industry.choise = !industry.choise;
                    }

                }
            }

        }

        function delChoiseIndustryItem(item) {
            if(item.code.toString().length == 2) {
                vm.allIndustry[item.index].choise = false;
            } else {
                for(var i = 0; i < vm.allIndustry.length; i ++) {
                    if(item.code.toString().substring(0,2) == vm.allIndustry[i].code) {
                        vm.allIndustry[i].subIndustry[item.index].choise = false;
                    }
                }
            }

            //删除数组，对应项状态和页面样式要修改。
            for(var i = 0; i < vm.choiseIndustry.length; i ++) {
                if(vm.choiseIndustry[i].code == item.code) {
                    vm.choiseIndustry.splice(i, 1);
                    return;
                }
            }
        }

        // 适合经营数据初始化
        function choiseIndustryInit(fitIndustryArr) {

            var arr = [];//临时数组
            for(var i = 0;i < fitIndustryArr.length; i++){
                if(arr.indexOf(fitIndustryArr[i]) == -1) {
                    arr.push(fitIndustryArr[i]);
                }
            }

            for(var i = 0, len = arr.length; i < len; i ++) {
                for(var j = 0, length = vm.allIndustry.length; j < length; j ++) {
                    if(arr[i].toString().length == 2 && arr[i] == vm.allIndustry[j].code) {
                        vm.allIndustry[j].choise = true;
                        vm.allIndustry[j].index = j;
                        vm.choiseIndustry.push(vm.allIndustry[j]);
                    }

                    if(arr[i].toString().length == 4 && arr[i].toString().substring(0, 2) == vm.allIndustry[j].code) {
                        for(var k = 0, klen = vm.allIndustry[j].subIndustry.length; k < klen; k ++) {
                            if(arr[i] == vm.allIndustry[j].subIndustry[k].code) {
                                vm.allIndustry[j].subIndustry[k].index = k;
                                vm.allIndustry[j].subIndustry[k].choise = true;
                                vm.choiseIndustry.push(vm.allIndustry[j].subIndustry[k]);
                            }
                        }
                    }
                }
            }

            console.log(vm.choiseIndustry, "vm.choiseIndustry");
        }


    }
});
