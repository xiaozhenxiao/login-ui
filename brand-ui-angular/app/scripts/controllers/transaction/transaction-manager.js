angular
    .module('pulse')
    .filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    })
    .controller('transactionManagerCtl', transactionManagerCtl);
function transactionManagerCtl($scope, API, $location) {
    $scope.transactionDetail = {};
    $scope.transactionDetail.item = "";
    $scope.sortColumn = "create_time";
    $scope.sortSeq = "asc";
    $scope.pages = [];
    $scope.totalPageNumber = 0;
    $scope.curPageNo = 1;
    $scope.filter_user_name = "";
    $scope.filter_phone = "";
    $scope.filter_pay_type = "";
    $scope.filter_market_type = "";
    $scope.filter_begin_time = "";
    $scope.filter_end_time = "";
    $scope.ignore_list = [];
    var titles = [];
    titles.push("trade_volume_title");
    titles.push("trade_money_title");
    titles.push("trade_volume_day_title");
    titles.push("trade_money_day_title");
    titles.push("chain_title");
    titles.push("yoy_title");
    showTitle(titles);
    hopscotch.endTour();
    var beginTime = $("#inputBeginTime");
    var endTime = $("#inputEndTime");
    ////当前时间-24h
    //var nowBegin = $.myTime.UnixToDate($.myTime.UnixTime(-24));
    ////当前时间
    //var nowEnd = $.myTime.UnixToDate($.myTime.UnixTime());
    //beginTime.val(nowBegin);
    //endTime.val(nowEnd);
    beginTime.datetimepicker({
        format: 'Y-m-d H:00:00',
        lang: 'ch'
    });
    endTime.datetimepicker({
        format: 'Y-m-d H:00:00',
        lang: 'ch'
    });
    var defaultParam = "pageNo=1&";
    select(defaultParam, $scope, API);
    $scope.detail = function(transactionDetail) {
        $scope.transactionDetail = transactionDetail;
        showDialog($scope);
    };
    $scope.close = function() {
        hideDialog($scope);
    };
    $scope.sortPages = function(type) {
        $scope.sortColumn = type;
        $scope.reverse = $scope.predicate == type && !$scope.reverse;
        $scope.predicate = type;
        var style;
        if (!$scope.reverse) {
            $scope.sortSeq = "desc";
            style = 'fa fa-sort-amount-desc';
        } else {
            $scope.sortSeq = "asc";
            style = 'fa fa-sort-amount-asc';
        }
        filterSelect($scope, API, $scope.curPageNo);
        $scope.transaction_style_transaction_id = "";
        $scope.transaction_style_transaction_time = "";
        $scope.transaction_style_order_price = "";
        $scope.transaction_style_pay_type = "";
        $scope.transaction_style_activity_name = "";
        $scope.transaction_style_order_status = "";
        switch (type) {
            case 'order_id':
                $scope.transaction_style_transaction_id = style;
                break;
            case 'create_time':
                $scope.transaction_style_transaction_time = style;
                break;
            case 'order_price':
                $scope.transaction_style_order_price = style;
                break;
            case 'pay_type':
                $scope.transaction_style_pay_type = style;
                break;
            case 'activity_name':
                $scope.transaction_style_activity_name = style;
                break;
            case 'order_status':
                $scope.transaction_style_order_status = style;
                break;
        }

    };
    $scope.transactionFilter = function(pageNo) {
        filterSelect($scope, API, pageNo);
    };
    $scope.reset = function() {
        $scope.filter_user_name = "";
        $scope.filter_phone = "";
        $scope.filter_pay_type = "";
        $scope.filter_market_type = "";
        $("#inputBeginTime").val("");
        $("#inputEndTime").val("");
    };
    $scope.sortPages("create_time");
}
function filterSelect($scope, API, pageNo) {
    if (!pageNo) {
        pageNo = $scope.curPageNo;
    } else {
        $scope.curPageNo = pageNo;
    }
    var filterBeginTime = $("#inputBeginTime").val();
    var filterEndTime = $("#inputEndTime").val();
    var queryParams = "page=" + pageNo + "&";
    if ($scope.filter_user_name) {
        queryParams += "name=" + $scope.filter_user_name + "&";
    }
    if ($scope.filter_phone) {
        queryParams += "phone=" + $scope.filter_phone + "&";
    }
    if ($scope.filter_pay_type) {
        queryParams += "payment=" + $scope.filter_pay_type + "&";
    }
    if ($scope.filter_market_type) {
        queryParams += "market=" + $scope.filter_market_type + "&";
    }
    if (filterBeginTime) {
        queryParams += "btime=" + filterBeginTime.replace(" ", "%20") + "&";
    }
    if (filterEndTime) {
        queryParams += "etime=" + filterEndTime.replace(" ", "%20") + "&";
    }
    if ($scope.sortColumn) {
        queryParams += "scolumn=" + $scope.sortColumn + "&";
    }
    if ($scope.sortSeq) {
        queryParams += "sseq=" + $scope.sortSeq + "&";
    }
    select(queryParams, $scope, API);

};
function select(queryParams, $scope, API) {
    console.log("this is in select");
    showLoadingDialog($scope);
    API.transactionManager(queryParams, function(data) {
        console.log(data);
        $scope.transactionManagerList = data.resultList;
        $scope.users = data.users;
        hideLoadingDialog($scope);
    }, function(){
        hideLoadingDialog($scope);
        alert("get data error");
    });
    API.transactionManagerStatistics(queryParams, function(data) {
        $scope.pages = [];
        console.log(data);
        $scope.transactionManagerStatistics = data;
        $scope.totalPageNumber = data.count%10==0?data.count/10:parseInt(data.count/10+1);
        for (var i=(($scope.curPageNo<5)?0:($scope.totalPageNumber-$scope.curPageNo)>5?$scope.curPageNo-5:$scope.totalPageNumber-9);
             i<($scope.curPageNo<5?($scope.totalPageNumber>9? 9:$scope.totalPageNumber)
                 :($scope.curPageNo+4>$scope.totalPageNumber?$scope.totalPageNumber
                 :($scope.curPageNo+4)));i++) {
            $scope.pages.push(i+1);
        }
    }, function() {
        alert("get data error");
    });
}
function showDialog($scope) {
    $scope.model_background_style = {'z-index': 1040,display:'block'};
    $scope.model_background_in = true;
    $scope.model_style_edit = {display:'block'};
    $scope.model_in_edit = true;
}
function hideDialog($scope) {
    $scope.model_background_style = {'z-index': 1040,display:'none'};
    $scope.model_background_in = false;
    $scope.model_style_edit = {display:'none'};
    $scope.model_in_edit = false;
}
function showLoadingDialog($scope) {
    $scope.model_background_style_loading = {'z-index': 1051,display:'block',opacity:0.05};
    $scope.model_background_in_loading = true;
    $scope.loading_style = {'z-index': 1052,display:'block',position: 'absolute',top: '37%',left: '50%'};
}
function hideLoadingDialog($scope) {
    $scope.model_background_style_loading = {'z-index': 1051,display:'none'};
    $scope.model_background_in_loading = false;
    $scope.loading_style = {'z-index': 1052,display:'none',position: 'absolute',top: '50%',left: '50%'};
}
function showTitle(titleIds) {
    $(document).click(function(e) {
        var clickDom = $(e.target);
        for (var i=0;i<titleIds.length;i++) {
            if($(".popover") && !(clickDom.hasClass("popover") || clickDom.hasClass("popover-title") || clickDom.hasClass("popover-content"))) {
                $(".popover").removeClass("in");
                $("#" + titleIds[i]).removeAttr("aria-describedby");
                $(".popover").remove();
            }
        }
        clickDom.popover("show");
    });
}