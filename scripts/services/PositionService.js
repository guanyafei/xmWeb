define([
    'angular'
], function (angular) {
    angular.module('xwWeb')
        .$register.factory('positionService', positionService);

    positionService.$inject = [];

    function positionService() {
        var positions = {
            "13": [
                {
                    "n": "\u5e97\u957f/\u5356\u573a\u7ecf\u7406",
                    "c": "1301"
                },
                {
                    "n": "\u5e97\u5458/\u8425\u4e1a\u5458",
                    "c": "1302"
                },
                {
                    "n": "\u5bfc\u8d2d",
                    "c": "1303"
                },
                {
                    "n": "\u6536\u94f6\u5458",
                    "c": "1304"
                }
            ],
            "22": [
                {
                    "n": "\u4e2d\u5b66\u6559\u5e08",
                    "c": "2201"
                },
                {
                    "n": "\u9662\u6821\u6559\u52a1\u7ba1\u7406\u4eba\u5458",
                    "c": "2202"
                },
                {
                    "n": "\u8bb2\u5e08/\u52a9\u6559",
                    "c": "2203"
                },
                {
                    "n": "\u5bb6\u6559",
                    "c": "2204"
                },
                {
                    "n": "\u5e7c\u6559",
                    "c": "2205"
                },
                {
                    "n": "\u5927\u5b66\u6559\u6388",
                    "c": "2206"
                },
                {
                    "n": "\u5c0f\u5b66\u6559\u5e08",
                    "c": "2207"
                },
                {
                    "n": "\u517c\u804c\u6559\u5e08",
                    "c": "2208"
                },
                {
                    "n": "\u804c\u4e1a\u6280\u672f\u6559\u5e08",
                    "c": "2209"
                },
                {
                    "n": "\u6821\u957f",
                    "c": "2210"
                },
                {
                    "n": "\u97f3\u4e50/\u7f8e\u672f\u6559\u5e08",
                    "c": "2211"
                },
                {
                    "n": "\u5916\u8bed\u57f9\u8bad\u5e08",
                    "c": "2212"
                },
                {
                    "n": "\u4f53\u80b2\u6559\u5e08",
                    "c": "2213"
                },
                {
                    "n": "\u6559\u5b66/\u6559\u52a1\u7ba1\u7406\u4eba\u5458",
                    "c": "2214"
                },
                {
                    "n": "\u62db\u751f/\u8bfe\u7a0b\u987e\u95ee",
                    "c": "2215"
                }
            ],
            "15": [
                {
                    "n": "\u5e97\u957f/\u5356\u573a\u7ecf\u7406",
                    "c": "1501"
                },
                {
                    "n": "\u5e97\u5458/\u8425\u4e1a\u5458",
                    "c": "1502"
                },
                {
                    "n": "\u5bfc\u8d2d",
                    "c": "1503"
                },
                {
                    "n": "\u6536\u94f6\u5458",
                    "c": "1504"
                },
                {
                    "n": "\u7406\u8d27\u5458/\u9648\u5217\u5458",
                    "c": "1505"
                },
                {
                    "n": "\u91c7\u8d2d\u5458/\u52a9\u7406",
                    "c": "1506"
                },
                {
                    "n": "\u98df\u54c1\u52a0\u5de5/\u5904\u7406",
                    "c": "1507"
                },
                {
                    "n": "\u9632\u635f\u5458/\u5185\u4fdd",
                    "c": "1508"
                },
                {
                    "n": "\u4ed3\u5e93\u7ba1\u7406\u5458",
                    "c": "1509"
                },
                {
                    "n": "\u6280\u5de5/\u5de5\u4eba",
                    "c": "1510"
                },
                {
                    "n": "\u4fdd\u6d01",
                    "c": "1511"
                },
                {
                    "n": "\u4fdd\u5b89",
                    "c": "1512"
                },
                {
                    "n": "\u7763\u5bfc",
                    "c": "1513"
                },
                {
                    "n": "\u505c\u8f66\u7ba1\u7406\u5458",
                    "c": "1514"
                },
                {
                    "n": "\u6d88\u9632\u4e2d\u63a7\u5458",
                    "c": "1515"
                }
            ],
            "19": [
                {
                    "n": "\u5e97\u957f/\u5356\u573a\u7ecf\u7406",
                    "c": "1901"
                },
                {
                    "n": "\u5e97\u5458/\u8425\u4e1a\u5458",
                    "c": "1902"
                },
                {
                    "n": "\u5bfc\u8d2d",
                    "c": "1903"
                },
                {
                    "n": "\u6536\u94f6\u5458",
                    "c": "1904"
                },
                {
                    "n": "\u5185\u79d1\u533b\u751f",
                    "c": "1905"
                },
                {
                    "n": "\u533b\u9662\u7ba1\u7406\u4eba\u5458",
                    "c": "1906"
                },
                {
                    "n": "\u836f\u5e93\u4e3b\u4efb/\u836f\u5242\u5e08",
                    "c": "1907"
                },
                {
                    "n": "\u62a4\u58eb/\u62a4\u7406\u4eba\u5458",
                    "c": "1908"
                },
                {
                    "n": "\u9ebb\u9189\u533b\u751f",
                    "c": "1909"
                },
                {
                    "n": "\u5fc3\u7406\u533b\u751f",
                    "c": "1910"
                },
                {
                    "n": "\u533b\u836f\u5b66\u68c0\u9a8c",
                    "c": "1911"
                },
                {
                    "n": "\u9488\u7078\u3001\u63a8\u62ff",
                    "c": "1912"
                },
                {
                    "n": "\u8425\u517b\u5e08",
                    "c": "1913"
                },
                {
                    "n": "\u517d\u533b",
                    "c": "1914"
                },
                {
                    "n": "\u5916\u79d1\u533b\u751f",
                    "c": "1915"
                },
                {
                    "n": "\u4e13\u79d1\u533b\u751f",
                    "c": "1916"
                },
                {
                    "n": "\u7259\u79d1\u533b\u751f",
                    "c": "1917"
                },
                {
                    "n": "\u7f8e\u5bb9\u6574\u5f62\u5e08",
                    "c": "1918"
                },
                {
                    "n": "\u7406\u7597\u5e08",
                    "c": "1919"
                },
                {
                    "n": "\u4e2d\u533b\u79d1\u533b\u751f",
                    "c": "1920"
                },
                {
                    "n": "\u516c\u5171\u536b\u751f/\u75be\u75c5\u63a7\u5236",
                    "c": "1921"
                },
                {
                    "n": "\u62a4\u7406\u4e3b\u4efb/\u62a4\u58eb\u957f",
                    "c": "1922"
                },
                {
                    "n": "\u513f\u79d1\u533b\u751f",
                    "c": "1923"
                },
                {
                    "n": "\u9a8c\u5149\u5e08",
                    "c": "1924"
                },
                {
                    "n": "\u653e\u5c04\u79d1\u533b\u5e08",
                    "c": "1925"
                },
                {
                    "n": "\u7efc\u5408\u95e8\u8bca/\u5168\u79d1\u533b\u751f",
                    "c": "1926"
                },
                {
                    "n": "\u4fdd\u5065\u533b\u751f",
                    "c": "1927"
                }
            ],
            "12": [
                {
                    "n": "\u7f8e\u5bb9\u5e97\u957f",
                    "c": "1201"
                },
                {
                    "n": "\u7f8e\u5bb9\u987e\u95ee",
                    "c": "1202"
                },
                {
                    "n": "\u7f8e\u5bb9\u52a9\u7406",
                    "c": "1203"
                },
                {
                    "n": "\u7f8e\u5bb9\u5e08",
                    "c": "1204"
                },
                {
                    "n": "\u7f8e\u5bb9\u57f9\u8bad\u5e08/\u5bfc\u5e08",
                    "c": "1205"
                },
                {
                    "n": "\u7f8e\u7532\u5e08",
                    "c": "1206"
                },
                {
                    "n": "\u7f8e\u4f53\u5e08",
                    "c": "1207"
                },
                {
                    "n": "\u7626\u8eab\u987e\u95ee",
                    "c": "1208"
                },
                {
                    "n": "SPA \u6280\u5e08",
                    "c": "1209"
                },
                {
                    "n": "\u5316\u5986\u5e08",
                    "c": "1210"
                },
                {
                    "n": "\u5f69\u5986\u987e\u95ee",
                    "c": "1211"
                },
                {
                    "n": "\u5f69\u5986\u57f9\u8bad\u5e08",
                    "c": "1212"
                },
                {
                    "n": "\u7f8e\u53d1\u5e97\u957f",
                    "c": "1213"
                },
                {
                    "n": "\u53d1\u578b\u5e08",
                    "c": "1214"
                },
                {
                    "n": "\u9020\u578b\u5e08",
                    "c": "1215"
                },
                {
                    "n": "\u53d1\u578b\u52a9\u7406/\u5b66\u5f92",
                    "c": "1216"
                },
                {
                    "n": "\u6d17\u5934\u5de5",
                    "c": "1217"
                }
            ],
            "16": [
                {
                    "n": "\u5e97\u957f/\u5356\u573a\u7ecf\u7406",
                    "c": "1601"
                },
                {
                    "n": "\u5e97\u5458/\u8425\u4e1a\u5458",
                    "c": "1602"
                },
                {
                    "n": "\u5bfc\u8d2d",
                    "c": "1603"
                },
                {
                    "n": "\u6536\u94f6\u5458",
                    "c": "1604"
                },
                {
                    "n": "\u6d17\u8863\u5de5",
                    "c": "1605"
                },
                {
                    "n": "\u9001\u6c34/\u9001\u6c14\u5de5",
                    "c": "1606"
                },
                {
                    "n": "\u5ba0\u7269\u7f8e\u5bb9",
                    "c": "1607"
                },
                {
                    "n": "\u4fdd\u59c6/\u62a4\u5de5",
                    "c": "1608"
                },
                {
                    "n": "\u6708\u5ac2/\u80b2\u5a74",
                    "c": "1609"
                },
                {
                    "n": "\u4fdd\u6d01",
                    "c": "1610"
                },
                {
                    "n": "\u7269\u6d41\u4e13\u5458/\u52a9\u7406",
                    "c": "1611"
                },
                {
                    "n": "\u7269\u6d41\u7ecf\u7406/\u4e3b\u7ba1",
                    "c": "1612"
                },
                {
                    "n": "\u7269\u6d41\u603b\u76d1",
                    "c": "1613"
                },
                {
                    "n": "\u8c03\u5ea6\u5458",
                    "c": "1614"
                },
                {
                    "n": "\u5feb\u9012\u5458",
                    "c": "1615"
                },
                {
                    "n": "\u4ed3\u5e93\u7ba1\u7406\u5458",
                    "c": "1616"
                },
                {
                    "n": "\u4ed3\u5e93\u7ecf\u7406/\u4e3b\u7ba1",
                    "c": "1617"
                },
                {
                    "n": "\u88c5\u5378/\u642c\u8fd0\u5de5",
                    "c": "1618"
                },
                {
                    "n": "\u4f9b\u5e94\u94fe\u7ba1\u7406",
                    "c": "1619"
                },
                {
                    "n": "\u5355\u8bc1\u5458",
                    "c": "1620"
                },
                {
                    "n": "\u56fd\u9645\u8d27\u8fd0",
                    "c": "1621"
                },
                {
                    "n": "\u4e3b\u6301\u4eba",
                    "c": "1622"
                },
                {
                    "n": "\u6444\u5f71\u5e08/\u6444\u50cf\u5e08",
                    "c": "1623"
                },
                {
                    "n": "\u5f71\u89c6/\u540e\u671f\u5236\u4f5c",
                    "c": "1624"
                },
                {
                    "n": "\u5a5a\u793c\u7b56\u5212\u5e08",
                    "c": "1625"
                },
                {
                    "n": "\u5e7f\u544a\u6587\u6848",
                    "c": "1626"
                },
                {
                    "n": "\u5e7f\u544a\u8bbe\u8ba1/\u5236\u4f5c",
                    "c": "1627"
                },
                {
                    "n": "\u5e7f\u544a\u521b\u610f",
                    "c": "1628"
                }
            ],
            "11": [
                {
                    "n": "\u670d\u52a1\u5458",
                    "c": "1101"
                },
                {
                    "n": "\u9762\u70b9\u5e08",
                    "c": "1102"
                },
                {
                    "n": "\u8336\u827a\u5e08",
                    "c": "1103"
                },
                {
                    "n": "\u914d\u83dc/\u6253\u8377",
                    "c": "1104"
                },
                {
                    "n": "\u4f20\u83dc\u5458",
                    "c": "1105"
                },
                {
                    "n": "\u6d17\u7897\u5de5",
                    "c": "1106"
                },
                {
                    "n": "\u540e\u53a8\u6742\u5de5",
                    "c": "1107"
                },
                {
                    "n": "\u9886\u73ed",
                    "c": "1108"
                },
                {
                    "n": "\u8fce\u5bbe/\u793c\u4eea",
                    "c": "1109"
                },
                {
                    "n": "\u9884\u8ba2\u5458",
                    "c": "1110"
                },
                {
                    "n": "\u8c03\u9152\u5e08/\u5427\u53f0\u5458",
                    "c": "1111"
                },
                {
                    "n": "\u9001\u9910\u5458",
                    "c": "1112"
                },
                {
                    "n": "\u4e3b\u6301/\u53f8\u4eea",
                    "c": "1113"
                },
                {
                    "n": "\u9884\u8ba2\u90e8\u4e3b\u7ba1",
                    "c": "1114"
                },
                {
                    "n": "\u5927\u5802\u7ecf\u7406",
                    "c": "1115"
                },
                {
                    "n": "\u524d\u5385\u90e8\u7ecf\u7406/\u4e3b\u7ba1",
                    "c": "1116"
                },
                {
                    "n": "\u697c\u9762\u7ecf\u7406",
                    "c": "1117"
                },
                {
                    "n": "\u7ca4\u83dc\u53a8\u5e08",
                    "c": "1118"
                },
                {
                    "n": "\u9c81\u83dc\u53a8\u5e08",
                    "c": "1119"
                },
                {
                    "n": "\u51c9\u83dc\u53a8\u5e08",
                    "c": "1120"
                },
                {
                    "n": "\u65e5\u97e9\u6599\u7406\u53a8\u5e08",
                    "c": "1121"
                },
                {
                    "n": "\u5ddd\u83dc\u53a8\u5e08",
                    "c": "1122"
                },
                {
                    "n": "\u6e58\u83dc\u53a8\u5e08",
                    "c": "1123"
                },
                {
                    "n": "\u897f\u9910\u53a8\u5e08",
                    "c": "1124"
                },
                {
                    "n": "\u62c9\u9762\u5e08",
                    "c": "1125"
                },
                {
                    "n": "\u70e7\u70e4\u5e08",
                    "c": "1126"
                },
                {
                    "n": "\u98df\u5802\u53a8\u5e08",
                    "c": "1127"
                },
                {
                    "n": "\u5496\u5561\u5e08",
                    "c": "1128"
                },
                {
                    "n": "\u9910\u996e\u5e97\u957f/\u7ecf\u7406",
                    "c": "1129"
                },
                {
                    "n": "\u5976\u8336/\u996e\u54c1\u5e97\u5458",
                    "c": "1130"
                }
            ],
            "18": [
                {
                    "n": "4S\u5e97\u7ecf\u7406/\u7ef4\u4fee\u7ad9\u7ecf\u7406",
                    "c": "1801"
                },
                {
                    "n": "\u552e\u540e\u670d\u52a1/\u5ba2\u6237\u670d\u52a1",
                    "c": "1802"
                },
                {
                    "n": "\u6c7d\u8f66\u9500\u552e/\u7ecf\u7eaa\u4eba",
                    "c": "1803"
                },
                {
                    "n": "\u4e8c\u624b\u8f66\u8bc4\u4f30\u5e08",
                    "c": "1804"
                },
                {
                    "n": "\u6c7d\u8f66\u68c0\u9a8c/\u68c0\u6d4b",
                    "c": "1805"
                },
                {
                    "n": "\u6c7d\u8f66\u88c5\u9970\u7f8e\u5bb9",
                    "c": "1806"
                },
                {
                    "n": "\u6c7d\u8f66\u4fee\u7406\u5de5",
                    "c": "1807"
                },
                {
                    "n": "\u6d17\u8f66\u5de5",
                    "c": "1808"
                },
                {
                    "n": "\u52a0\u6cb9\u7ad9\u5de5\u4f5c\u5458",
                    "c": "1809"
                },
                {
                    "n": "\u6c7d\u8f66\u7535\u5de5",
                    "c": "1810"
                },
                {
                    "n": "\u6c7d\u8f66\u94a3\u91d1",
                    "c": "1811"
                },
                {
                    "n": "\u6c7d\u8f66\u55b7\u6f06",
                    "c": "1812"
                },
                {
                    "n": "\u7406\u8d54\u4e13\u5458/\u987e\u95ee",
                    "c": "1813"
                },
                {
                    "n": "\u8f6e\u80ce\u5de5",
                    "c": "1814"
                }
            ],
            "17": [
                {
                    "n": "\u5e97\u957f/\u5356\u573a\u7ecf\u7406",
                    "c": "1701"
                },
                {
                    "n": "\u5e97\u5458/\u8425\u4e1a\u5458",
                    "c": "1702"
                },
                {
                    "n": "\u5bfc\u8d2d",
                    "c": "1703"
                },
                {
                    "n": "\u6536\u94f6\u5458",
                    "c": "1704"
                },
                {
                    "n": "\u6392\u7248\u8bbe\u8ba1/\u5236\u4f5c",
                    "c": "1705"
                },
                {
                    "n": "\u7535\u5b50/\u7535\u5668\u7ef4\u4fee\u5b89\u88c5",
                    "c": "1706"
                }
            ],
            "25": [
                {
                    "n": "\u9152\u5e97/\u5bbe\u9986\u7ecf\u7406",
                    "c": "2501"
                },
                {
                    "n": "\u9152\u5e97/\u5bbe\u9986\u9500\u552e",
                    "c": "2502"
                },
                {
                    "n": "\u5927\u5802\u7ecf\u7406",
                    "c": "2503"
                },
                {
                    "n": "\u697c\u9762\u7ecf\u7406",
                    "c": "2504"
                },
                {
                    "n": "\u9152\u5e97\u524d\u53f0",
                    "c": "2505"
                },
                {
                    "n": "\u5ba2\u623f\u670d\u52a1\u5458/\u697c\u9762\u670d\u52a1\u5458",
                    "c": "2506"
                },
                {
                    "n": "\u884c\u674e\u5458",
                    "c": "2507"
                },
                {
                    "n": "\u6e05\u6d01\u670d\u52a1\u4eba\u5458",
                    "c": "2508"
                },
                {
                    "n": "\u5bb4\u4f1a\u7ba1\u7406",
                    "c": "2509"
                },
                {
                    "n": "\u7ba1\u5bb6\u90e8\u7ecf\u7406/\u4e3b\u7ba1",
                    "c": "2510"
                },
                {
                    "n": "\u5bbe\u5ba2\u670d\u52a1\u7ecf\u7406",
                    "c": "2511"
                },
                {
                    "n": "\u9884\u5b9a\u90e8\u4e3b\u7ba1",
                    "c": "2512"
                },
                {
                    "n": "\u9884\u5b9a\u5458",
                    "c": "2513"
                },
                {
                    "n": "\u5065\u8eab\u623f\u670d\u52a1",
                    "c": "2514"
                },
                {
                    "n": "\u6551\u751f\u5458",
                    "c": "2515"
                }
            ],
            "20": [
                {
                    "n": "\u5e97\u957f/\u5356\u573a\u7ecf\u7406",
                    "c": "2001"
                },
                {
                    "n": "\u5e97\u5458/\u8425\u4e1a\u5458",
                    "c": "2002"
                },
                {
                    "n": "\u5bfc\u8d2d",
                    "c": "2003"
                },
                {
                    "n": "\u6536\u94f6\u5458",
                    "c": "2004"
                },
                {
                    "n": "\u666e\u5de5",
                    "c": "2005"
                }
            ],
            "14": [
                {
                    "n": "\u5e97\u957f/\u5356\u573a\u7ecf\u7406",
                    "c": "1401"
                },
                {
                    "n": "\u5e97\u5458/\u8425\u4e1a\u5458",
                    "c": "1402"
                },
                {
                    "n": "\u5bfc\u8d2d",
                    "c": "1403"
                },
                {
                    "n": "\u6536\u94f6\u5458",
                    "c": "1404"
                },
                {
                    "n": "\u5065\u8eab\u987e\u95ee/\u6559\u7ec3",
                    "c": "1405"
                },
                {
                    "n": "\u745c\u4f3d\u8001\u5e08",
                    "c": "1406"
                },
                {
                    "n": "\u821e\u8e48\u8001\u5e08",
                    "c": "1407"
                },
                {
                    "n": "\u6e38\u6cf3\u6559\u7ec3",
                    "c": "1408"
                },
                {
                    "n": "\u6551\u751f\u5458",
                    "c": "1409"
                },
                {
                    "n": "\u9ad8\u5c14\u592b\u6559\u7ec3",
                    "c": "1410"
                },
                {
                    "n": "\u4f53\u80b2\u8fd0\u52a8\u6559\u7ec3",
                    "c": "1411"
                },
                {
                    "n": "\u6309\u6469\u5e08",
                    "c": "1412"
                },
                {
                    "n": "\u8db3\u7597\u5e08",
                    "c": "1413"
                },
                {
                    "n": "\u9488\u7078\u63a8\u62ff",
                    "c": "1414"
                },
                {
                    "n": "\u5a31\u4e50\u5385\u670d\u52a1\u5458",
                    "c": "1415"
                },
                {
                    "n": "\u8c03\u9152\u5e08",
                    "c": "1416"
                },
                {
                    "n": "\u9152\u5427\u670d\u52a1\u5458",
                    "c": "1417"
                },
                {
                    "n": "\u5f71\u89c6/\u540e\u671f\u5236\u4f5c",
                    "c": "1418"
                },
                {
                    "n": "\u4e3b\u6301\u4eba",
                    "c": "1419"
                },
                {
                    "n": "\u6444\u5f71\u5e08/\u6444\u50cf\u5e08",
                    "c": "1420"
                },
                {
                    "n": "\u97f3\u6548\u5e08",
                    "c": "1421"
                },
                {
                    "n": "\u793c\u4eea/\u8fce\u5bbe",
                    "c": "1422"
                },
                {
                    "n": "\u914d\u97f3\u5458",
                    "c": "1423"
                },
                {
                    "n": "\u653e\u6620\u5458",
                    "c": "1424"
                },
                {
                    "n": "\u706f\u5149\u5e08",
                    "c": "1425"
                }
            ]
        };
        return {
            getPositions: getPositions
        }

        function getPositions(industryId) {
            return positions[industryId];
        }
    }
});
