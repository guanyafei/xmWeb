define([
    'require',
    'angular',
    '../services/AuthService',
    '../services/PostService',
    '../services/DistrictService',
    '../services/IndustryService',
    '../services/PositionService',
    '../services/ResourceService',
    '../services/PreferenceService',
    '../services/ErrorService',
    '../services/CityService',
    '../services/RemarkService',
    '../services/deadData.service',
    '../services/OpportunityService',
    '../services/UtilService',
    '../services/baseData.service'
], function (require, angular) {
    return angular.module('xwWeb')
        .registerController('postController', ['utilService', 'deadDataService', 'remarkService','$timeout','$stateParams','$scope', 'CONFIG', '$location','$uibModal', '$filter', 'Upload', 'authService', 'postService', 'districtService', 'industryService', 'positionService', 'resourceService', 'preferenceService', 'errorService', 'cityService', 'OpportunityService', 'baseDataService', postController]);

    function postController(utilService,deadDataService, remarkService,$timeout,$stateParams,$scope, CONFIG, $location,$uibModal, $filter, Upload, authService, postService, districtService, industryService, positionService, resourceService, preferenceService, errorService, cityService, OpportunityService, baseDataService) {
        var sessionId = authService.getSessionId();
        var vm = this;
        var map = null, clientType;
        // vm.f=[];
        vm.opportunityId = $stateParams.oppId ? $stateParams.oppId : 0;
        vm.businessId = $stateParams.businessId ? $stateParams.businessId : 0;
        vm.fromBusinessHall = $stateParams.fromBusinessHall == 1 ? true : false; //true:
        vm.isRevamp = $stateParams.oppId ? true : false; //true: 我的业务完善信息或者业务大厅的修改，false: 发布
        if(vm.isRevamp) {
            clientType = 3;//1 Android， 2  IOS , 3 PC (注：PC端不限制修改人)
        }
        vm.submitted = false;
        vm.sitingFormSubmitted = false;
        vm.recruitmentFormSubmitted = false;
        vm.remarkSubmitted = false;
        vm.cityId = authService.getCityId();
        vm.showMaped = false;
        vm.currentStep = 0;
        vm.errorMessage = "";
        vm.suitableIndustryMsg = "";
        vm.transferPluginId = "xw:transfer";
        vm.sitingPluginId = "xw:siting";
        vm.recruitmentPluginId = "xw:recruitment";
        vm.reservationPluginId = "xw:reservation";
        vm.all=0;//全部
        vm.shopTransferType = 1;//店铺转让类型
        vm.attractInvestmentType = 2;//出租招商

        vm.personner=1;//个人
        vm.league=2;//加盟
        vm.directSale=3;//直营

        vm.xwHidden = "xwhidden";
        vm.transferTypes = deadDataService.getTransferTypes();
        //转店信息来源
        vm.informationSourceSelect = deadDataService.getInformationSourceSelect();
        //找店信息来源
        vm.leaseInfomationSourcesSelect = deadDataService.getLeaseInfomationSourcesSelect();
        vm.businessStatusSelect = deadDataService.getBusinessStatusSelect();
        //物业配套
        vm.facilitiesSelect = deadDataService.getFacilitiesSelect();
        /*剩余合同期*/
        vm.contractPeriodSelect = deadDataService.getContractPeriodSelect();
        vm.rentMeasureSelect = deadDataService.getRentMeasureSelect();
        //找店经营类型
        vm.industryTypeSelect = deadDataService.getIndustryTypeSelect();
        //找店首选类型
        vm.typeSelect = deadDataService.getTypeSelect();
        //面积区域选择
        vm.areasSelect = deadDataService.getAreasSelect();
        vm.industriesSelect = [];
        vm.suitableIndustriesSelect = [];
        vm.smallIndustriesSelect = [];
        vm.suitableSmallIndustriesSelect = [];
        vm.districtsSelect = [];
        vm.businessAreasSelect = [];
        vm.positionsSelect = [];
        vm.suitableIndustryIds = [];

        vm.rentSelectId = '';
        vm.minRent = '';
        vm.maxRent = '';

        vm.pluginId = "";
        vm.mobile = "";
        vm.contact = "";
        vm.remark = "";
        vm.transferType = "";//类型，店铺转让或出租招商
        vm.informationSource="";//信息来源，公司网站，收费续费，户外，58同城，其他分类网站，主动来电，独家信息，报纸客户，商户发布，其他
        vm.leaseInfomationSources="";//找店的信息来源
        vm.industryType="";   //找店经营类型
        vm.type = 0;//找店首选类型
        vm.nativePlace="";//籍贯
        vm.doorWidth="";//门宽要求
        vm.shopName = "";
        vm.address = "";
        vm.shopname = "";
        vm.industryId = "";
        vm.smallIndustryId = "";
        vm.suitableIndustryId = "";
        vm.suitableSmallIndustryId = "";
        vm.districtId = "";
        vm.businessAreaId = "";
        vm.longitude = "";
        vm.latitude = "";
        vm.transferFee = "";
        vm.rent = '';
        vm.area = '';
        vm.businessStatus = 1;//设置默认经营状态为营业中
        vm.facilities=[];//物业配套
        vm.contractPeriod =0;
        vm.rentMeasure = 0;
        vm.qqNumber ="";
        vm.wechatNumber =""; //微信号
        vm.otherContact ="";
        vm.photos = [];
        vm.slogan = "";
        vm.title = "";
        vm.subtitle = "";
        vm.negotiable = false;

        vm.districtIds = [];
        vm.areaId = "";
        vm.minArea = '';
        vm.maxArea = '';
        vm.sitingMinRent = '';
        vm.sitingMaxRent = '';

        vm.positionIndustryId = "";
        vm.positionId = "";
        vm.positionIds = [];
        vm.recruitNumber = "";

        vm.emptyTransfer = 1;//设置默认可空转
        vm.markered = false;//用户是否已经在地图上标注目标地点。

        vm.exitOpportunityId = "";//已存在商机的Id
        vm.lock = false;//商机没锁定
        vm.remarkContent = "";
        vm.checkMobileToExistsOtherResult=false;
        vm.checkMobileToExistsResult=false;
        vm.Gooncheck = false; //判断其他号码存在后不继续
        vm.selectAllFacilitiesStatus = 0; //物业配套是否全选
        var imageMoveLeft = 'left';//图片左移动
        var imageMoveRight = 'right';//图片有右移动

        vm.requireOptional = deadDataService.getRequireOptional();

        vm.choiseIndustry = [];
        getIndustry();//行业模态框数据的组装
        vm.addChoiseIndustry = addChoiseIndustry;
        vm.delChoiseIndustryItem = delChoiseIndustryItem;

        //方法
        vm.goToStep = goToStep;//切换步骤
        vm.select = select;//选择类型
        vm.lock = lock;//锁定
        vm.transferPost = transferPost;//发布转店信息
        vm.transferPostAndTake = transferPostAndTake;//发布并领取转店信息
        vm.sitingPost = sitingPost;//发布找店信息
        vm.sitingPostAndTake = sitingPostAndTake;//发布并领取找店信息
        vm.recruitmentPost = recruitmentPost;//发布招聘信息
        vm.recruitmentPostAndTake = recruitmentPostAndTake;//发布并领取招聘信息
        vm.reservationPost = reservationPost;//发布消费信息
        vm.reservationPostAndTake = reservationPostAndTake;//发布并领取消费信息
        vm.loadIndustries = loadIndustries;//获取大行业
        vm.loadSmallIndustries = loadSmallIndustries;//获取大行业下面的小行业
        vm.loadDistricts = loadDistricts;//获取城市下面的区域
        vm.loadBusinessAreas = loadBusinessAreas;//获取区域下面的商圈
        vm.changeBusinessArea = changeBusinessArea;//选择商圈时触发
        vm.loadPositions = loadPositions;//获取行业下面的职位
        vm.showMap = showMap;//显示地图
        vm.uploadFile = uploadFile;//上传图片
        vm.removeThumb = removeThumb;//删除缩略图
        vm.addDistrict = addDistrict;//添加区域
        vm.removeDistrict = removeDistrict;//移除区域
        vm.addPosition = addPosition;//添加职位
        vm.removePosition = removePosition;//移除职位
        vm.hiddenMap = hiddenMap;//收起地图
        vm.clearExitOpportunityId = clearExitOpportunityId;
        vm.titleInit = titleInit;//标题初始化
        /*vm.subtitleInit = subtitleInit;//标题初始化*/
        vm.sloganInit = sloganInit;//根据小行业改广告语
        vm.loadSuitableSmallIndustries = loadSuitableSmallIndustries;
        vm.addSuitableIndustry = addSuitableIndustry;
        vm.removeSelectedItem = removeSelectedItem;
        vm.addRemark = addRemark;
        vm.enterPress = enterPress;//回车加备注
        vm.addFacilities=addFacilities;//添加物业配置
        vm.checkMobileToExistsOther = checkMobileToExistsOther;//当前号码是否是其他商机的其他号码
        vm.checkMobileToExists=checkMobileToExists;
        vm.selectAllFacilities = selectAllFacilities;//全选物业配套
        vm.imageMove = imageMove;
        vm.addRequire = addRequire;



        goToStep(1);

        loadDistricts();
        loadCity();
        //getIndustry();


        //如果存在vm.opportunityId,证明该页面是完善信息页面。不存在则是发布页面。
        if(vm.opportunityId != 0) revampInit();

        // 完善信息
        function revampInit() {
            postService.get(sessionId, vm.opportunityId).then(function (result) {
                vm.pluginId = result.pluginId;
                vm.contact = result.contact;
                vm.mobile = result.mobile;
                vm.title = result.title;

                vm.remark = result.description;
                vm.cityId = result.cityId;
                loadDistricts();
                loadIndustries(vm.pluginId);
                var content = result.content;
                if (vm.pluginId == vm.transferPluginId) {
                    vm.transferType = content.type;
                    vm.shopName = content.shopName;
                    vm.address = content.address;
                    vm.slogan = content['slogan'] ? content['slogan'] : '';
                    vm.suitableIndustryIds = content['suitableIndustryIds'] ? content['suitableIndustryIds'] : [];
                    choiseIndustryInit(vm.suitableIndustryIds);
                    vm.negotiable = content['negotiable'] == 1 ? true : false;
                    vm.facilities=content.facilities;
                    /*初始化checkbox是否被选中*/
                    for(var i=1;i<=vm.facilitiesSelect.length;i++)
                    {
                        for(var j=0;j<content.facilities.length;j++)
                        {
                            if(content.facilities[j]==i){
                                vm.facilitiesSelect[i-1].check=true;
                            }
                        }
                    }

                    vm.informationSource=content.informationSource;
                    if(content.contractPeriod==6)
                    {
                        vm.contractPeriod=1;
                    }else if(content.contractPeriod != 0){
                        vm.contractPeriod=(content.contractPeriod/12)+1;
                    }

                    vm.qqNumber=content.qqNumber;
                    vm.wechatNumber=content.wechatNumber;
                    vm.otherContact=content.otherContact;
                    vm.rentMeasure=content.rentMeasure;
                    if (content.industryId) {
                        industryInit(content.industryId);
                        var smallIndustryId = content.industryId;
                        vm.industryId = parseInt(smallIndustryId.toString().substr(0, 2));
                        loadSmallIndustries(vm.industryId, vm.pluginId);//加载小行业数据
                        vm.smallIndustryId = parseInt(smallIndustryId);
                        if(vm.slogan == ''){//如果广告语是空的，用小行业补上
                            for(var i in vm.smallIndustriesSelect){
                                if(vm.smallIndustriesSelect[i]['code'] == vm.smallIndustryId){
                                    vm.slogan = vm.smallIndustriesSelect[i]['name'];
                                    break;
                                }
                            }
                        }
                    }
                    var businessAreaId = content.districtId;
                    vm.cityId = parseInt(businessAreaId.toString().substr(0, 4));
                    loadDistricts(vm.cityId);
                    vm.districtId = parseInt(businessAreaId.toString().substr(0, 6));
                    loadBusinessAreas(vm.districtId);//加载商圈数据
                    vm.businessAreaId = businessAreaId;
                    vm.longitude = content.longitude;
                    vm.latitude = content.latitude;
                    vm.area = content.area == 0 ? "" : content.area;
                    vm.rent = content.rent == 0 ? "" : content.rent / 100;
                    vm.transferFee = content.transferFee == 0 ? "" : content.transferFee / 1000000;
                    vm.businessStatus = content.businessStatus;
                    vm.matchingProperty = content.matchingProperty;
                    vm.photos = content.photos;
                    vm.emptyTransfer = content.emptyTransfer;
                    initTransfer();
                }

                else if (vm.pluginId == vm.sitingPluginId) {
                   /* vm.cityId =*/
                    vm.slogan = content['slogan'] ? content['slogan'] : '';
                    var smallIndustryId = content.industryId;
                    vm.industryId = parseInt(smallIndustryId / 100);

                    loadSmallIndustries(vm.industryId, vm.pluginId);//加载小行业数据
                    vm.smallIndustryId = smallIndustryId;
                    industryInit(vm.smallIndustryId);
                    if(vm.slogan == ''){//如果广告语是空的，用小行业补上
                        for(var i in vm.smallIndustriesSelect){
                            if(vm.smallIndustriesSelect[i]['c'] == vm.smallIndustryId){
                                vm.slogan = vm.smallIndustriesSelect[i]['n'];
                                break;
                            }
                        }
                    }
                    vm.facilities=content.facilities;
                    /*初始化checkbox是否被选中*/
                    for(var i=1;i<=vm.facilitiesSelect.length;i++)
                    {
                        for(var j=0;j<content.facilities.length;j++)
                        {
                            if(content.facilities[j]==i){
                                vm.facilitiesSelect[i-1].check=true;
                            }
                        }
                    }


                    vm.leaseInfomationSources=content.informationSource;

                    if(content.contractPeriod==6)
                    {
                        vm.contractPeriod=1;
                    }else if(content.contractPeriod != 0){
                        vm.contractPeriod=(content.contractPeriod/12)+1;
                    }
                    vm.qqNumber=content.qqNumber;
                    vm.wechatNumber=content.wechatNumber;
                    vm.otherContact=content.otherContact;
                    vm.industryType=content.industryType;
                    vm.brandName=content.brandName;
                    if(content.type==undefined)
                    {
                        vm.type=vm.all;
                    }else{
                        vm.type=content.type;
                    }


                    if(content.doorWidth==0){
                        vm.doorWidth="";
                    }else{
                        vm.doorWidth=content.doorWidth/100;
                    }

                    vm.nativePlace=content.nativePlace;

                    vm.minArea = content.minArea;
                    vm.maxArea = content.maxArea;

                    if(content.minRent==0){
                        vm.minRent="";
                        vm.rentMeasure=0;
                    }else {
                        vm.minRent = content.minRent/100;
                        vm.rentMeasure=content.rentMeasure;
                    }
                    if(content.maxRent==0){
                        vm.maxRent="";
                        vm.rentMeasure=0;
                    }else {
                        vm.maxRent = content.maxRent/100;
                        vm.rentMeasure=content.rentMeasure;
                    }

                    vm.districtIds = content.districtIds;
                    vm.cityId = result.cityId;
                } else if (vm.pluginId == vm.recruitmentPluginId) {//招聘
                    vm.shopName = content.shopName;
                    vm.address = content.address;

                    var smallIndustryId = content.industryId;
                    vm.industryId = parseInt(smallIndustryId.toString().substr(0, 2));
                    loadSmallIndustries(vm.industryId, vm.pluginId);//加载小行业数据
                    vm.smallIndustryId = parseInt(smallIndustryId);

                    var businessAreaId = content.districtId;

                    loadDistricts(vm.cityId);
                    vm.districtId = parseInt(businessAreaId.toString().substr(0, 6));

                    loadBusinessAreas(vm.districtId);//加载商圈数据
                    if(businessAreaId.toString().length > 6) {
                        vm.businessAreaId = businessAreaId;
                    } else {
                        vm.businessAreaId = "";
                    }

                    vm.recruitNumber = content.recruitNumber ? content.recruitNumber : "";

                    vm.longitude = content.longitude;
                    vm.latitude = content.latitude;
                    vm.photos = content.photos;
                    vm.positionIds = content.positionIds;
                    initRecruitment();
                } else if (vm.pluginId == vm.reservationPluginId) {
                    vm.shopName = content.shopName;
                    vm.address = content.address;

                    var smallIndustryId = content.industryId;
                    vm.industryId = parseInt(smallIndustryId.toString().substr(0, 2));
                    loadSmallIndustries(vm.industryId, vm.pluginId);//加载小行业数据
                    vm.smallIndustryId = content.industryId;

                    var businessAreaId = content.districtId;

                    loadDistricts(vm.cityId);
                    vm.districtId = parseInt(businessAreaId.toString().substr(0, 6));

                    loadBusinessAreas(vm.districtId);//加载商圈数据
                    if(businessAreaId.toString().length > 6) {
                        vm.businessAreaId = businessAreaId;
                    } else {
                        vm.businessAreaId = "";
                    }

                    vm.longitude = content.longitude;
                    vm.latitude = content.latitude;

                    vm.photos = content.photos;
                    initReservation();
                }

            }, function (error) {
                errorService.processError(error);
            })
        }

        function initTransfer() {
            angular.element(document).ready(function () {
                initMap("transferMapContainer");
                $timeout(function () {
                    initPhoto("transferThumbContainer")
                }, 1);
            });
        }

        function initSiting() {
            angular.element(document).ready(function () {
                // initDistrict("sitingDistrictContainer");
            });
        }

        function initRecruitment() {
            angular.element(document).ready(function () {
                initMap("recruitmentMapContainer");
                initPosition("recruitmentPositionContainer");
                $timeout(function () {
                    initPhoto("recruitmentThumbContainer");
                }, 1);
            });
        }

        function initReservation() {
            angular.element(document).ready(function () {
                initMap("reservationMapContainer");
                $timeout(function () {
                    initPhoto("reservationThumbContainer")
                }, 1);
            });
        }

        //初始化地图
        function initMap(container) {
            if(vm.longitude == 0 || vm.latitude == 0){
                console.log("1");
                showMap(container);
            } else {
                console.log("2");
                vm.showMaped = true;
                require(['http://api.map.baidu.com/getscript?v=2.0&ak=sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek'], function () {
                    map = new BMap.Map(container);
                    var point = new BMap.Point(vm.longitude, vm.latitude);
                    map.centerAndZoom(point, 16);
                    var marker = new BMap.Marker(point);// 创建标注
                    vm.markered = true;
                    map.addOverlay(marker);             // 将标注添加到地图中
                    marker.enableDragging();           // 可拖拽
                    marker.addEventListener("dragend", function (e) {
                        vm.longitude = e.point.lng;
                        vm.latitude = e.point.lat;
                    });

                    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
                    map.addControl(new BMap.MapTypeControl());//添加地图类型控件
                    map.addControl( new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));// 左上角，添加比例尺
                    map.addControl( new BMap.NavigationControl({enableGeolocation: true})); //左上角，添加默认缩放平移控件
                    map.addControl( new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));//右上角，仅包含平移和缩放按钮

                    //添加标注
                    addMarker(map, marker);
                });
            }
        }
        //添加标注
        function addMarker(map, marker) {
            map.addEventListener("click",function(e){
                vm.markered = true;
                map.clearOverlays();
                marker = new BMap.Marker(e.point);
                vm.longitude = e.point.lng;
                vm.latitude = e.point.lat;
                map.addOverlay(marker);
                if(vm.address == '' || vm.address == undefined) {
                    geocoding(vm.longitude, vm.latitude);
                }
            });
        }

        //添加物业配套
        function addFacilities(value){
            var hasnone=false;
            var selectedNum = 0;
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
                                hasnone=true;

                            }
                        }
                }
            }
            if(hasnone)
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

        function goToStep(step) {
            vm.currentStep = step;
            if(step == 2) {
                loadIndustries();
                loadDistricts();
                loadCity();
            } else if(step == 3){
                vm.shopName = vm.contact + "的店";
            }
        }

        function titleInit(){
            //转店标题：组合规则：区域+商圈+面积㎡+小行业+转让。如：南山区南油50㎡餐馆转让
            //出租招商标题：组合规则：区域+商圈+面积㎡+店铺出租+适经营+适合经营（选择的第一个）。如：南山区南油100㎡店铺出租适经营餐馆
            if(vm.title == "" || typeof vm.title == 'undefined') {
                vm.title = "";
                if(vm.pluginId == vm.sitingPluginId) {
                    vm.title += "求租";
                    if(vm.districtIds.length != 0) {
                        if(vm.districtIds[0].toString().length === 8) {
                            vm.title += vm.businessAreasSelect[utilService.binarySearch(vm.businessAreasSelect, vm.districtIds[0])].name;
                        } else if (vm.districtIds[0].toString().length === 6) {
                            vm.title += vm.districtsSelect[utilService.binarySearch(vm.districtsSelect, vm.districtIds[0])].name;
                        } else {
                            vm.title += vm.cities[utilService.binarySearch(vm.cities, vm.districtIds[0])].name;
                        }
                    }
                    if(vm.minArea && vm.maxArea) {
                        vm.title += vm.minArea + "-" + vm.maxArea + "㎡"
                    }

                    vm.title += vm.singleIndustry ? vm.singleIndustry.name : '';

                }

                if(vm.pluginId == vm.transferPluginId) {
                    for (var i = 0; i < vm.districtsSelect.length; i++) {
                        if (vm.districtsSelect[i]['code'] == vm.districtId) {
                            vm.title += vm.districtsSelect[i]['name'];
                            break;
                        }
                    }

                    if(vm.businessAreaId) {
                        for (var i = 0; i < vm.businessAreasSelect.length; i++) {
                            if (vm.businessAreasSelect[i]['code'] == vm.businessAreaId) {
                                vm.title += vm.businessAreasSelect[i]['name'];
                                break;
                            }
                        }
                    }

                    vm.title += vm.area ? vm.area + "㎡" : '';

                    if(vm.transferType == 1) {
                        vm.title += vm.singleIndustry ? vm.singleIndustry.name + "转让" : '' + "转让";
                        vm.title += vm.businessStatus == 1 ? "，营业中" : "";
                        vm.title += vm.emptyTransfer == 1 ? "，可空转" : "";

                    } else {
                        vm.title +=  "店铺出租适经营";
                        vm.title += vm.choiseIndustry.length > 0 ? vm.choiseIndustry[0].name : '' ;
                    }


                }
            }
        }
/*        function subtitleInit(){
            if(vm.subtitle == "" || typeof vm.subtitle == 'undefined') {
                vm.subtitle = "";
                if(vm.pluginId == vm.sitingPluginId)
                    vm.subtitle += vm.contact+"找";
                if (vm.businessAreaId && vm.pluginId == vm.transferPluginId)
                    for (var i = 0; i < vm.businessAreasSelect.length; i++) {
                        if (vm.businessAreasSelect[i]['c'] == vm.businessAreaId) {
                            vm.subtitle += vm.businessAreasSelect[i]['n'] + "-";
                            break;
                        }
                    }
                if (vm.smallIndustryId)
                    for (var i = 0; i < vm.smallIndustriesSelect.length; i++) {
                        if (vm.smallIndustriesSelect[i]['c'] == vm.smallIndustryId) {
                            vm.subtitle += vm.smallIndustriesSelect[i]['n'];
                            break;
                        }
                    }
                if(vm.pluginId == vm.transferPluginId)
                    vm.subtitle += vm.transferType == 1 ? "-转让" : "-出租";

            }
        }*/

        function sloganInit(){
            vm.slogan = "";
/*            if(vm.smallIndustryId)
                for(var i = 0; i < vm.smallIndustriesSelect.length ;i++){
                    if(vm.smallIndustriesSelect[i]['c'] == vm.smallIndustryId){
                        vm.slogan += vm.smallIndustriesSelect[i]['n'];
                        break;
                    }
                }*/
            if(vm.slogan == "" || typeof vm.slogan == 'undefined') {
                vm.slogan = "";
                if(vm.pluginId == vm.sitingPluginId)
                    vm.slogan += vm.contact+"找";
                // if (vm.businessAreaId && vm.pluginId == vm.transferPluginId)
                //     for (var i = 0; i < vm.businessAreasSelect.length; i++) {
                //         if (vm.businessAreasSelect[i]['c'] == vm.businessAreaId) {
                //             vm.slogan += vm.businessAreasSelect[i]['n'] + "-";
                //             break;
                //         }
                //     }
                if (vm.smallIndustryId)
                    for (var i = 0; i < vm.smallIndustriesSelect.length; i++) {
                        if (vm.smallIndustriesSelect[i]['c'] == vm.smallIndustryId) {
                            vm.slogan += vm.smallIndustriesSelect[i]['n'];
                            break;
                        }
                    }
                // if(vm.pluginId == vm.transferPluginId)
                //     vm.slogan += vm.transferType == 1 ? "-转让" : "出租";

            }

        }

        function select(pluginId) {
            vm.pluginId = pluginId;
            goToStep(2)
        }

        function lock() {
            postService.lock(sessionId, vm.mobile, vm.contact, vm.pluginId).then(function () {
                console.log("lock success");
                goToStep(3);
                postService.checkMobileToExists(vm.mobile,vm.pluginId).then(function(result){
                    console.log("checkMobileToExists ", result);
                    if(result == true) {
                        alert("请注意：该号码已经是其他信息的合伙人号码");
                    }
                },function(error){
                    if(error.code==-30602)
                    {
                        alert("参数错误");
                    }
                });
            }, function (error) {
                if(error.code == -31195) {
                    vm.exitOpportunityId = JSON.parse(error.message).id;

                } else if(error.code == -31194) {
                    vm.lock = true;
                } else {
                    errorService.processError(error);
                }
            });
        }

        /*当前号码是其他商机的其他号码时*/
        function checkMobileToExistsOther(){
            if(!vm.mobile){
                vm.checkMobileToExistsOtherResult=false;
                return;
            }
            postService.checkMobileToExistsOther(vm.mobile,vm.pluginId).then(function(result){
                vm.checkMobileToExistsOtherResult=result;

            },function(error){
                if(error.code==-30602)
                {
                    alert("参数错误");
                }
            });
        }

        /*其他号码是否已存在商机*/
        function checkMobileToExists(mobile){
            //判断是否有传参数,如果传了参数,就是从post页面传过来的。这时候该参数应该是mobile。
            if(mobile) {
                vm.otherContact = mobile;
            } else {
                if(!vm.otherContact){
                    vm.checkMobileToExistsResult=false;
                    return;
                }
            }

            postService.checkMobileToExists(vm.otherContact,vm.pluginId).then(function(result){
                vm.checkMobileToExistsResult=result;
            },function(error){
                if(error.code==-30602)
                {
                    alert("参数错误");
                }
            });
        }

        /*提交表单*/
        function transferPost(isValid) {
            vm.submitted = true;
            if (!isValid || !vm.markered || vm.choiseIndustry.length == 0) {
                return;
            }
            var params = getTransferPostParams();
/*
            if($rootScope.checkMobileToExistsResult){
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

                modalInstance.result.then(function () {
                 /!*   if(result)
                    {*!/
                        //更新商机
                        if(vm.isRevamp){

                            postService.update(sessionId, vm.opportunityId, params).then(function () {

                                alert("已保存成功");
                                $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                            }, function (error) {
                                errorService.processError(error);
                            });
                            return;
                        }

                        //发布商机
                        postService.post(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {
                            vm.opportunityId = result;
                            goToStep(4);
                        }, function (error) {
                            errorService.processError(error);
                        });
                  /!*  } else {
                        vm.checkMobileToExistsResult=false;
                    }*!/
                }, function () {
                    modalInstance.dismiss();
                });
            }
            else{*/
            //更新商机
            if(vm.isRevamp){

                OpportunityService.update(sessionId, vm.opportunityId, params, clientType).then(function () {
                    alert("已保存成功");
                    if(!vm.fromBusinessHall) {
                        $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                    }
                }, function (error) {
                    errorService.processError(error);
                });
                return;
            }

            //发布商机
            postService.post(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {
                vm.opportunityId = result;
                goToStep(4);
            }, function (error) {
                errorService.processError(error);
            });
           /* }*/
            // //添加资源
            // resourceService.add(sessionId, vm.mobile, vm.contact).then(function (result) {
            //     var resourceId = result;
            //     //添加偏好
            //     addTransferPreference(sessionId, resourceId);
            // }, function (error) {
            //     //errorService.processError(error);
            // });
        }

        function transferPostAndTake(isValid) {

            vm.submitted = true;
            if (!isValid || !vm.markered || vm.choiseIndustry.length == 0) {
                return;
            }

            var params = getTransferPostParams();

            postService.postAndTake(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {
                vm.opportunityId = result.opportunityId;
                vm.businessId = result.id;
                $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
            }, function (error) {
                errorService.processError(error);
            });
        }

        function getTransferPostParams () {
            vm.suitableIndustryIds = [];
            for(var i = 0; i <  vm.choiseIndustry.length; i ++) {
                vm.suitableIndustryIds.push(vm.choiseIndustry[i].code);
            }
            var params = {
                type: parseInt(vm.transferType),
                informationSource:vm.informationSource,//信息来源
                rentMeasure:vm.rentMeasure,//租金单位
                shopName: vm.shopName,
                address: vm.address,
                districtId: vm.businessAreaId ? parseInt(vm.businessAreaId) : parseInt(vm.districtId),
                longitude: parseFloat(vm.longitude),
                latitude: parseFloat(vm.latitude),
                //businessStatus: parseInt(vm.businessStatus),
                area: parseInt(vm.area),
                rent: parseInt(vm.rent * 100),
                photos: vm.photos,
                description: vm.remark,
                title:vm.title,
                slogan:vm.slogan,
                suitableIndustryIds:vm.suitableIndustryIds,
                contact: vm.contact,
                cityId: parseInt(vm.cityId)
            };
            //当类型为出租招商时行业为非必填
            //当类型为出租招商时行业为非必填

            if (vm.transferType == vm.attractInvestmentType) {

                params['transferFee']=0;
                if (vm.singleIndustry) {
                    params['industryId'] = parseInt(vm.singleIndustry.code);
                }

            } else if (vm.transferType == vm.shopTransferType) {

                params['industryId'] = parseInt(vm.singleIndustry.code);
                params['transferFee'] = parseInt(vm.transferFee * 1000000);
                params['negotiable'] = vm.negotiable ? 1 : 0;
            }



            //经营状态
            if (vm.businessStatus) {
                params.businessStatus = parseInt(vm.businessStatus);
            }
            if(vm.transferType == vm.shopTransferType){
                if(vm.emptyTransfer != null && vm.emptyTransfer != undefined) {
                    params["emptyTransfer"] = parseInt(vm.emptyTransfer);
                }
            }
            //其他号码
            params["otherContact"]=vm.otherContact;

            /*副标题*/
            params["subtitle"]=vm.subtitle;

            /*物业配套*/
            params["facilities"] = vm.facilities;

            if(vm.contractPeriod){
                if(vm.contractPeriod==1){
                    params["contractPeriod"]=6
                }else{
                    params["contractPeriod"]=(vm.contractPeriod-1)*12;
                }
            }else{
                params["contractPeriod"]=0;
            }

            /*QQhao */
            params["qqNumber"]=vm.qqNumber;

            /*微信号*/
            params["wechatNumber"]=vm.wechatNumber;
            console.log(params + "转店参数");

            return params;
        }

        //添加转店偏好
        function addTransferPreference(sessionId, resourceId) {
            var content = {
                type: parseInt(vm.transferType),
                cityId: parseInt(vm.cityId),
                districtId: vm.businessAreaId ? parseInt(vm.businessAreaId) : parseInt(vm.districtId),
                address: vm.address,
                description: vm.remark
            };
            //当类型为出租招商时行业为非必填
            if (vm.transferType == vm.attractInvestmentType) {
                if (vm.smallIndustryId) {
                    content['industryId'] = parseInt(vm.smallIndustryId);
                }
            } else {
                content['industryId'] = parseInt(vm.smallIndustryId);
            }
            preferenceService.add(sessionId, resourceId, vm.pluginId, content).then(function (result) {

            }, function (error) {
                errorService.processError(error);
            });
        }

        //找店发布
        function sitingPost(isValid) {
            vm.sitingFormSubmitted = true;
            if (!isValid) {
                return;
            }
            if (vm.districtIds.length == 0) {
                return;
            }
            if(vm.minArea > vm.maxArea) {
                alert("最小面积不能大于最大面积");
                return;
            } else {
                if(vm.minRent>vm.maxRent)
                {
                    alert("最小租金不能大于最大租金");
                    return;
                }else{
                var params =  getSitingParams();
/*                MobileToExistsOther();
                /!* 其他号码是否商机*!/
                function MobileToExistsOther() {*/
             /*       if(vm.checkMobileToExistsResult){
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
                                postService.update(sessionId, vm.opportunityId, params).then(function () {
                                    alert("已保存成功");
                                    $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                                }, function (error) {
                                    errorService.processError(error);
                                });
                                return;
                            }

                            postService.post(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {

                                vm.opportunityId = result;
                                goToStep(4);
                            }, function (error) {
                                errorService.processError(error);
                            });

                        }, function () {
                            modalInstance.dismiss();
                        });
                    }else{*/
                        //更新商机
                        if(vm.isRevamp){
                            OpportunityService.update(sessionId, vm.opportunityId, params, clientType).then(function () {
                                alert("已保存成功");
                                if(!vm.fromBusinessHall) {
                                    $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                                }
                            }, function (error) {
                                errorService.processError(error);
                            });
                            return;
                        }

                        postService.post(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {

                            vm.opportunityId = result;
                            goToStep(4);
                        }, function (error) {
                            errorService.processError(error);
                        });
                /*    }*/
                }
      /*          }*/





                //添加资源
                // resourceService.add(sessionId, vm.mobile, vm.contact).then(function (result) {
                //     var resourceId = result;
                //     //添加偏好
                //     addSitingPreference(sessionId, resourceId);
                // }, function (error) {
                //     //errorService.processError(error);
                // });
            }
        }

        function sitingPostAndTake(isValid) {
            vm.sitingFormSubmitted = true;
            if (!isValid) {
                return;
            }
            if (vm.districtIds.length == 0) {
                return;
            }
            if(vm.minArea > vm.maxArea) {
                alert("最小面积不能大于最大面积");
                return;
            } else {
                if (vm.minRent > vm.maxRent) {
                    alert("最小租金不能大于最大租金");
                    return;
                } else {
                    var params = getSitingParams();
                    postService.postAndTake(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {
                        vm.opportunityId = result.opportunityId;
                        vm.businessId = result.id;
                        $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                    }, function (error) {
                        errorService.processError(error);
                    });
                    //添加资源
                    // resourceService.add(sessionId, vm.mobile, vm.contact).then(function (result) {
                    //     var resourceId = result;
                    //     //添加偏好
                    //     addSitingPreference(sessionId, resourceId);
                    // }, function (error) {
                    //     //errorService.processError(error);
                    // });
                }
            }
        }


        //添加找店偏好
        function addSitingPreference(sessionId, resourceId) {

            for (var i = 0; i < vm.districtIds.length; i++) {
                var districtId = vm.districtIds[i];
                var content = {
                    cityId: parseInt(vm.cityId),
                    industryId: parseInt(vm.smallIndustryId),
                    districtId: parseInt(districtId),
                    minArea: parseInt(vm.minArea),
                    maxArea: parseInt(vm.maxArea),
                    description: vm.remark,
                    minRent: parseInt(vm.minRent * 100),
                    maxRent: parseInt(vm.maxRent * 100)
                };

                preferenceService.add(sessionId, resourceId, vm.pluginId, content).then(function (result) {

                }, function (error) {
                    errorService.processError(error);
                });
            }

        }

        function getSitingParams() {

            /*   var rent = getRentRange(vm.rentSelectId);
                      vm.minRent = rent['minRent'];
            vm.maxRent = rent['maxRent'];*/
            //var area = getAreaRange(vm.areaId);
            //vm.minArea = area['minArea'];
            //vm.maxArea = area['maxArea'];
/*            alert(parseInt(vm.smallIndustryId)+"<br>"+vm.districtIds+"<br>"+parseInt(vm.minArea)+"<br>"+parseInt(vm.maxArea)+"<br>"+parseInt(vm.minRent * 100)+"<br>"+parseInt(vm.maxRent * 100)+"<br>"+vm.remark+"<br>"+vm.title+"<br>"+);*/

            var params = {
                industryId: parseInt(vm.singleIndustry.code),
                districtIds: vm.districtIds,
                minArea: parseInt(vm.minArea),
                maxArea: parseInt(vm.maxArea),
   /*             minRent: parseInt(vm.minRent * 100) ,
                maxRent: parseInt(vm.maxRent * 100),*/
                description: vm.remark,
                title:vm.title,
                slogan:vm.slogan,
                contact: vm.contact,
                informationSource:vm.leaseInfomationSources,//找店信息来源
                industryType:vm.industryType,//经营类型
                brandName:vm.brandName,//品牌名称
                type:vm.type,//首选类型
                cityId : parseInt(vm.cityId)
            };
            params['transferFee']=0;

            /*期望租金*/
            if(vm.minRent && vm.maxRent){
                params["minRent"]=vm.minRent*100;
                params["maxRent"]=vm.maxRent*100;

            }else{
                params["minRent"]=0;
                params["maxRent"]=0;
            }
            /*租金单位*/
            if(vm.rentMeasure){
                params["rentMeasure"]=vm.rentMeasure;//租金单位
            }else{
                params["rentMeasure"]=0;
            }
             /*门宽要求*/
               if(vm.doorWidth){
                   params["doorWidth"]=vm.doorWidth*100;
               }else{
                   params["doorWidth"]=0;
               }
            /*其他手机号*/
                params["otherContact"]=vm.otherContact;
            /*物业配置*/
                params["facilities"]=vm.facilities;
            /*合同期*/
            /*params["contractPeriod"]=(vm.contractPeriod-1)*12;*/
            if(vm.contractPeriod){
                if(vm.contractPeriod==1){
                    params["contractPeriod"]=6
                }else{
                    params["contractPeriod"]=(vm.contractPeriod-1)*12;
                }
            }else{
                params["contractPeriod"]=0;
            }
         /*   console.log( vm.contractPeriod," vm.contractPeriod",params["contractPeriod"],"params[contractPeriod]");*/
            /*QQ好*/
                params["qqNumber"]=vm.qqNumber;
            /*微信号*/
                params["wechatNumber"]=vm.wechatNumber;
            /*籍贯*/
                params["nativePlace"]=vm.nativePlace;
            return params;
        }

        function recruitmentPost(isValid) {
            vm.recruitmentFormSubmitted = true;
            if (!isValid  || !vm.markered) {
                return;
            }
            if (vm.positionIds.length == 0) {
                return;
            }

            var params = getRecruitmentParams();

            //更新商机
            if(vm.isRevamp){
                postService.update(sessionId, vm.opportunityId, params).then(function () {
                    alert("已保存成功");
                    $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                }, function (error) {
                    errorService.processError(error);
                });
                return;
            }

            postService.post(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {
                vm.opportunityId = result;
                goToStep(4);
            }, function (error) {
                errorService.processError(error);
            });
        }

        function recruitmentPostAndTake(isValid) {
            vm.recruitmentFormSubmitted = true;
            if (!isValid || !vm.markered) {
                return;
            }
            if (vm.positionIds.length == 0) {
                return;
            }

            var params = getRecruitmentParams();

            postService.postAndTake(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title,vm.remark, params).then(function (result) {
                vm.opportunityId = result.opportunityId;
                vm.businessId = result.id;
                $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
            }, function (error) {
                errorService.processError(error);
            });
        }

        //获取招聘的参数
        function getRecruitmentParams() {
            var params = {
                shopName: vm.shopName,
                address: vm.address,
                industryId: parseInt(vm.smallIndustryId),
                districtId: vm.businessAreaId ? parseInt(vm.businessAreaId) : parseInt(vm.districtId),
                longitude: parseFloat(vm.longitude),
                latitude: parseFloat(vm.latitude),
                photos: vm.photos,
                positionIds: vm.positionIds,
                recruitNumber: vm.recruitNumber,
                description: vm.remark,
                contact: vm.contact
            };

            return params;
        }

        function reservationPost(isValid) {
            vm.submitted = true;
            if (!isValid  || !vm.markered) {
                return;
            }
            var params = getReservationParams();

            //更新商机
            if(vm.isRevamp){
                postService.update(sessionId, vm.opportunityId, params).then(function () {
                    alert("已保存成功");
                    $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
                }, function (error) {
                    errorService.processError(error);
                });
                return;
            }

            //发布商机
            postService.post(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {
                vm.opportunityId = result;
                goToStep(4);
            }, function (error) {
                errorService.processError(error);
            });
        }

        function reservationPostAndTake(isValid) {
            vm.submitted = true;
            if (!isValid  || !vm.markered) {
                return;
            }

            var params = getReservationParams();

            //发布并领取
            postService.postAndTake(sessionId, vm.mobile, vm.contact, vm.pluginId,vm.title, vm.remark, params).then(function (result) {
                vm.opportunityId = result.opportunityId;
                vm.businessId = result.id;
                $location.path("/businessDetail/" + vm.businessId + "/0" + "/0");
            }, function (error) {
                errorService.processError(error);
            });
        }

        function getReservationParams() {
            var params = {
                shopName: vm.shopName,
                address: vm.address,
                industryId: parseInt(vm.smallIndustryId),
                districtId: vm.businessAreaId ? parseInt(vm.businessAreaId) : parseInt(vm.districtId),
                longitude: parseFloat(vm.longitude),
                latitude: parseFloat(vm.latitude),
                photos: vm.photos,
                description: vm.remark,
                contact: vm.contact
            };
            return params;
        }

        function loadIndustries() {
            vm.industriesSelect = industryService.getIndustries(vm.pluginId);
            vm.suitableIndustriesSelect = industryService.getIndustries(vm.pluginId);
        }

        function loadSmallIndustries(industryId) {
            vm.smallIndustryId = "";
            vm.smallIndustriesSelect = industryService.getSmallIndustries(industryId, vm.pluginId);
        }

        function loadDistricts() {
            vm.districtsSelect = districtService.getDistricts(vm.cityId);

            //改变城市，去掉标注
            vm.markered = false;

            //找店插件，改变城市，清空已选的商圈
            if(vm.pluginId == vm.sitingPluginId) {
                vm.districtIds = [];
            }
            vm.businessAreasSelect = [];//城市加载后要把上个城市的商圈清楚
        }

        //xjs：获取所有的城市
        function loadCity() {
            vm.cities =  cityService.getCity();
        }

        function loadBusinessAreas(districtId) {
            vm.businessAreaId = "";
            vm.businessAreasSelect = districtService.getBusinessAreas(districtId);
            //如果是转店或者是招聘或者是消费，切换区域的时候如果地图已显示则重新加载地图
            if (vm.pluginId == vm.transferPluginId || vm.pluginId == vm.recruitmentPluginId || vm.pluginId == vm.reservationPluginId) {
                var mapContainer = "";
                if (vm.pluginId == vm.transferPluginId) {
                    mapContainer = 'transferMapContainer';
                } else if (vm.pluginId == vm.recruitmentPluginId) {
                    mapContainer = 'recruitmentMapContainer';
                } else if (vm.pluginId == vm.reservationPluginId) {
                    mapContainer = 'reservationMapContainer';
                }
                if (vm.showMaped) {
                    showMap(mapContainer);
                }
            }
        }

        function changeBusinessArea() {
            if (vm.pluginId == vm.transferPluginId || vm.pluginId == vm.recruitmentPluginId || vm.pluginId == vm.reservationPluginId) {
                var mapContainer = "";
                if (vm.pluginId == vm.transferPluginId) {
                    mapContainer = 'transferMapContainer';
                } else if (vm.pluginId == vm.recruitmentPluginId) {
                    mapContainer = 'recruitmentMapContainer';
                } else if (vm.pluginId == vm.reservationPluginId) {
                    mapContainer = 'reservationMapContainer';
                }
                if (vm.showMaped) {
                    showMap(mapContainer);
                }
            }
        }

        function loadPositions(industryId) {
            vm.positionsSelect = positionService.getPositions(industryId);
        }

        function showMap(container) {
            console.log("3");
            vm.showMaped = true;
            var marker;//标注
            // if(vm.markered) {
            //     map = new BMap.Map(container);
            //     var point = new BMap.Point(vm.longitude, vm.latitude);
            //     map.centerAndZoom(point, 16);
            //     marker = new BMap.Marker(new BMap.Point(vm.longitude, vm.latitude));
            //     map.addOverlay(marker);
            // } else {
            // 百度地图API功能
            // 百度地图API功能
            require(['http://api.map.baidu.com/getscript?v=2.0&ak=sIq3pmhG5n4xVuKQ8eKr1BiV0hsLP2ek'], function () {
                var localSearch = new BMap.LocalSearch(new BMap.Map());

                var cityName = $filter('cityName')(vm.cityId);
                var districtName = vm.districtId ? $filter('districtName')(vm.districtId) : "";
                var businessArea = vm.businessAreaId ? $filter('districtName')(vm.businessAreaId) : "";
                var keyword = cityName + districtName + businessArea;

                localSearch.search(keyword);

                localSearch.setSearchCompleteCallback(function (searchResult) {
                    map = new BMap.Map(container);
                    var resultPoint;
                    if(searchResult.getPoi(0) == undefined) {
                        if(businessArea != "") {
                            keyword = cityName + districtName
                        } else if(districtName != '') {
                            keyword = cityName;
                        }
                        localSearch.search(keyword);
                    } else {
                        resultPoint = searchResult.getPoi(0).point;
                    }
                    var point;
                    if(vm.markered) {
                        point = new BMap.Point(vm.longitude, vm.latitude);
                        marker = new BMap.Marker(new BMap.Point(vm.longitude, vm.latitude));
                        map.addOverlay(marker);
                    } else {
                        point = resultPoint;
                    }

                    map.centerAndZoom(point, 16);
                    map.addControl(new BMap.MapTypeControl());//添加地图类型控件
                    map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放

                    map.addControl( new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));// 左上角，添加比例尺
                    map.addControl( new BMap.NavigationControl({enableGeolocation: true})); //左上角，添加默认缩放平移控件
                    map.addControl( new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));//右上角，仅包含平移和缩放按钮

                    //添加标注
                    map.addEventListener("click",function(e){
                        vm.markered = true;
                        map.clearOverlays();
                        marker = new BMap.Marker(e.point);
                        vm.longitude = e.point.lng;
                        vm.latitude = e.point.lat;
                        map.addOverlay(marker);
                        if(vm.address == '' || vm.address == undefined) {
                            geocoding(vm.longitude, vm.latitude);
                        }
                    });

                    //标注可拖动
                    if(marker != null){
                        marker.enableDragging();           // 可拖拽
                        marker.addEventListener("dragend", function (e) {
                            vm.longitude = e.point.lng;
                            vm.latitude = e.point.lat;
                        })
                    }
                });
            });
            // }
        }

        //创建一个地址解析器
        function geocoding(longitude, latitude) {
            var geoc = new BMap.Geocoder();
            var pt =  new BMap.Point(longitude, latitude);
            geoc.getLocation(pt, function(rs){
                var addComp = rs.addressComponents;
                vm.address = addComp.street + addComp.streetNumber;
                $scope.$apply();
            });
        }

        function hiddenMap() {
            vm.showMaped = false;
        }

        //初始化图片
        function initPhoto(thumbContainer) {
            var container = thumbContainer;
            thumbContainer = $('#' + thumbContainer);
            for (var i = 0, length = vm.photos.length; i < length; i++) {
                var id = vm.photos[i]['id'];
                var url = vm.photos[i]['url'];
                //添加缩略图节点
                var thumb = '<thumb id="' + id + '" url="' + url + '?x-oss-process=image/resize,m_mfit,h_70,w_117' + '" container="' + container + '" remove="vm.removeThumb(id)" left="vm.imageMove(id, direction, container)" right="vm.imageMove(id, direction, container)"/>';
                angular.element(thumbContainer).injector().invoke(function ($compile) {
                    var $scope = angular.element(thumbContainer).scope();
                    thumbContainer.append($compile(thumb)($scope));
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
            }
        }


        function uploadFile(file, errFiles, thumbContainer) {
            var container = thumbContainer;
            vm.f = file;
            vm.errorFile = errFiles && errFiles[0];
            // angular.forEach(files, function(file) {
            //     file.upload = Upload.upload({
            //         url: CONFIG.uploadUrl + '?sessionId=' + sessionId,
            //         data: {file: file}
            //     });

                if (file) {
                    file.upload = Upload.upload({
                        url: CONFIG.uploadUrl + '?sessionId=' + sessionId,
                        data: {file: file}
                    });

                    file.upload.then(function (response) {
                        if (!response.data) {
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
                            var thumb = '<thumb id="' + photo.id + '" url="' + photo.url + '?x-oss-process=image/resize,m_mfit,h_70,w_117' + '" container="' + container + '" remove="vm.removeThumb(id)" left="vm.imageMove(id, direction, container)" right="vm.imageMove(id, direction, container)"/>';
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
            var maxPhotoIndex = vm.photos.length;
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

        //删除缩略图
        function removeThumb(id) {
            for (var i = 0, length = vm.photos.length; i < length; i++) {
                if (vm.photos[i]['id'] == id) {
                    vm.photos.splice(i, 1);
                    break;
                }
            }
        }

        //添加区域
        function addDistrict() {
            if (vm.businessAreaId || vm.districtId || vm.cityId) {
                var districtId = 0;
                if (vm.businessAreaId) {
                    if ($.inArray(parseInt(vm.businessAreaId), vm.districtIds) != -1) {//如果已存在则不能添加
                        alert("商圈已存在");
                    } else if ($.inArray(parseInt(vm.businessAreaId.toString().substr(0, 6)), vm.districtIds) != -1) {//如果不存在但所属的区域已经存在，则不能添加
                        alert("商圈所属区域已添加");
                    } else if ($.inArray(parseInt(vm.businessAreaId.toString().substr(0, 4)), vm.districtIds) != -1) {
                        alert("商圈所属城市已添加");
                    } else {
                        districtId = parseInt(vm.businessAreaId);
                        vm.districtIds.push(districtId);
                    }
                } else if (vm.districtId) {
                    if ($.inArray(parseInt(vm.districtId), vm.districtIds) != -1) {//如果已存在则不能添加
                        alert("区域已存在");
                    } else if ($.inArray(parseInt(vm.districtId.toString().substr(0, 4)), vm.districtIds) != -1){
                        alert("区域所属的城市已添加");
                    } else {
                        if(vm.districtIds.length != 0) {
                            var districtIds = vm.districtIds;
                            var length = districtIds.length;
                            for (var i = length -1; i >= 0; i--) {//如果不存在但底下的商圈有一个已存在，则删除已添加的商圈
                                if (districtIds[i].toString().substr(0, 6) == vm.districtId) {//区域或商圈存在,
                                    vm.districtIds.splice(i, 1);
                                }
                            }
                        }
                        districtId = parseInt(vm.districtId);
                        vm.districtIds.push(districtId);

                    }
                } else {
                    if ($.inArray(parseInt(vm.cityId), vm.districtIds) != -1) {//如果已存在则不能添加
                        alert("城市已存在");
                    } else {
                        if(vm.districtIds.length != 0) {
                            var districtIds = vm.districtIds;
                            var length = districtIds.length;
                            for (var i = length -1; i >= 0; i--) {//如果不存在但底下的商圈有一个已存在，则删除已添加的商圈
                                if (districtIds[i].toString().substr(0, 4) == vm.cityId) {//区域或商圈存在
                                    vm.districtIds.splice(i, 1);
                                }
                            }
                        }
                        districtId = parseInt(vm.cityId);
                        vm.districtIds.push(districtId);
                    }
                }
            }
        }

        //删除区域
        function removeDistrict(id) {
            for (var i = 0, length = vm.districtIds.length; i < length; i++) {
                if (vm.districtIds[i] == id) {
                    vm.districtIds.splice(i, 1);
                    break;
                }
            }
        }

        //获取最小面积和最大面积
        function getAreaRange(areaId) {
            var areas = vm.areasSelect;
            var areaRangeMap = {};
            for (var i = 0; i < areas.length; i++) {
                areaRangeMap[areas[i]['value']] = areas[i];
            }
            if (areaRangeMap[areaId]) {
                var area = areaRangeMap[areaId];
                return {
                    minArea: area['minArea'],
                    maxArea: area['maxArea']
                }
            }
            return {
                minArea: 0,
                maxArea: 0
            }
        }

        //获取最小租金和最大租金
        function getRentRange(rentSelectId) {

            var rents = vm.rentSelect;
            var rentRangeMap = {};
            for (var i = 0; i < rents.length; i++) {

                rentRangeMap[rents[i]['value']] = rents[i];


            }
            if (rentRangeMap[rentSelectId]) {

                var rent = rentRangeMap[rentSelectId];

                return {
                    minRent: rent['sitingMinRent'],
                    maxRent: rent['sitingMaxRent']
                }
            }

            return {
                minArea: 0,
                maxArea: 0
            }
        }

        //初始化职位
        function initPosition(positionContainer) {
            positionContainer = $('#' + positionContainer);
            for (var i = 0, length = vm.positionIds.length; i < length; i++) {
                var position = '<position id="' + vm.positionIds[i] + '" remove="vm.removePosition(id)" />';
                angular.element(positionContainer).injector().invoke(function ($compile) {
                    var $scope = angular.element(positionContainer).scope();
                    positionContainer.append($compile(position)($scope));
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
            }
        }
        //添加职位
        function addPosition(positionContainer) {
            if (vm.positionId && $.inArray(parseInt(vm.positionId), vm.positionIds) == -1) {
                vm.positionIds.push(parseInt(vm.positionId));
                var position = '<position id="' + vm.positionId + '" remove="vm.removePosition(id)" />';
                positionContainer = $('#' + positionContainer);
                angular.element(positionContainer).injector().invoke(function ($compile) {
                    var $scope = angular.element(positionContainer).scope();
                    positionContainer.append($compile(position)($scope));
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                });
            }
        }

        //删除职位
        function removePosition(id) {
            for (var i = 0, length = vm.positionIds.length; i < length; i++) {
                if (vm.positionIds[i] == id) {
                    vm.positionIds.splice(i, 1);
                    break;
                }
            }
        }

        function clearExitOpportunityId() {
            vm.exitOpportunityId = '';
            vm.checkMobileToExistsOtherResult = false;
        }

        //////leo long///////////
        function addSuitableIndustry(){
            vm.suitableIndustryMsg = "";
            if(vm.suitableIndustryIds.length >= 10 ) {
                utilService.showPrompt("适合经营不能超过10个");
                return;
            }
            if(vm.suitableSmallIndustryId) {
                for(var i in vm.suitableIndustryIds){
                    if(vm.suitableSmallIndustryId == vm.suitableIndustryIds[i]){vm.suitableIndustryMsg = "该业态已存在！"; return;}
                    if(vm.suitableIndustryId == vm.suitableIndustryIds[i]){
                        vm.suitableIndustryMsg = "已添加了，该业态的行业！";
                        return;
                    }
                }
                vm.suitableIndustryIds.push(vm.suitableSmallIndustryId);
            }else if(vm.suitableIndustryId){
                var suitableIndustryIds = [];
                angular.copy(vm.suitableIndustryIds,suitableIndustryIds);;//used to recur
                var smallIndustriesSelect = industryService.getSmallIndustries(vm.suitableIndustryId);
                for(var i in suitableIndustryIds)
                    if(vm.suitableIndustryId == suitableIndustryIds[i]) {vm.suitableIndustryMsg = "该行业已存在！"; return;}
                for(var i in suitableIndustryIds){
                    for(var item in smallIndustriesSelect){
                        if(suitableIndustryIds[i] == smallIndustriesSelect[item]['c']){
                            removeSelectedItem('industry',suitableIndustryIds[i]);
                        }
                    }
                }
                vm.suitableIndustryIds.push(vm.suitableIndustryId);
            }
            vm.suitableIndustryId = "";
            vm.suitableSmallIndustryId = "";
            vm.suitableSmallIndustriesSelect = [];
        }

        function loadSuitableSmallIndustries(){
            vm.suitableSmallIndustryId = "";
            vm.suitableSmallIndustriesSelect = industryService.getSmallIndustries(vm.suitableIndustryId, vm.pluginId);
        }

        function removeSelectedItem(t,id) {
            switch(t){
                case "industry" :
                    var index = vm.suitableIndustryIds.indexOf(id);
                    if (index > -1) {
                        vm.suitableIndustryIds.splice(index, 1);
                    }
                    break;
                default :
                    break;
            }
        }

        function addRemark(isValid){
            vm.remarkSubmitted = true;
            if (!isValid) {
                return;
            }

            remarkService.add(sessionId, vm.opportunityId, 0, vm.remarkContent).then(function () {
                vm.xwHidden = "";
                $timeout(function(){vm.xwHidden = "xwhidden"; location.reload();},600,true);
            }, function (error) {
                errorService.processError(error);
            });
        }

        function enterPress(e,isValid){
            var event = e || window.event;
            if(event.keyCode == 13){
                addRemark(isValid);
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

        function addRequire(option) {
            if(vm.remark.indexOf(option.name, 0) != -1) {
                option.state = false;
                vm.remark = vm.remark.replace((option.name + "，").toString(), '');
                console.log(vm.remark, "vm.remark");
            } else {
                option.state = true;
                vm.remark = vm.remark + option.name + "，";

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

        function choiseIndustryInit(fitIndustryArr) {
            //数组去重
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
        }

        //行业初始化
        function industryInit(industry){
                for(var j = 0, length = vm.allIndustry.length; j < length; j ++) {
                    if(industry.toString().length == 4 && industry.toString().substring(0, 2) == vm.allIndustry[j].code) {
                        for(var k = 0, klen = vm.allIndustry[j].subIndustry.length; k < klen; k ++) {
                            if(industry == vm.allIndustry[j].subIndustry[k].code) {
                                //vm.allIndustry[j].subIndustry[k].choise = true;
                                vm.singleIndustry = vm.allIndustry[j].subIndustry[k];
                            }
                        }
                    }
                }
        }
    }
});
