angular
    .module('pulse')
    .controller('transactionStatisticsCtl', transactionStatisticsCtl);
function transactionStatisticsCtl($scope, API, $location) {
    $scope.$watch('$viewContentLoaded', function() {
        setTimeout(function () {
            fixWrapperHeight();
        }, 1000);
    });
    $scope.showIncome = function(timeType) {
        $('#income').html('<div class="uil-spin-css" style="-webkit-transform:scale(0.15);margin-top: -20px;width: 100%;height: 100%;"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>');
        $scope.income_active = timeType;
        var params = "param_time_type=" + timeType;
        API.statisticsIncome(params, function(data) {
            console.log(data);
            var categories = [];
            var allData = [];
            var cashData = [];
            var cardData = [];
            var weixinData = [];
            var zhifubaoData = [];
            var baiduData = [];
            var cashMap = incomeList2Map(data.cashDatas);
            var cardMap = incomeList2Map(data.cardDatas);
            var weixinMap = incomeList2Map(data.weixinDatas);
            var zhifubaoMap = incomeList2Map(data.zhifubaoDatas);
            var baiduMap = incomeList2Map(data.baiduDatas);
            for (var i=0;i<data.allDatas.length;i++) {
                var datas = data.allDatas[i];
                categories.push(datas.serviceDay);
                allData.push(datas.priceDaily);
                cashData.push(incomeMap2List(cashMap, datas));
                cardData.push(incomeMap2List(cardMap, datas));
                weixinData.push(incomeMap2List(weixinMap, datas));
                zhifubaoData.push(incomeMap2List(zhifubaoMap, datas));
                baiduData.push(incomeMap2List(baiduMap, datas));
            }
            $('#income').highcharts({
                title: {
                    text: '',
                    x: -20 //center
                },
                xAxis: {
                    categories: categories,
                    tickInterval: categories.length>10?(categories.length-categories.length%10)/10:0,
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: '金额 (元)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '元',
                    shared: true
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'top',
                    borderWidth: 0
                },
                series: [{
                    name: '总收入',
                    data: allData
                }, {
                    name: '现金收入',
                    data: cashData
                }, {
                    name: '刷卡收入',
                    data: cardData
                }, {
                    name: '微信收入',
                    data: weixinData
                }, {
                    name: '支付宝收入',
                    data: zhifubaoData
                }, {
                    name: '百度钱包收入',
                    data: baiduData
                }]
            });
        }, function(){
            alert("get data error");
        });
    };
    $scope.showIncome("sevenDay");

    $scope.showTimes = function(timeType) {
        $('#times').html('<div class="uil-spin-css" style="-webkit-transform:scale(0.15);margin-top: -20px;width: 100%;height: 100%;"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>');
        $scope.times_active = timeType;
        var params = "param_time_type=" + timeType;
        API.statisticsTimes(params, function(data) {
            console.log(data);
            var categories = [];
            var allData = [];
            var cashData = [];
            var cardData = [];
            var weixinData = [];
            var zhifubaoData = [];
            var baiduData = [];
            var cashMap = countList2Map(data.cashDatas);
            var cardMap = countList2Map(data.cardDatas);
            var weixinMap = countList2Map(data.weixinDatas);
            var zhifubaoMap = countList2Map(data.zhifubaoDatas);
            var baiduMap = countList2Map(data.baiduDatas);
            for (var i=0;i<data.allDatas.length;i++) {
                var datas = data.allDatas[i];
                categories.push(datas.serviceDay);
                allData.push(datas.countDaily);
                cashData.push(incomeMap2List(cashMap, datas));
                cardData.push(incomeMap2List(cardMap, datas));
                weixinData.push(incomeMap2List(weixinMap, datas));
                zhifubaoData.push(incomeMap2List(zhifubaoMap, datas));
                baiduData.push(incomeMap2List(baiduMap, datas));
            }
            $('#times').highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: categories,
                    tickInterval: categories.length>10?(categories.length-categories.length%10)/10:0,
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: '次数'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '次',
                    shared: true
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'top',
                    borderWidth: 0
                },
                series: [{
                    name: '总消费次数',
                    data: allData
                }, {
                    name: '现金支付次数',
                    data: cashData
                }, {
                    name: '刷卡支付次数',
                    data: cardData
                }, {
                    name: '微信支付次数',
                    data: weixinData
                }, {
                    name: '支付宝支付次数',
                    data: zhifubaoData
                }, {
                    name: '百度钱包支付次数',
                    data: baiduData
                }]
            });
        }, function(){
            alert("get data error");
        });
    };
    $scope.showTimes("sevenDay");

    $scope.showOnce = function(timeType) {
        $('#once').html('<div class="uil-spin-css" style="-webkit-transform:scale(0.15);margin-top: -20px;width: 100%;height: 100%;"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>');
        $scope.once_active = timeType;
        var params = "param_time_type=" + timeType;
        API.statisticsOnce(params, function(data) {
            console.log(data);
            var categories = [];
            var allData = [];
            for (var i=0;i<data.length;i++) {
                var datas = data[i];
                categories.push(datas.serviceDay);
                allData.push(parseFloat(datas.priceOnce));
            }
            $('#once').highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: '',
                    x: -20 //center
                },
                xAxis: {
                    categories: categories,
                    tickInterval: categories.length>10?(categories.length-categories.length%10)/10:0,
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: '金额(元)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '元',
                    share: true
                },
                series: [{
                    name: '每次销售额',
                    data: allData
                }]
            });
        }, function(){
            alert("get data error");
        });
    };
    $scope.showOnce("sevenDay");

    $scope.showCheckSrcTimes = function(timeType) {
        $('#checkSrcTimes').html('<div class="uil-spin-css" style="-webkit-transform:scale(0.15);margin-top: -20px;width: 100%;height: 100%;"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>');
        $scope.check_src_active = timeType;
        var params = "param_time_type=" + timeType;
        API.statisticsCheckSrcTimes(params, function(data) {
            console.log(data);
            var categories = [];
            var weixinSrcList = data.weixinSrcList;
            var phoneSrcList = data.phoneSrcList;
            var allSrcList = data.allSrcList;
            var weixinSrcData = [];
            var phoneSrcData = [];
            var weixinSrcMap = countList2Map(weixinSrcList);
            var phoneSrcMap = countList2Map(phoneSrcList);
            for (var i=0;i<allSrcList.length;i++) {
                categories.push(allSrcList[i].serviceDay);
                weixinSrcData.push(incomeMap2List(weixinSrcMap, allSrcList[i]));
                phoneSrcData.push(incomeMap2List(phoneSrcMap, allSrcList[i]));
            }
            $('#checkSrcTimes').highcharts({
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: categories,
                    tickInterval: categories.length>10?(categories.length-categories.length%10)/10:0,
                    crosshair: true
                },
                yAxis: {
                    title: {
                        text: '次数'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '次',
                    shared: true
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'top',
                    borderWidth: 0
                },
                series: [{
                    name: '微信验证',
                    data: weixinSrcData
                }, {
                    name: '手机验证',
                    data: phoneSrcData
                }]
            });
        }, function(){
            alert("get data error");
        });
    };
    $scope.showCheckSrcTimes("sevenDay");

    $('#report4').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '会员消费次数'
        },tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 人</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: '会员数',
            colorByPoint: true,
            data: [{
                name: '1次',
                y: 5600
            }, {
                name: '7~9次',
                y: 2400
            }, {
                name: '2~3次',
                y: 1000
            }, {
                name: '4~6次',
                y: 400
            }, {
                name: '10~19次',
                y: 100
            }, {
                name: '20次以上',
                y: 50
            }]
        }]
    });
    $('#report5').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '支付方式'
        },tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 次</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: '消费次数',
            colorByPoint: true,
            data: [{
                name: '微信',
                y: 56000
            }, {
                name: '刷卡支付',
                y: 24000
            }, {
                name: '支付宝',
                y: 10000
            }, {
                name: '百度钱包',
                y: 4000
            }, {
                name: '现金',
                y: 2000
            }, {
                name: '其他',
                y: 1000
            }]
        }]
    });
    $('#report6').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '人均消费额分布'
        },tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 人</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: '会员数',
            colorByPoint: true,
            data: [{
                name: '100~499元',
                y: 50000
            }, {
                name: '500~999元',
                y: 24000
            }, {
                name: '50~99元',
                y: 10000
            }, {
                name: '0~49元',
                y: 4000
            }, {
                name: '1000~5000元',
                y: 500
            }, {
                name: '5000元以上',
                y: 80
            }]
        }]
    });
}
function incomeList2Map(list) {
    var map = new HashMap();
    for (var i=0;i<list.length;i++) {
        map.put(list[i].serviceDay, list[i].priceDaily);
    }
    return map;
}
function countList2Map(list) {
    var map = new HashMap();
    for (var i=0;i<list.length;i++) {
        map.put(list[i].serviceDay, list[i].countDaily);
    }
    return map;
}
function incomeMap2List(map, datas) {
    var data;
    if (map.get(datas.serviceDay)) {
        data = map.get(datas.serviceDay);
    } else {
        data = 0;
    }
    return data;
}