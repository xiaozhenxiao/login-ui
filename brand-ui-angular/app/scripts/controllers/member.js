angular
    .module('pulse')
    .controller('memberCtl', memberCtl);
function memberCtl($scope, API, $location) {
    var brandId = $location.search()['brandid'];
    var memberId = $location.search()['memberid'];
    var name = $location.search().name;
    var phone = $location.search().phone;
    var page = $location.search().page;
    var startTime = $location.search()['starttime'];
    var endTime = $location.search()['endtime'];
    var dataParam = 'brandid=' + brandId;
    if(typeof(memberId)!="undefined"&&memberId!=null&&memberId!="")
        dataParam += '&memberid=' + memberId;
    if(typeof(name)!="undefined"&&name!=null&&name!="")
        dataParam += '&name=' + name;
    if(typeof(phone)!="undefined"&&phone!=null&&phone!="")
        dataParam += '&phone=' + phone;
    if(typeof(startTime)!="undefined"&&startTime!=null&&startTime!="")
        dataParam += '&starttime=' + startTime;
    if(typeof(endTime)!="undefined"&&endTime!=null&&endTime!="")
        dataParam += '&endtime=' + endTime;
    if(typeof(page)!="undefined"&&page!=null&&page!="") {
        dataParam += '&start=' + page;
    }else{
        dataParam += '&start=1';
    }
    dataParam += '&sort=0';
    dataParam += '&size=10';
    API.member(dataParam, function(result) {
        $scope.wsorts = [
            {name:'0', value:'按消费总额'},
            {name:'1', value:'按消费次数'},
            {name:'2', value:'按最近消费时间'}
        ];

        $scope.brandId = result.brandId;
        $scope.stores = result.stores;
        $scope.memberId = result.memberId;
        $scope.name = result.name;
        $scope.source = result.source;
        //$scope.sortss = result.sort;
        $scope.phone = result.phone;
        $scope.beginTime = result.startTime;
        $scope.endTime = result.endTime;
        $scope.userList = result.data;
        $scope.pageCount = result.pageCount;
        $scope.page = result.page;
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
        alert("get data error");
    });

    $scope.qureyMember = function(brandId,memberId,name,source,sort,phone,beginTime,endsTime,page){
        $scope.wsorts = [
            {name:'0', value:'按消费总额'},
            {name:'1', value:'按消费次数'},
            {name:'2', value:'按最近消费时间'}
        ];
        var startTime;
        var endTime;
        if(typeof(beginTime)!="undefined"&&beginTime!=null&&beginTime!="") {
            startTime = beginTime;
        }else{
            startTime = $("#datetime_begin").val();
        }
        if(typeof(endsTime)!="undefined"&&endsTime!=null&&endsTime!="") {
            endTime = endsTime;
        }else{
            endTime = $("#datetime_end").val();
        }
        var dataParam = 'brandid=' + brandId;
        if(typeof(memberId)!="undefined"&&memberId!=null)
            dataParam += '&memberid=' + memberId;
        if(typeof(name)!="undefined"&&name!=null)
            dataParam += '&name=' + name;
        if(typeof(source)!="undefined"&&source!=null)
            dataParam += '&source=' + source;
        if(typeof(sort)!="undefined"&&sort!=null)
            dataParam += '&sort=' + sort;
        if(typeof(phone)!="undefined"&&phone!=null)
            dataParam += '&phone=' + phone;
        if(typeof(startTime)!="undefined"&&startTime!=null&&startTime!="")
            dataParam += '&starttime=' + startTime;
        if(typeof(endTime)!="undefined"&&endTime!=null&&endTime!="")
            dataParam += '&endtime=' + endTime;
        if(typeof(page)!="undefined"&&page!=null&&page!="") {
            dataParam += '&start=' + page;
        }else{
            dataParam += '&start=1';
        }
        dataParam += '&size=10';
        if(!brandId){
            alert("品牌ID不能为空")
            return;
        }
        API.member(dataParam, function(result) {
            $scope.brandId = result.brandId;
            $scope.stores = result.stores;
            $scope.memberId = result.memberId;
            $scope.name = result.name;
            $scope.source = result.source;
            //$scope.sortss = result.sort;
            $scope.phone = result.phone;
            $scope.beginTime = result.startTime;
            $scope.endTime = result.endTime;
            $scope.userList = result.data;
            $scope.pageCount = result.pageCount;
            $scope.page = result.page;
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
            alert("get data error");
        });
    }
    var beginTimePicker = $("#datetime_begin");
    var endTimePicker = $("#datetime_end");
    //初始化日期时间控件
    beginTimePicker.datetimepicker({
        format: 'Y-m-d H:00',
        lang: 'ch',
        onShow: function() {
        }
    });
    endTimePicker.datetimepicker({
        format: 'Y-m-d H:00',
        lang: 'ch',
        onShow: function() {
        }
    });

    $scope.jinYong = function(id,status,brandId,memberId,name,sort,phone,beginTime,endsTime,page){
        var dataParam = "id=" + id + "&status=" + status;
        API.userInfoStatus(dataParam, function(result) {
            if(status==0)
                alert("启用成功");
            if(status==1)
                alert("禁用成功");
        }, function(){
            alert("jinyong error");
        });

        var param = 'brandid=' + brandId;
        if(typeof(memberId)!="undefined"&&memberId!=null&&memberId!="")
            param += '&memberid=' + memberId;
        if(typeof(name)!="undefined"&&name!=null)
            param += '&name=' + name;
        if(typeof(sort)!="undefined"&&sort!=null)
            param += '&sort=' + sort;
        if(typeof(phone)!="undefined"&&phone!=null)
            param += '&phone=' + phone;
        if(typeof(beginTime)!="undefined"&&beginTime!=null&&beginTime!="")
            param += '&starttime=' + beginTime;
        if(typeof(endsTime)!="undefined"&&endsTime!=null&&endsTime!="")
            param += '&endtime=' + endsTime;
        if(typeof(page)!="undefined"&&page!=null&&page!="") {
            param += '&start=' + page;
        }else{
            param += '&start=1';
        }
        param += '&size=10';
        API.member(param, function(result) {
            $scope.brandId = result.brandId;
            $scope.stores = result.stores;
            $scope.memberId = result.memberId;
            $scope.name = result.name;
            //$scope.sortss = result.sort;
            $scope.phone = result.phone;
            $scope.beginTime = result.startTime;
            $scope.endTime = result.endTime;
            $scope.userList = result.data;
            $scope.pageCount = result.pageCount;
            $scope.page = result.page;
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
            alert("jinyong get data error");
        });
    }
}