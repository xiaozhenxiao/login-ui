angular
    .module('pulse')
    .controller('memberDetailCtl', memberDetailCtl);
function memberDetailCtl($scope, API, $location) {
    var id = $location.search()['id'];
    var brandId = $location.search()['brandid'];
    var page = $location.search().page;
    var dataParam = "id=" + id + '&brandid=' + brandId + '&tongjitime=0';
    if(typeof(page)!="undefined"&&page!=null&&page!="") {
        dataParam += '&start=' + page;
    }else{
        dataParam += '&start=1';
    }
    dataParam += '&size=10';
    API.consumRecord(dataParam, function(result) {
        $scope.user = result.user;
        $scope.tongji = result.tongji;
        $scope.lastTime = result.lastTime;
        $scope.diff = result.diff;
        $scope.records = result.data;
        $scope.page = result.page;
        $scope.brandId = result.brandId;
        $scope.tongjiTime = result.tongjiTime;
        $scope.pageCount = result.pageCount;
        $scope.pageNum = [];
        if(result.pageCount<=10) {
            for (var i = 0; i < result.pageCount; i++) {
                $scope.pageNum.push(i + 1);
            }
        }else{
            if((result.pageCount-result.page)<5){
                for (var i = 9; i >= 0; i--) {
                    $scope.pageNum.push(result.pageCount-i);
                }
            }else{
                //alert('1-' + JSON.stringify($scope.pageNum));
                if(result.page<=5){
                    for(var j=1; j<11; j++){
                        $scope.pageNum.push(j);
                    }
                }else{
                    for (var i = 5; i > 0; i--) {
                        $scope.pageNum.push(result.page-i);
                    }
                    $scope.pageNum.push(result.page);
                    for (var i = 1; i < 5; i++) {
                        $scope.pageNum.push(result.page+i);
                    }
                }
            }
        }
        $scope.reports(result.tongji.consumTimes,result.tongji.brandTimes,result.tongji.consumFq,result.tongji.brandFq,result.tongji.consumSum,result.tongji.brandSum,result.tongji.avgConsum,result.tongji.avgbrand);
    }, function(){
        alert("get consumRecord data error");
    });

    $scope.qureyMemberDetail = function(brandId,userId,tongjiTime,page){
        var dataParam = "id=" + userId + '&brandid=' + brandId + '&tongjitime='+ tongjiTime + "&start=" + page + '&size=10';
        API.consumRecord(dataParam, function(result) {
            $scope.user = result.user;
            $scope.tongji = result.tongji;
            $scope.lastTime = result.lastTime;
            $scope.diff = result.diff;
            $scope.records = result.data;
            $scope.page = result.page;
            $scope.brandId = result.brandId;
            $scope.tongjiTime = result.tongjiTime;
            $scope.pageCount = result.pageCount;
            $scope.pageNum = [];
            if(result.pageCount<=10) {
                for (var i = 0; i < result.pageCount; i++) {
                    $scope.pageNum.push(i + 1);
                }
            }else{
                if((result.pageCount-result.page)<5){
                    for (var i = 9; i >= 0; i--) {
                        $scope.pageNum.push(result.pageCount-i);
                    }
                }else{
                    //alert('1-' + JSON.stringify($scope.pageNum));
                    if(result.page<=5){
                        for(var j=1; j<11; j++){
                            $scope.pageNum.push(j);
                        }
                    }else{
                        for (var i = 5; i > 0; i--) {
                            $scope.pageNum.push(result.page-i);
                        }
                        $scope.pageNum.push(result.page);
                        for (var i = 1; i < 5; i++) {
                            $scope.pageNum.push(result.page+i);
                        }
                    }
                }
            }
        }, function(){
            alert("get qureyMemberDetail data error");
        });
        $scope.reports(result.tongji.consumTimes,result.tongji.brandTimes,result.tongji.consumFq,result.tongji.brandFq,result.tongji.consumSum,result.tongji.brandSum,result.tongji.avgConsum,result.tongji.avgbrand);
    }
    $scope.reports = function(consumTimes,brandTimes,consumFq,brandFq,consumSum,brandSum,avgConsum,avgbrand){

        $('#report1').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            xAxis: {
                categories: [
                    '<b style="color:black;font-size:20px;">'+'消费笔数'+'</b>'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '笔'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} 笔</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            },
            series: [{
                name: '<b style="color:#ff3300">'+'会员'+'</b>',
                color:'#ff3300',
                data: [consumTimes]
            }, {
                name: '<b style="color:#336600">'+'店内平均'+'</b>',
                color:'#336600',
                data: [brandTimes]
            }]
        });
        $('#report2').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            xAxis: {
                categories: [
                    '<b style="color:black;font-size:20px;">'+'平均消费频次'+'</b>'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '天/次'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} 天/次</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            },
            series: [{
                name: '<b style="color:#ff3300">'+'会员'+'</b>',
                color:'#ff3300',
                data: [consumFq]
            }, {
                name: '<b style="color:#336600">'+'店内平均'+'</b>',
                color:'#336600',
                data: [brandFq]
            }]
        });
        $('#report3').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            xAxis: {
                categories: [
                    '<b style="color:black;font-size:20px;">'+'消费总额'+'</b>'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '元'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} 元</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            },
            series: [{
                name: '<b style="color:#ff3300">'+'会员'+'</b>',
                color:'#ff3300',
                data: [consumSum]
            }, {
                name: '<b style="color:#336600">'+'店内平均'+'</b>',
                color:'#336600',
                data: [brandSum]
            }]
        });
        $('#report4').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            xAxis: {
                categories: [
                    '<b style="color:black;font-size:20px;">'+'平均单笔消费'+'</b>'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '元'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} 元</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0
            },
            series: [{
                name: '<b style="color:#ff3300">'+'会员'+'</b>',
                color:'#ff3300',
                data: [avgConsum]
            }, {
                name: '<b style="color:#336600">'+'店内平均'+'</b>',
                color:'#336600',
                data: [avgbrand]
            }]
        });
    }
}