define([
    'angular',
    'services/baseData.service'
], function (angular) {
    angular.module('xwWeb')
        .$register.factory('industryService', industryService);

    industryService.$inject = ["baseDataService"];

    function industryService(baseDataService) {
        var industries = [
            {
                "n": "\u9910\u996e\u7f8e\u98df",
                "c": 11
            },
            {
                "n": "\u7f8e\u5bb9\u7f8e\u53d1",
                "c": 12
            },
            {
                "n": "\u670d\u9970\u978b\u5305",
                "c": 13
            },
            {
                "n": "\u4f11\u95f2\u5a31\u4e50",
                "c": 14
            },
            {
                "n": "\u767e\u8d27\u8d85\u5e02",
                "c": 15
            },
            {
                "n": "\u751f\u6d3b\u670d\u52a1",
                "c": 16
            },
            {
                "n": "\u7535\u5b50\u901a\u8baf",
                "c": 17
            },
            {
                "n": "\u6c7d\u8f66\u670d\u52a1",
                "c": 18
            },
            {
                "n": "\u533b\u7597\u4fdd\u5065",
                "c": 19
            },
            {
                "n": "\u5bb6\u5c45\u5efa\u6750",
                "c": 20
            },
            {
                "n": "\u6559\u80b2\u57f9\u8bad",
                "c": 22
            },
            {
                "n": "\u9152\u5e97\u5bbe\u9986",
                "c": 25
            },
            {
                "n": "\u7a7a\u94fa\u8f6c\u8ba9",
                "c": 26
            }
        ];
        var smallIndustries = {
            "18": [
                {
                    "n": "\u6c7d\u4fee\u5382",
                    "c": 1801
                },
                {
                    "n": "\u6c7d\u914d\u5e97",
                    "c": 1802
                },
                {
                    "n": "\u8f6e\u80ce\u5e97",
                    "c": 1803
                },
                {
                    "n": "\u6c7d\u8f66\u7f8e\u5bb9\u5e97",
                    "c": 1804
                },
                {
                    "n": "\u7ef4\u4fee\u70b9",
                    "c": 1806
                },
                {
                    "n": "\u6c7d\u8f664S\u5e97",
                    "c": 1807
                },
                {
                    "n": "\u7535\u74f6\u8f66\u5e97",
                    "c": 1808
                }
            ],
            "26": [
                {
                    "n": "\u7a7a\u94fa",
                    "c": 2601
                }
            ],
            "17": [
                {
                    "n": "\u6570\u7801\u5e97",
                    "c": 1701
                },
                {
                    "n": "\u7535\u8111\u5e97",
                    "c": 1702
                },
                {
                    "n": "\u7535\u5668\u5e97",
                    "c": 1703
                },
                {
                    "n": "\u7ef4\u4fee\u5e97",
                    "c": 1704
                },
                {
                    "n": "\u901a\u8baf\u8425\u4e1a\u5385",
                    "c": 1707
                }
            ],
            "16": [
                {
                    "n": "\u5e72\u6d17\u5e97",
                    "c": 1601
                },
                {
                    "n": "\u82b1\u5e97\u6c34\u65cf",
                    "c": 1602
                },
                {
                    "n": "\u5f69\u7968\u5e97",
                    "c": 1604
                },
                {
                    "n": "\u62a5\u520a\u4ead",
                    "c": 1605
                },
                {
                    "n": "\u9001\u6c34\u9001\u6c14\u5e97",
                    "c": 1606
                },
                {
                    "n": "\u5ba0\u7269\u5e97",
                    "c": 1607
                },
                {
                    "n": "\u7167\u76f8\u9986",
                    "c": 1608
                },
                {
                    "n": "\u513f\u7ae5\u5a5a\u7eb1\u6444\u5f71",
                    "c": 1609
                },
                {
                    "n": "\u6253\u5b57\u590d\u5370",
                    "c": 1613
                },
                {
                    "n": "\u5a74\u513f\u6e38\u6cf3\u9986",
                    "c": 1614
                },
                {
                    "n": "\u5e7f\u544a\u5236\u4f5c",
                    "c": 1617
                },
                {
                    "n": "\u4f53\u80b2\u7528\u54c1",
                    "c": 1626
                },
                {
                    "n": "\u517b\u8001\u9662",
                    "c": 1629
                },
                {
                    "n": "\u513f\u7ae5\u4e50\u56ed",
                    "c": 1633
                },
                {
                    "n": "\u6708\u5b50\u4f1a\u6240",
                    "c": 1634
                },
                {
                    "n": "\u5a5a\u5e86\u5e97",
                    "c": 1635
                },
                {
                    "n": "\u90ae\u653f\u4ee3\u529e\u6240",
                    "c": 1636
                },
                {
                    "n": "\u5feb\u9012\u516c\u53f8",
                    "c": 1637
                }
            ],
            "25": [
                {
                    "n": "\u65c5\u9986",
                    "c": 2501
                },
                {
                    "n": "\u5bbe\u9986\u9152\u5e97",
                    "c": 2502
                },
                {
                    "n": "\u62db\u5f85\u6240",
                    "c": 2503
                },
                {
                    "n": "\u516c\u5bd3\u623f",
                    "c": 2504
                },
                {
                    "n": "\u51fa\u79df\u623f",
                    "c": 2505
                }
            ],
            "11": [
                {
                    "n": "\u9910\u9986",
                    "c": 1101
                },
                {
                    "n": "\u98df\u5802",
                    "c": 1102
                },
                {
                    "n": "\u9762\u5305\u5e97",
                    "c": 1103
                },
                {
                    "n": "\u51b7\u996e\u751c\u54c1\u5e97",
                    "c": 1104
                },
                {
                    "n": "\u5496\u5561\u9986",
                    "c": 1105
                },
                {
                    "n": "\u8336\u827a\u9986",
                    "c": 1106
                },
                {
                    "n": "\u5c0f\u5403\u5e97",
                    "c": 1107
                },
                {
                    "n": "\u5feb\u9910\u5e97",
                    "c": 1110
                },
                {
                    "n": "\u897f\u9910\u5385",
                    "c": 1112
                },
                {
                    "n": "\u706b\u9505\u5e97",
                    "c": 1113
                },
                {
                    "n": "\u5927\u6392\u6863",
                    "c": 1114
                },
                {
                    "n": "\u70e7\u70e4\u5e97",
                    "c": 1115
                },
                {
                    "n": "\u8336\u697c",
                    "c": 1117
                },
                {
                    "n": "\u9762\u9986",
                    "c": 1118
                },
                {
                    "n": "\u9152\u697c",
                    "c": 1119
                },
                {
                    "n": "\u706b\u9505\u5e72\u9505",
                    "c": 1120
                },
                {
                    "n": "\u65e9\u9910\u5e97",
                    "c": 1121
                },
                {
                    "n": "\u519c\u5bb6\u4e50",
                    "c": 1122
                },
                {
                    "n": "\u6599\u7406\u5e97",
                    "c": 1123
                },
                {
                    "n": "\u5bff\u53f8\u5e97",
                    "c": 1124
                }
            ],
            "14": [
                {
                    "n": "\u7f51\u5427",
                    "c": 1401
                },
                {
                    "n": "\u9152\u5427",
                    "c": 1402
                },
                {
                    "n": "\u8db3\u6d74",
                    "c": 1403
                },
                {
                    "n": "\u6c34\u7597",
                    "c": 1404
                },
                {
                    "n": "\u7403\u9986",
                    "c": 1405
                },
                {
                    "n": "\u9ebb\u5c06\u9986",
                    "c": 1406
                },
                {
                    "n": "\u745c\u4f3d\u9986",
                    "c": 1407
                },
                {
                    "n": "\u6b4c\u821e\u5385(ktv)",
                    "c": 1408
                },
                {
                    "n": "\u591c\u603b\u4f1a",
                    "c": 1410
                },
                {
                    "n": "\u684c\u7403\u57ce",
                    "c": 1411
                },
                {
                    "n": "\u5065\u8eab\u623f",
                    "c": 1412
                },
                {
                    "n": "\u4f11\u95f2\u4e2d\u5fc3",
                    "c": 1413
                },
                {
                    "n": "\u68cb\u724c\u5ba4",
                    "c": 1414
                },
                {
                    "n": "\u6d74\u6c60\u6d74\u573a",
                    "c": 1415
                },
                {
                    "n": "\u684c\u6e38",
                    "c": 1416
                },
                {
                    "n": "\u6e9c\u51b0\u573a",
                    "c": 1417
                },
                {
                    "n": "\u7535\u73a9\u57ce",
                    "c": 1418
                },
                {
                    "n": "\u7535\u5f71\u9662",
                    "c": 1420
                },
                {
                    "n": "\u53e4\u73a9\u5b57\u753b",
                    "c": 1421
                },
                {
                    "n": "\u6e38\u4e50\u573a",
                    "c": 1424
                },
                {
                    "n": "\u5ea6\u5047\u5c71\u5e84",
                    "c": 1425
                },
                {
                    "n": "\u6309\u6469\u5e97",
                    "c": 1426
                },
                {
                    "n": "\u5bc6\u5ba4\u9003\u8131",
                    "c": 1427
                }
            ],
            "22": [
                {
                    "n": "\u5b66\u6821",
                    "c": 2201
                },
                {
                    "n": "\u5e7c\u513f\u56ed",
                    "c": 2202
                },
                {
                    "n": "\u57f9\u8bad\u673a\u6784",
                    "c": 2203
                },
                {
                    "n": "\u5bb6\u6559\u4e2d\u5fc3",
                    "c": 2204
                },
                {
                    "n": "\u65e9\u6559\u4e2d\u5fc3",
                    "c": 2205
                }
            ],
            "13": [
                {
                    "n": "\u670d\u88c5\u5e97",
                    "c": 1301
                },
                {
                    "n": "\u5185\u8863\u5e97",
                    "c": 1302
                },
                {
                    "n": "\u7ae5\u88c5\u5e97",
                    "c": 1303
                },
                {
                    "n": "\u978b\u5e97",
                    "c": 1304
                },
                {
                    "n": "\u7bb1\u5305\u5e97",
                    "c": 1305
                },
                {
                    "n": "\u9970\u54c1\u5e97",
                    "c": 1306
                },
                {
                    "n": "\u9ec4\u91d1\u73e0\u5b9d",
                    "c": 1310
                },
                {
                    "n": "\u683c\u5b50\u94fa",
                    "c": 1311
                },
                {
                    "n": "\u5a5a\u7eb1\u793c\u670d\u9986",
                    "c": 1313
                },
                {
                    "n": "\u76ae\u5177\u62a4\u7406",
                    "c": 1322
                }
            ],
            "12": [
                {
                    "n": "\u7f8e\u5bb9\u9662",
                    "c": 1201
                },
                {
                    "n": "\u7f8e\u53d1\u5e97",
                    "c": 1202
                },
                {
                    "n": "\u7f8e\u7532\u5e97",
                    "c": 1204
                },
                {
                    "n": "SPA\u9986",
                    "c": 1205
                },
                {
                    "n": "\u4ea7\u540e\u4fee\u590d",
                    "c": 1206
                },
                {
                    "n": "\u517b\u751f\u9986",
                    "c": 1207
                },
                {
                    "n": "\u6bcd\u5a74\u517b\u751f\u4f1a\u6240",
                    "c": 1208
                }
            ],
            "19": [
                {
                    "n": "\u533b\u9662",
                    "c": 1901
                },
                {
                    "n": "\u8bca\u6240",
                    "c": 1902
                },
                {
                    "n": "\u836f\u5e97",
                    "c": 1903
                },
                {
                    "n": "\u4fdd\u5065\u54c1\u5e97",
                    "c": 1904
                },
                {
                    "n": "\u6210\u4eba\u7528\u54c1\u5e97",
                    "c": 1905
                }
            ],
            "20": [
                {
                    "n": "\u4e94\u91d1\u5efa\u6750\u5e97",
                    "c": 2001
                },
                {
                    "n": "\u5efa\u6750\u5e97",
                    "c": 2002
                },
                {
                    "n": "\u5bb6\u5177\u5e97",
                    "c": 2003
                },
                {
                    "n": "\u706f\u9970\u5e97",
                    "c": 2004
                },
                {
                    "n": "\u5bb6\u5c45\u9970\u54c1\u5e97",
                    "c": 2005
                },
                {
                    "n": "\u88c5\u9970\u88c5\u4fee\u6750\u6599\u5e97 ",
                    "c": 2006
                },
                {
                    "n": "\u5e03\u827a\u5bb6\u7eba",
                    "c": 2007
                },
                {
                    "n": "\u88c5\u6f62\u5e97",
                    "c": 2010
                }
            ],
            "15": [
                {
                    "n": "\u8d85\u5e02",
                    "c": 1501
                },
                {
                    "n": "\u4fbf\u5229\u5e97",
                    "c": 1502
                },
                {
                    "n": "\u5c0f\u5356\u90e8",
                    "c": 1503
                },
                {
                    "n": "\u7cbe\u54c1\u5e97",
                    "c": 1504
                },
                {
                    "n": "\u6742\u8d27\u5e97",
                    "c": 1505
                },
                {
                    "n": "\u70df\u9152\u8336\u53f6\u5e97",
                    "c": 1506
                },
                {
                    "n": "\u6bcd\u5a74\u7528\u54c1\u5e97",
                    "c": 1507
                },
                {
                    "n": "\u73a9\u5177\u5e97",
                    "c": 1508
                },
                {
                    "n": "\u6587\u5177\u5e97",
                    "c": 1509
                },
                {
                    "n": "\u4e66\u5e97",
                    "c": 1510
                },
                {
                    "n": "\u773c\u955c\u5e97",
                    "c": 1512
                },
                {
                    "n": "\u5316\u5986\u54c1\u5e97",
                    "c": 1513
                },
                {
                    "n": "\u4e50\u5668\u5e97",
                    "c": 1514
                },
                {
                    "n": "\u5de5\u827a\u54c1\u5e97",
                    "c": 1515
                },
                {
                    "n": "\u4f11\u95f2\u98df\u54c1\u5e97",
                    "c": 1517
                },
                {
                    "n": "\u4e13\u67dc",
                    "c": 1518
                },
                {
                    "n": "\u5e8a\u4e0a\u7528\u54c1",
                    "c": 1520
                },
                {
                    "n": "\u6c34\u4ea7\u8089\u7c7b\u719f\u98df",
                    "c": 1521
                },
                {
                    "n": "\u719f\u98df",
                    "c": 1522
                },
                {
                    "n": "\u7279\u4ea7\u7c7b",
                    "c": 1523
                },
                {
                    "n": "\u6863\u53e3\u644a\u4f4d",
                    "c": 1525
                },
                {
                    "n": "\u526f\u98df\u54c1\u5e97",
                    "c": 1527
                },
                {
                    "n": "\u6c34\u679c\u5e97",
                    "c": 1531
                }
            ]
        };

        return {
            getIndustries: getIndustries,
            getSmallIndustries: getSmallIndustries,
            getIndustryBySamll: getIndustryBySamll
        }

        function getIndustries(pluginId) {
            //return industries;
            return baseDataService.getBigIndustry(pluginId);
        }

        function getSmallIndustries(industryId, pluginId) {
            //return smallIndustries[industryId];
            return baseDataService.getIndustrysSmallIndustry(industryId, pluginId);

        }

        function getIndustryBySamll(small) {
            var r = '';
            if (small) {
                var id = small.toString().substr(0, 2);
                for (var i = 0; i < industries.length; i++) {
                    if (industries[i].c == id) {
                        r = industries[i].n;
                        break;
                    }
                }
                if (smallIndustries[id])
                    for (var i = 0; i < smallIndustries[id].length; i++) {
                        if (smallIndustries[id][i].c == small) {
                            r += " - " + smallIndustries[id][i].n;
                            break;
                        }
                    }
            } else {
                r = '无';
            }
            return r;
        }
    }
});
