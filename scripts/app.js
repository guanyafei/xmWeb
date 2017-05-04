//requirejs的AMD規範寫app模塊
define([
    'require',
    'angular',
    'angular-ui-route',
    'ocLazyLoad',
    'angular-loading-bar',
    'angular-bootstrap',
    'angular-cookie',
    'ng-file-upload',
    'jquery',
     'angular-bootstrap-slider'
], function (require, angular) {
    var module = angular.module('xwWeb', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngCookies',
        'ngFileUpload',
         'ui.bootstrap-slider'
    ]);
    module.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$controllerProvider', '$provide', '$compileProvider',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $controllerProvider, $provide, $compileProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: true
            });

            module.registerController = $controllerProvider.register;//用来注册controller，使用方法为module.registerController(name, controller)
            module.$register = $provide;//用来注册服务或服务工厂，使用方法为module.$register.factory(name, factory)
            module.registerDirective = $compileProvider.directive;//用来注册指令，使用方法为module.registerDirective(name, directiveFactory)

            $urlRouterProvider.otherwise('/login');
//路由配置
            $stateProvider
                .state('index', {
                    templateUrl: 'views/layout/index.html',
                    resolve: {
                        loadFilters: ['$ocLazyLoad', function ($ocLazyLoad) {//延遲加載filter
                            return $ocLazyLoad.load(
                                {
                                    name: 'xwWeb',
                                    files: [
                                        'scripts/filters/CityName.js',
                                        'scripts/filters/DistrictName.js',
                                        'scripts/filters/IndustryName.js',
                                        'scripts/filters/PositionName.js',
                                        'scripts/filters/ShopStatus.js',
                                        'scripts/filters/TransferType.js',
                                        'scripts/filters/Substr.js',
                                        'scripts/filters/PostStatus.js',
                                        'scripts/filters/endreasonFilter.js',
                                        'scripts/filters/resultissuccessFilter.js',
                                        'scripts/filters/Date.js',

                                        'scripts/filters/BusinessStatus.js',
                                        'scripts/filters/TimeDistance.js',
                                        'scripts/filters/ServiceMode.js',
                                        'scripts/filters/RecommendTime.js',
                                        'scripts/filters/RemarkWarn.js',
                                        'scripts/filters/EmptyTransfer.js',
                                        'scripts/filters/MsecToMonthAndDay.js',
                                        'scripts/filters/ServiceOpinion.js',
                                        'scripts/filters/PluginIdFilter.js',
                                        'scripts/filters/ModeFilter.js',
                                        'scripts/filters/ReqTypeFilter.js',
                                        'scripts/filters/ReqBusinessStatus.js',
                                        'scripts/filters/CycleFilter.js',
                                        'scripts/filters/ValidityFilter.js',
                                        'scripts/filters/OpinionFilter.js',
                                        'scripts/filters/examplesortFilter.js',
                                        'scripts/filters/CssStatusFiltrer.js',
                                        'scripts/filters/AdvertisingFilter.js',
                                        'scripts/filters/DayToMonthDay.js',
                                        'scripts/filters/DayToYearMonthDay.js',
                                        'scripts/filters/InformationSourceFilter.js',
                                        'scripts/filters/leaseInformationSourcesFilter.js',
                                        'scripts/filters/FacilitiesFilter.js',
                                        'scripts/filters/IndustryTypeFilter.js',
                                        'scripts/filters/RentMeasureFilter.js',
                                        'scripts/filters/ContractPeriodFilter.js',
                                        'scripts/filters/UserTypeFilter.js',
                                        'scripts/filters/ceilMath.js',
                                        'scripts/filters/contactLen.js',
                                        'scripts/filters/UserTypeFilter.js',
                                        'scripts/filters/UserTypeFilter.js',
                                        'scripts/filters/sourceType.js',
                                        'scripts/filters/shop_status.js',
                                        'scripts/filters/CostMeasureFilter.js',
                                        'scripts/filters/type.js',
                                        'scripts/filters/TextFilter.js'
                                    ]
                                })
                        }],
                        loadDirectives: ['$ocLazyLoad', function ($ocLazyLoad) {//延遲加載指令
                            return $ocLazyLoad.load(
                                {
                                    name: 'xwWeb',
                                    files: [
                                        'scripts/directives/MobileValidator.js',
                                        'scripts/directives/thumb/ThumbDirective.js',
                                        'scripts/directives/district/DistrictDirective.js',
                                        'scripts/directives/position/PositionDirective.js',
                                        'scripts/directives/suitableIndustry/suitableIndustryDirective.js',
                                        'scripts/directives/prompt/PromptDirective.js'
                                    ]
                                })
                        }],
                        loadConfig: ['$ocLazyLoad', function ($ocLazyLoad) {//懶加載config
                            return $ocLazyLoad.load(
                                {
                                    name: 'xwWeb',
                                    files: [
                                        'scripts/config/CONFIG.js'
                                    ]
                                })
                        }]
                    }
                })
                .state('index.main', {//子路由
                    controller: 'mainController',
                    controllerAs: 'main',
                    templateUrl: 'views/layout/main.html',
                    resolve: {//頁面加載前用$q將數據和控制器注入到頁面中
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/MainController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]

                    }
                })
                .state('index.main.homePage', {
                    url: '/homePage',
                    templateUrl: 'views/pages/homePage.html',
                })
                .state('index.login', {
                    url: '/login',
                    controller: 'loginController',
                    controllerAs: 'vm',
                    templateUrl: 'views/login.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/LoginController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('index.main.business', {
                    url: '/business',
                    controller: 'businessController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/business.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/BusinessController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('index.main.city', {
                    url: '/city',
                    controller: 'cityController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/city.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/CityController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('index.main.post', {
                    url: '/post/:oppId/:businessId/:fromBusinessHall',
                    controller: 'postController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/post.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/PostController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('index.search', {
                    url: '/search/:keyword',
                    controller: 'searchController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/search.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/SearchController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                /*搜索详情begin*/
                .state('index.main.postDetail', {
                    url: '/postDetail/:id',
                    controller: 'postDetailController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/postDetail.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/PostDetailController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                .state('index.main.businessDetail', {
                    url: '/businessDetail/:businessId/:activeTab/:serviceId',
                    controller: 'businessDetailController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/businessDetail.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/BusinessDetailController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('index.main.recommend', {
                    url: '/recommend/:businessId',
                    controller: 'recommendController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/recommend.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/RecommendController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                /*推荐详情*/
                .state('index.main.recommendDetail', {
                    url: '/recommendDetail/:id',
                    controller: 'recommendDetailController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/recommendDetail.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/RecommendDetailController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                /*推荐案例*/
                .state('index.main.recommonExample', {
                    url: '/exampleDetail/:pluginId/:serviceId/:cityId',
                    controller: 'recommonExampleController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/recommendExample.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/recommonExampleController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                /*案例详情*/
                .state('index.main.exampleDetail', {
                    url: '/exampleDetail/:serviceId',
                    controller: 'exampleDetailController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/exampleDetail.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/ExampleDetailController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                /*需求详情*/
                .state('index.main.requirementDetail', {
                    url: '/requirementDetail/:id',
                    controller: 'requirementDetailController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/requirementDetail.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/RequirementDetailController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('index.main.price', {
                    url: '/price/:businessId',
                    controller: 'priceController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/price.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/PriceController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('index.test', {
                    url: '/test',
                    controller: 'testController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/test.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/TestController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                .state('index.main.myServices', {
                    url: '/myServices',
                    controller: 'myServicesController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/myService.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/MyServicesController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                .state('index.main.sendMessage',{
                    url: '/sendMessage',
                    controller: 'sendMessageController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/sendMessage.html',
                    resolve: {
                        loadController: ['$q',function($q) {
                            var deferred = $q.defer();
                            require(["controllers/sendMessageController"], function(){
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                .state('index.main.serviceDetail', {
                    url: '/serviceDetail/:serviceId/:active/:cssId/',
                    controller: 'serviceDetailController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/serviceDetail.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/ServiceDetailController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('index.main.aboutService', {
                    url: '/serviceDetail/:serviceId/:active',
                    controller: 'aboutServiceController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/aboutService.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/aboutServiceController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                .state('index.main.recommendation', {
                    url: '/recommendation/:serviceId/:params/:pluginId',
                    controller: 'recommendationController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/recommendation.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/RecommendationController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                //业务大厅
                .state('index.main.businessHall', {
                    url: '/businessHall/:pluginId',
                    controller: 'BusinessHallController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/businessHall.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/BusinessHallController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                //用户业务查询
                .state('index.main.customerBusinessSearch', {
                    url: '/customerBusinessSearch',
                    controller: 'customerBusinessSearchController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/customerBusinessSearch.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/CustomerBusinessSearchController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                .state('index.main.opportunityDetail', {
                    url: '/opportunityDetail/:oppId/:activeTab/:serviceStatus',
                    templateUrl: 'views/pages/opportunityDetail.html',
                    controller: 'oppDetailController',
                    controllerAs: 'vm',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/opportunityDetailController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                .state('index.main.requirementUpdate', {
                    url: '/requirementUpdate/:requirementId/:shopId',
                    controller: 'requirementUpdateController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/requirementUpdate.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/RequirementUpdateController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                //xjs:查看推荐
                .state('index.main.viewMyRecommend', {
                    url: '/viewMyRecommend/:serviceId/:check',
                    controller: 'myRecommendController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/viewMyRecommend.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/MyRecommendController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                //服务大厅
                .state('index.main.serviceHall', {
                    url: '/serviceHall/:serviceHall',
                    controller: 'serviceHallController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/service-hall.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/ServiceHallController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
                //广告位情况
                .state('index.main.aboutAds', {
                    url: '/aboutAds',
                    controller: 'aboutAdsController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/aboutAds.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/aboutAdsController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }],
                        loadFilters: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                {
                                    name: 'xwWeb',
                                    files: [
                                        'scripts/filters/CityName.js',
                                        'scripts/filters/channelFilter.js'
                                    ]
                                })
                        }]
                    }
                })

                //采集信息
                .state('index.main.spiderInfo', {
                    url: '/spiderInfo',
                    controller: 'spiderInfoController',
                    controllerAs: 'vm',
                    templateUrl: 'views/pages/spiderInfo.html',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/spiderInfoController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }],
                        loadFilters: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                {
                                    name: 'xwWeb',
                                    files: [
                                        'scripts/filters/CityName.js'
                                        // 'scripts/filters/channelFilter.js'
                                    ]
                                })
                        }]
                    }
                })

                .state('index.main.limitPolicy', {
                    url: '/limitPolicy',
                    templateUrl: 'views/pages/limitPolicy.html'
                })
                .state('index.main.platformRecommend',{
                    url:'/platformRecommend/:pluginId/:serviceId/:oppId/:title',
                    templateUrl:'views/pages/platformRecommend.html',
                    controller: 'platformRecommendController',
                    controllerAs: 'vm',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/PlatformRecommendController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
            })
                //平台推荐
                .state('index.main.platformRecommendfor',{
                    url:'/platformRecommendfor/:pluginId/:serviceId/:oppId/:title/:cityId',
                    templateUrl:'views/pages/platformRecommendfor.html',
                    controller: 'platformRecommendControllerfor',
                    controllerAs: 'vm',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/PlatformRecommendControllerfor"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })

                //通讯录
                .state('index.main.contractList',{
                    url:'/contractList',
                    templateUrl:'views/pages/contractList.html',
                    controller: 'ContractListController',
                    controllerAs: 'vm',
                    resolve: {
                        loadController: ['$q', function ($q) {
                            var deferred = $q.defer();
                            require(["controllers/ContractListController"], function () {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }]
                    }
                })
        }]);

    module.run(['$cookies','$rootScope','$location',function($cookies,$rootScope,$location){
        $rootScope.$on('$stateChangeStart', function(){
            if(typeof $cookies.get('XWWEB_SESSION_ID') == 'undefined'){
                $location.path('/login');
            };
        });
    }]);

    return module;
});
