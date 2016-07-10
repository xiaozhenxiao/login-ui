angular
    .module('pulse')
    .controller('marketingActCtl', marketingActCtl);
function marketingActCtl($scope, API, $location) {
	debugger;
    API.market( function(data){
    		debugger;
    		$scope.actList = data;
    	}, function(s){
    		debugger;
    		alert("get data error");
    	}
    		
    );
    
   
    
    /*-== 时间控件start ==-*/
    var beginTime = $("#datetime_begin");
    var endTime = $("#datetime_end");
    //初始化日期时间控件
    beginTime.datetimepicker({
        format: 'Y-m-d H:00',
        lang: 'ch',
        onShow: function() {
        }
    });
    endTime.datetimepicker({
        format: 'Y-m-d H:00',
        lang: 'ch',
        onShow: function() {
        }
    });
    /*-== 时间控件结束 ==-*/
}