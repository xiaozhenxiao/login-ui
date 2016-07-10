angular
    .module('pulse')
    .controller('marketingActCtl', marketingActCtl);
function marketingActCtl($scope, API, $location, $http) {
    var parame ={};
	API.market(parame, function(data){
//		alert(data);
    		$scope.actList = data;
    	}, function(){
    		alert("get data error");
    	}
    );
   
    $scope.reset=function(){
    	$("#actType").val("value",'0');
    	$("#actName").val("");
    	$("#state").val("value",'0');
    	$("#datetime_begin").val("");
    	$("#datetime_end").val("");
    	$("#channel").val("value",'0');
    };
    
    $scope.select=function(){
	    var actType = $("#actType").val();//活动类型
	    var actName = $("#actName").val();//活动名称
	    var startTime = $("#datetime_begin").val();//开始时间
	    var endTime = $("#datetime_end").val();//结束时间
	    var state = $("#state").val();//活动状态
	    var channel = $("#channel").find("option:selected").text() ;
//	    alert("actType:"+actType+"actName:"+actName+"state:"+state+"channel:"+channel+"startTime:"+startTime+"endTime:"+endTime);
	    var parameter={'actType':actType, 'actName':actName, 'startTime':startTime, 'endTime':endTime, 'state':state,'channel':channel };
	    API.market(parameter, function(data){
	    	alert(data);
	    	$scope.actList = data;
		}, function(){
			alert("error:添加失败");
		});  
    };
    
    $scope.showdialog=function(a){
    	$scope.model_style_edit = {display:'block'};
    	if(a==0){
    		$scope.model_in_edit_fb = true;
    	}else{
    		$scope.model_in_edit_xj = true;
    	}
    };
    
    $scope.close=function (){
        $scope.model_style_edit = {display:'none'};
        $scope.model_in_edit_fb = false;
        $scope.model_in_edit_xj = false;
    };
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